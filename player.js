const state = require('./state')
const generate = require('./generate')

module.exports = {
  getNeighbors: userId => {
    var player = state.get(userId, 'player')
    return generate.getNeighbors(player.map, player.pos.x, player.pos.y)
  },
  move(userId, dir){
    var player = state.get(userId, 'player')
    var n = generate.getNeighbors(player.map, player.pos.x, player.pos.y)
    if(n[dir]){
      player.pos.x = n[dir].x
      player.pos.y = n[dir].y
      player.map[player.pos.y][player.pos.x].visited = true
      state.saveState()
    }
  },
  getMapAscii(userId){
    var player = state.get(userId, 'player')
    var map = player.map
    var s = ''
    for(var y = 0; y < generate.MAPSIZE; ++y){
      for(var x = 0; x < generate.MAPSIZE; ++x) {
        var c = map[y][x]
        if(c){
          c = map[y][x].val
        }
        
        if(map[y][x].visited === true){
          c = '_'
        }
        
        if(player.pos.x == x && player.pos.y == y){
          c = '*'
        }
        s+= ''+ c + '  '
      }
      s += '\n'
    }
    return s
  },
  add(userId, field, amount){
    var player = state.get(userId, 'player')
    if(typeof player[field] === 'number'){
      player[field] += amount
    }
  },
  getFightChance(userId){
    
  },
  getChance(userId){
    
  }
}