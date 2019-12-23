import {Client, Attachment} from 'discord.js';
import {searchRandomImage} from './utils';
import config from './config';

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
  const args = msg.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  if (command === 'ping') {
    msg.reply('pong');
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
  if (command === 'newquote') {

  }
});

client.login(config.bot_token);
