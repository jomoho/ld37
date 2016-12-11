const state = require('./state')
const fight = require('./fight')
const player = require('./player')

function showRoom(pl, c){
  var game = state.getState(pl.sender.id)
  
  c.say('Room is: (' + game.player.pos.x + ', '+ game.player.pos.y +')')
}

module.exports = {
  showMap: (pl, c) =>{
    console.log(pl)
    map = state.getState(pl.sender.id)
    c.say(player.getMapAscii(pl.sender.id))
  },
  
  showRoom: showRoom,
  
  showInventory: (pl, c) =>{
    c.say('here is your Inventory:')
    c.say({
      attachment: 'image',
      url: 'http://ludumdare.com/compo/wp-content/uploads/2016/12/compromise-550x300.png'
    })
  },
  moveUp: function(pl, c){
    if(Math.random() > 0.5){
      c.conversation(fight.startFight)
    }
    player.move(pl.sender.id, 'up')
  },
  moveDown: function(pl, c){
    if(Math.random() > 0.5){
      c.conversation(fight.startFight)
    }
    player.move(pl.sender.id, 'down')
  },
  moveLeft: function(pl, c){
    if(Math.random() > 0.5){
      c.conversation(fight.startFight)
    }
    player.move(pl.sender.id, 'left')
  },
  moveRight: function(pl, c){
    if(Math.random() > 0.5){
      c.conversation(fight.startFight)
    }
    player.move(pl.sender.id, 'right')
  },
  showNeighbors: function(pl, c){
    var n = player.getNeighbors(pl.sender.id)
    c.say(JSON.stringify(n))
  }
}