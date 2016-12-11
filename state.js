const rand = require('random-seed')
const fs = require('fs')

const generate = require('./generate')

let state = null

function makeUser(userId){
  let seed = '' + Math.random()
  state[userId] = {
    userId: userId,
    seed: seed,
    player: generate.generateMapAndPlayer(seed)
  }
}

function loadState(userId){
  if(fs.existsSync('./save_state.json')) {
    if(state === null){
      var s = fs.readFileSync('./save_state.json')
      state = JSON.parse(s)  
    }
  }else{
    state = {}
  }
  
  if (!state[userId]) {
    makeUser(userId)
  }
}

function saveState(){
  var s = JSON.stringify(state)
  fs.writeFileSync('./save_state.json', s)
}

module.exports = {
  saveState: saveState,
  getState: (userId) => {
    loadState(userId)
    saveState()
    return state[userId]
  },
  get(userId, field){
    loadState(userId)
    return state[userId][field]
  },
  setState: (userId, field, value) => {
    loadState(userId)
    state[userId][field] = value
    saveState()
    return state[userId]
  },
}