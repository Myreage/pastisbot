/* eslint-disable no-multi-str */
import {Client, Attachment, RichEmbed} from 'discord.js';
import {searchRandomImage, pastisTime} from './utils';
import config from './config';
import fs from 'fs';
import {coachingBuilder} from './coaching';

const client = new Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', (msg) => {
  // ignore bot messages
  if (msg.author.bot) return;

  // check prefix
  if (msg.content.indexOf(config.prefix) !==0) return;

  // parse
  // The parenthesis in the regex creates a captured group within the quotes
  const myRegexp = /[^\s"]+|"([^"]*)"/gi;
  const args = [];
  let match;
  const input = msg.content.slice(config.prefix.length);

  do {
    // Each call to exec returns the next regex match as an array
    match = myRegexp.exec(input);
    if (match != null) {
      // Index 1 in the array is the captured group if it exists
      // Index 0 is the matched text, which we use if no captured group exists
      args.push(match[1] ? match[1] : match[0]);
    }
  } while (match != null);

  const command = args.shift().toLowerCase();

  if (command === 'ping') {
    msg.reply('pong');
  }
  if (command === 'help') {
    const help = new RichEmbed()
        .setColor('#0099ff')
        .setTitle('Aide du Pastis')
        .setDescription('Attention à ne pas le noyer')
        .addField('!ping', 'Ping le bot')
        .addField('!rip', 'Affiche une image rip')
        .addField('!marx', 'Affiche un meme communiste')
        .addField('!source', 'Lien Github')
        .addField('!newquote <quote> <auteur>', 'Ajoute une nouvelle quote')
        .addField('!randomquote', 'Renvoie une quote aléatoire')
        .addField('!pastis', 'Une belle image de pastis')
        .addField('!coaching', 'Renvoie une petite phrase agile', true)
        .addField('!coachingg', 'Renvoie une longue phrase agile', true)
        .addField('!coachinggg', 'Renvoie une très longue phrase agile', true)
        .addField('!printcoaching \
        <s:sujet|v:verbe|comp:complement|conj:conjonction>',
        'Affiche le fichier de phrases')
        .addField('!addcoaching \
        <s:sujet|v:verbe|comp:complement|conj:conjonction> <phrase>',
        'Ajoute un bout de phrase au générateur. Le générateur génère \
        les phrases avec la méthode suivante :\n<sujet> <verbe> <sujet> \
        <complement> ( + <conjonction> si une autre phrase doit suivre)\n \
        **ATTENTION** : Lisez des exemples avec !printcoaching \
        avant de vous lancer !')
        .addField('!heure', 'Il est toujours l\'heure du pastis');

    msg.reply(help);
  }
  if (command === 'rip') {
    const attachment = new Attachment('https://i.imgur.com/w3duR07.png');
    msg.reply(attachment);
  }
  if (command === 'marx') {
    searchRandomImage('seize the means of production meme', 5,
        function(url : string) {
          msg.reply(new Attachment(url));
        });
  }
  if (command === 'source') {
    msg.reply('https://github.com/Myreage/pastisbot');
  }
  if (command === 'newquote') {
    if (args[0] && args[1]) {
      fs.appendFile('resources/quotes.txt', '\n' + args[0] + ' - ' + args[1],
          (err) => {
            if (err) console.log(err);
            else msg.reply('Citation sauvegardée');
          });
    }
  }
  if (command === 'randomquote') {
    fs.readFile('resources/quotes.txt', 'utf8', (err, data) => {
      if (err) console.log(err);
      else {
        const quotes = data.toString().split('\n');
        msg.reply(quotes[Math.floor(Math.random()*quotes.length)]);
      }
    });
  }

  if (command === 'pastis') {
    searchRandomImage('pastis', 4,
        function(url : string) {
          msg.reply(new Attachment(url));
        });
  }
  if (command === 'coachinggg') {
    msg.reply(coachingBuilder(Math.floor(Math.random()*5) + 3));
  }
  if (command === 'coachingg') {
    msg.reply(coachingBuilder(Math.floor(Math.random()*3) + 2));
  }
  if (command === 'coaching') {
    msg.reply(coachingBuilder(1));
  }
  if (command === 'heure' ) {
    msg.reply(pastisTime());
  }

  if (command === 'addcoaching') {
    let file = '';
    if (args[0] && args[1]) {
      if (args[0] === 's') {
        file = 'sujet.txt';
      } else if (args[0] === 'v') {
        file = 'verbe.txt';
      } else if (args[0] === 'comp') {
        file = 'complement.txt';
      } else if (args[0] === 'conj') {
        file = 'conjonctions.txt';
      } else {
        file = '';
        msg.reply('Mauvaise commande');
      }

      if (file != '') {
        fs.appendFile('resources/' + file, '\n' + args[1],
            (err) => {
              if (err) console.log(err);
              else msg.reply('Phrase sauvegardée');
            });
      }
    }
  }
  if (command === 'printcoaching') {
    let file = '';
    if (args[0]) {
      if (args[0] === 's') {
        file = 'sujet.txt';
      } else if (args[0] === 'v') {
        file = 'verbe.txt';
      } else if (args[0] === 'comp') {
        file = 'complement.txt';
      } else if (args[0] === 'conj') {
        file = 'conjonctions.txt';
      } else {
        file = '';
        msg.reply('Mauvaise commande');
      }

      fs.readFile('resources/' + file, 'utf8', (err, data) => {
        if (err) console.log(err);
        else {
          msg.reply(data.toString());
        }
      });
    }
  }
});

client.login(config.bot_token);
