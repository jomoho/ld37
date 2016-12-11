// help-module.js
module.exports = (bot) => {
  bot.hear('help', (payload, chat) => {
    // Send Help Menu to the user...
    chat.say('I can\'t help you, you are alone in this.')
  });
};