const argv = process.argv
const colors = require('colors')
const sol = require('./solution.js')
const wl = require('./wordlist.js')
allwords = wl.solutions.concat(wl.words)

// calculate today's solution
const d = new Date()
const solutionNumber = sol.getPuzzleNumber(d)
const solution = sol.getSolution(d).toUpperCase()


// load old state
const state = require('./state.js')
const previousState = state.load(solutionNumber)

// output history
const output = function(s) {
  for(let i = 0; i < s.guesses ; i++) {
    console.log(s.history[i].output)
  }
  if (previousState.guesses===6 && !previousState.history[5].correct) {
    console.log(solution)
  }
}

// must provide guess
if (argv.length !== 3) {
  console.error('Syntax: birdle <guess>')
  output(previousState)
  process.exit(1)
}

// guess must be 5 characters
const guess = argv[2].trim().toUpperCase()
if (guess.length !== 5) {
  console.error('Guess must be exactly 5 characters')
  output(previousState)
  process.exit(2)
}

// guess must be 5 characters
if (!guess.match(/^[A-Z]+$/)) {
  console.error('Guess must only consist of a-z characters')
  output(previousState)
  process.exit(3)
}

// only six guesses a day
if (previousState.guesses === 6) {
  console.error('You are allowed only six guesses a day')
  output(previousState)
  process.exit(4)
}

// no more guessing after correct answer
if (previousState.guesses > 0 && previousState.history[previousState.guesses - 1].correct) {
  console.error('You have already solved today\'s puzzle')
  output(previousState)
  process.exit(5)
}

// guess must be valid word
if (!allwords.includes(guess.toLowerCase())) {
  console.error('Guess not a valid word')
  output(previousState)
  process.exit(6)
}

const matchSolution = function() {
  const retval = {
    letterByLetter: [],
    correct: true,
    output: '',
    guess: guess
  }
  const correctLetters = []
  for(let i = 0; i < 5; i++) {
    const letter = guess[i]
    if (solution[i] === letter) {
      correctLetters.push(letter)
    }
  }
  for(let i = 0; i < 5; i++) {
    const letter = guess[i]
    if (solution[i] === letter) {
      retval.letterByLetter.push('correct')
      retval.output += letter.white.bgGreen
    } else if (solution.includes(letter)) {
      retval.letterByLetter.push('present')
      retval.correct = false
      if (correctLetters.includes(letter)) {
        retval.output += letter.black.bgWhite
      } else {
        retval.output += letter.white.bgYellow
      }
    } else {
      retval.letterByLetter.push('absent')
      retval.correct = false
      retval.output += letter.black.bgWhite
    }
  }
  return retval
}

const play = function () {
  const response = matchSolution()
  previousState.guesses++
  previousState.history.push(response)
  state.save(previousState)
  output(previousState)
}

module.exports = {
  play
}

