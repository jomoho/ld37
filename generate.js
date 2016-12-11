"use strict";
const rand = require('random-seed')
const objects = require('./objects')

const MAPSIZE = 8;

function floodfill (map, x, y, val, new_val){
  if(map[y][x] === val){
    map[y][x] = new_val
    if(x > 0){
      floodfill(map, x - 1, y, val, new_val)
    }
    if(x < MAPSIZE-1){
      floodfill(map, x+1, y, val, new_val)
    }
    if(y > 0) {
      floodfill(map, x, y - 1, val, new_val)
    }
    if(y < MAPSIZE-1){
      floodfill(map, x, y+1, val, new_val)
    }
  }
  return map;
}

function findAll(map, val){
  var areas = [];
  for(var y = 0; y < MAPSIZE; ++y){
    for(var x = 0; x < MAPSIZE; ++x) {
      if(map[y][x] === val){
        areas.push({x:x ,y:y})
      }
    }
  }
  return areas
}

function diff(a, b){
  return (Math.max(a.x, b.x) - Math.min(a.x, b.x)) + (Math.max(a.y, b.y) - Math.min(a.y, b.y))
}

function findClosestPair(a, b){
  var shortest = 1024
  var cp = null
  for(var i = 0; i < a.length; ++i){
    for(var j = 0; j < b.length; ++j){
      var d = diff(a[i], b[j])
      if(d < shortest){
        shortest = d
        cp = {a: a[i], b: b[j], dist: d}
      }
    }
  }
  return cp;
}

function findConnectionCP(cp){
  var xdir = Math.sign(cp.b.x - cp.a.x)
  var ydir = Math.sign(cp.b.y - cp.a.y)
  
  var res = [];
  for (var x = cp.a.x; x != cp.b.x; x+=xdir) {
    res.push({x: x, y: cp.a.y})
  }
  for (var y = cp.a.y; y != cp.b.y; y+=ydir) {
    res.push({x: cp.b.x, y: y})
  }
  return res
}

function countNeighbors(map, x, y){
  var n = 0
  if(x > 0){
    n += map[y][x-1]
  }
  if(x < MAPSIZE-1){
    n += map[y][x+1]
  }
  if(y > 0) {
    n += map[y-1][x]
  }
  if(y < MAPSIZE-1){
    n += map[y+1][x]
  }
  return n
}

function getNeighbors(map, x, y){
  var n = {}
  if(x > 0 && map[y][x-1]){
    n['left'] = {dir: 'left', x: x-1, y: y }
  }
  if(x < MAPSIZE-1 && map[y][x+1]){
    n['right'] = {dir: 'right', x: x+1, y: y }
  }
  if(y > 0 && map[y-1][x]) {
    n['up'] = {dir: 'up', x: x, y: y-1 }
  }
  if(y < MAPSIZE-1 && map[y+1][x]){
    n['down'] = {dir: 'down', x: x, y: y+1 }
  }
  return n
}

function findCapRooms(map){
  var caps = []
  for(var y = 0; y < MAPSIZE; ++y){
    for(var x = 0; x < MAPSIZE; ++x) {
      if(countNeighbors(map, x,y) == 1){
        caps.push({x:x, y:y})
      }
    }
  }
  return caps
}

function findFarthestApart(loc){
  var pairs = []
  var fpairs = []
  for(var i = 0; i < loc.length; ++i) {
    pairs.push([])
    for(var j = 0; j < loc.length; ++j) {
      if(i != j) {
        pairs[i].push({a: loc[i], b: loc[j], d: diff(loc[i], loc[j])})
      }
    }
    pairs[i].sort((a,b) => {return b.d - a.d})
    fpairs.push(pairs[i][0])
  }
  fpairs.sort((a,b) => {return b.d - a.d})
  return fpairs[0]
}

function generateMapAndPlayer(seed){
  const rnd = new rand(seed)
  
  //fill map with ones
  var map = []
  for(var i = 0; i < MAPSIZE; ++i){
    map.push([])
    for(var x = 0; x < MAPSIZE; ++x) {
      map[i].push(0)
    }
  }
  
  for(var i = 0; i < 27; ++i){
    var x = rnd(MAPSIZE)
    var y = rnd(MAPSIZE)
    map[y][x] = 1;
  }
  
  //areas
  var areas = 0;
  for(var y = 0; y < MAPSIZE; ++y){
    for(var x = 0; x < MAPSIZE; ++x) {
      if(map[y][x] == 1){
        areas ++;
        floodfill(map,x,y,1,areas+1)
      }
    }
  }
  console.log(map)
  
  console.log('found '+ areas + ' areas.. connecting')
  var allAreas = []
  for(var i = 0; i < areas; ++i) {
    allAreas.push({ls: findAll(map, i + 2), val: i+2})
  }
  
  var closestPairs = []
  for(var i = 0; i < allAreas.length; ++i) {
    closestPairs.push([])
    for(var j = 0; j < allAreas.length; ++j) {
      if(i != j) {
        closestPairs[i].push({a: i, b: j, cp: findClosestPair(allAreas[i].ls, allAreas[j].ls)})
      }
    }
    closestPairs[i].sort((a,b) => {return a.cp.d - b.cp.d})
  }
  
  
  for(var i = 0; i < closestPairs.length; ++i) {
    var cp = closestPairs[i][0].cp
    var val = allAreas[closestPairs[i][0].a].val
    var con = findConnectionCP(cp)
    console.log(con)
    for(var ii = 0; ii <con.length; ++ii){
      map[con[ii].y][con[ii].x] = val
    }
  }
  
  console.log('connected')
  console.log(map)
  var zeros = 0
  for(var y = 0; y < MAPSIZE; ++y){
    for(var x = 0; x < MAPSIZE; ++x) {
      if(map[y][x] == 0){
        zeros ++
      }
      if(map[y][x] > 1){
        floodfill(map,x,y,map[y][x], 1)
      }
    }
  }
  
  var caps = findCapRooms(map)
  var pair = findFarthestApart(caps)
  map[pair.a.y][pair.a.x] = 7
  map[pair.b.y][pair.b.x] = 9
  
  
  console.log('cleaned: ' + zeros)
  console.log(map)
  map = genRooms(map, rnd)
  
  var res = {
    inventory: {},
    pos: {x: pair.a.x, y: pair.a.y},
    start: pair.a,
    goal: pair.b,
    map: map
  }
  res.map[res.pos.y][res.pos.x].visited = true
  return res
}

function genRoom(val, x, y, rnd){
  var prot = objects.rooms[rnd(objects.rooms.length)]
  var rm = {
    val: val,
    objects: [],
    name: prot.name,
    visited: false
  }
  
  var n = rnd(3)
  for(var i = 0; i < n; ++i){
    var obj = objects.furniture[rnd( objects.furniture.length)]
    rm.objects.push(obj)
  }
  
  return rm
}

function genRooms(map, rnd){
  for(var y = 0; y < MAPSIZE; ++y){
    for(var x = 0; x < MAPSIZE; ++x) {
      if(map[y][x] !== 0){
        map[y][x]= genRoom(map[y][x], x, y, rnd)
      }
    }
  }
  return map
}

module.exports = {
  MAPSIZE: MAPSIZE,
  getNeighbors: getNeighbors,
  generateMapAndPlayer:generateMapAndPlayer
}
