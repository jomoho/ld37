'use strict';
const BootBot = require('bootbot');
const cfg = require('config')

const bot = new BootBot({
  accessToken: cfg.get('accessToken'),
  verifyToken: cfg.get('verifyToken'),
  appSecret: cfg.get('appSecret'),
});

bot.on('message', (payload, chat) => {
  const text = payload.message.text;
  chat.say(`Echo: ${text}`);
});

bot.start();