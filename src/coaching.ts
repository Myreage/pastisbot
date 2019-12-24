import fs from 'fs';

/**
 *
 * @param {int} length
 * @return {string} result
 */
export function coachingBuilder(length : number) {
  const sujets: string[] = fs.readFileSync('resources/sujet.txt', 'utf8')
      .toString().split('\n');
  const verbes: string[] = fs.readFileSync('resources/verbe.txt', 'utf8')
      .toString().split('\n');
  const complements: string[] = fs.readFileSync('resources/complement.txt',
      'utf8')
      .toString().split('\n');
  const conjonctions: string[] = fs.readFileSync('resources/conjonctions.txt',
      'utf8')
      .toString().split('\n');

  let result = '';
  for (let i = 0; i < length; i++) {
    if (result != '') {
      result += ' ' + conjonctions[Math.floor(Math.random()*
        conjonctions.length)];
      result += ' ' + sujets[Math.floor(Math.random()*sujets.length)];
    } else {
      result += sujets[Math.floor(Math.random()*sujets.length)];
      result = result[0].toUpperCase() + result.slice(1);
    }
    result += ' ' + verbes[Math.floor(Math.random()*verbes.length)];
    result += ' ' + sujets[Math.floor(Math.random()*sujets.length)];
    result += ' ' + complements[Math.floor(Math.random()*complements.length)];
  }
  result += '.';
  return result;
}
