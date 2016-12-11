
state = require('./state')


function attack(pl, c){
  var atk = pl.message.text.toLowerCase()
  if(Math.random() < 0.7){
    c.say('Attack: ' + atk + ' OP -1, EXP +1').then(pl => {
      c.ask({
        text: 'how are you going to defend yourself?',
        quickReplies: ['wet towel', 'kitchensink']
      }, defense)
    })
  }
}

function defense(pl, c){
  
  var def = pl.message.text.toLowerCase()
  if(Math.random() < 0.3){
    c.say('Defense: ' + def + ' OP -1, EXP +1').then(pl => {
      c.end()
    })
  }
}

function opponentAttack(pl, co){
  
}

function opponentDefense(pl, co){
  
}


module.exports = {
  startFight: function(convo){
      convo.say('A big ghost is right in front of you').then((pl) => {
        convo.ask({
          text: 'how do you attack?',
          quickReplies: ['dagger', 'spell', 'spear']
        }, attack);
      })
  }
}