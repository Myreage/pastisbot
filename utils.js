const config = require('./config');
const ImageSearch = require('image-search-google');
const googleClient = new ImageSearch(config.cse_id, config.cse_token);

/**
 *
 * @param {string} query
 * @param {int} pages
 * @param {function} _callback
 */
function searchRandomImage(query, pages, _callback) {
  const options = {page: pages};
  googleClient.search(query, options)
      .then((images) => {
        _callback(images[Math.floor(Math.random()*images.length)]['url']);
      })
      .catch((error) => {
        _callback('');
      });
}
exports.searchRandomImage = searchRandomImage;
