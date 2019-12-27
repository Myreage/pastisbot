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
/**
 *
 * @return {string}
 */
export function pastisTime() {
  const d = new Date();
  const nbminutes = d.getMinutes();
  let minutes : string = nbminutes.toString();
  const nbhours = d.getHours();
  let hours : string = nbhours.toString();
  let result = '';

  if (nbminutes < 10) {
    minutes = '0' + minutes;
  }

  if (nbhours < 10) {
    hours = '0' + hours;
  }

  if (nbminutes === 10 || [6, 26, 36, 46, 56].indexOf(nbminutes) >= 0) {
    result = 'Il est ' + hours + 'h' + minutes + ', l\'heure du pastis';
  } else if (nbminutes === 15) {
    result = 'Il est ' + hours + 'h et quart, l\'heure du Ricard';
  } else {
    const newDate = new Date(d.getTime() + 15*60000);
    const nbnewhours = newDate.getHours();
    const nbnewminutes = newDate.getMinutes();
    let newhours = nbnewhours.toString();
    let newminutes = nbnewminutes.toString();

    if (nbnewhours < 10) {
      newhours = '0' + nbnewhours;
    }
    if (nbnewminutes < 10) {
      newminutes = '0' + nbnewminutes;
    }
    result = 'Il est ' + newhours + 'h' + newminutes +
      ' moins le quart, l\'heure du Ricard';
  }
  return result;
}
