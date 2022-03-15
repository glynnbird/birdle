const wl = require('./wordlist.js').solutions

function d(e, a) {
  var s = new Date(e),
    t = new Date(a).setHours(0, 0, 0, 0) - s.setHours(0, 0, 0, 0);
  return Math.round(t / 864e5);
}

// calculate current puzzle number as modulo of date
const getPuzzleNumber = function (e) {
  const s = d(new Date(2021, 5, 19, 0, 0, 0, 0), e)
  return s % wl.length
}

// get current solution word, based on puzzle number
const getSolution = function(e) {
  const a = getPuzzleNumber(e)
  return wl[a]
}

module.exports = {
  getSolution,
  getPuzzleNumber
}