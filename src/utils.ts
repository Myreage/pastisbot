import config from './config';
import ImageSearch from 'image-search-google';
const googleClient = new ImageSearch(config.cse_id, config.cse_token);

/**
 *
 * @param {string} query
 * @param {int} pages
 * @param {function} _callback
 */
export function searchRandomImage(query : string, pages : number,
    _callback : (url : string) => void) {
  const options = {page: pages};
  googleClient.search(query, options)
      .then((images : ImageResult[]) => {
        _callback(images[Math.floor(Math.random()*images.length)]['url']);
      })
      .catch((_err : string) => {
        _callback('');
      });
}
