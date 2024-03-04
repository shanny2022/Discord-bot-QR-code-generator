import { Client, MessageAttachment, Intents } from 'discord.js';
import axios from 'axios';

const client = new Client({ intents: [Intents.FLAGS.Guilds, Intents.FLAGS.GuildMessages] });

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', async (message) => {
  if (!message.content.startsWith('!qrcode')) return;

  const args = message.content.slice('!qrcode'.length).trim().split(/ +/g);
  const data = args.join(' ');

  const response = await axios.get(`https://chart.googleapis.com/chart?cht=qr&chl=${encodeURIComponent(data)}&chs=160x160&chld=L|0`, { responseType: 'arraybuffer' });
  const attachment = new MessageAttachment(response.data, 'qrcode.png');

  message.reply({ files: [attachment] });
});

client.login('MTIxNDI1NDExNzYxMTExNDUxNg.GJNuGW.dTbX8AAfEqujLFWH02E355yeUe3mDmg3UuZJG0');
