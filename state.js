// load old state
const fs = require('fs')
const path = require('path')
const homedir = require('os').homedir()
const statePath = path.join(homedir,'.birdle.json')

// load state from file
const load = function(solutionNumber) {
  const blankHistory = { guesses: 0, history: [], number: solutionNumber }
  const state = fs.existsSync(statePath) ?  require(statePath) : blankHistory
  return state.number === solutionNumber ? state : blankHistory
}

// save state to file
const save = function(s) {
  const str = JSON.stringify(s)
  fs.writeFileSync(statePath, str, {encoding: 'utf-8'})
}

module.exports = {
  load,
  save
}
