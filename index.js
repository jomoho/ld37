'use strict';
const BootBot = require('bootbot');
const cfg = require('config')

const bot = new BootBot({
  accessToken: cfg.get('accessToken'),
  verifyToken: cfg.get('verifyToken'),
  appSecret: cfg.get('appSecret'),
});


const helpMod = require('./modules/help')
const actions = require('./actions')
const state = require('./state')
const generate = require('./generate')
const player = require('./player')

//console.log(JSON.stringify(generate.generateMapAndPlayer('random')))

bot.module(helpMod);

bot.setGreetingText('Welcome To Dungeon #, where magic and mystery await your exploration.')

bot.setGetStartedButton((payload, chat) => {
  chat.say('generating rooms', {typing: true})
  chat.say('selecting entry point', {typing: true})
  chat.say('You are in a room, check the map from the menu or type show map', {typing: true})
})

let menuButtons = [
  { type: 'postback', title: 'Show Map', payload: 'show_map' },
  { type: 'postback', title: 'Show Inventory', payload: 'show_inventory' },
]

bot.setPersistentMenu(menuButtons)
bot.on('postback:show_map', actions.showMap)
bot.on('postback:show_inventory', actions.showInventory)
bot.on('postback:show_room', actions.showRoom)
bot.on('postback:show_neighbors', actions.showNeighbors)

bot.hear('show map', actions.showMap)
bot.hear('show room', actions.showRoom)
bot.hear('show inventory', actions.showInventory)
bot.hear('show neighbors', actions.showNeighbors)

bot.hear('move up', actions.moveUp)
bot.hear('move down', actions.moveDown)
bot.hear('move left', actions.moveLeft)
bot.hear('move right', actions.moveRight)

bot.start();