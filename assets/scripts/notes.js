'use strict'

const store = require('./store.js')

const noteLayout = function (notes, tuners) {
  const collection = []
  const musicNotes = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#']

  notes.forEach(function (note, index) {
    const outNotes = musicNotes.map(x => x)

    if (outNotes.indexOf(note) === 0) {
      //console.log(outNotes)
      const colKey = outNotes.shift()
      const curCol = outNotes

      containsTuner(tuners[index])
      store.tuneHash[tuners[index] + '-' + colKey] = curCol
      collection.push(outNotes)
    } else {
      const last = outNotes.slice(0, outNotes.indexOf(note) + 1)
      for (let i = 0; i < last.length; i++) {
        outNotes.shift()
      }
      last.forEach(function (x) {
        outNotes.push(x)
      })
      const colKey = outNotes.pop()
      //console.log(colKey)
      const curCol = outNotes
      collection.push(outNotes)
      //console.log(curCol)
      containsTuner(tuners[index])
      store.tuneHash[tuners[index] + '-' + colKey] = curCol
    }
  })
  console.log(store.tuneHash)
  return collection
}

const containsTuner = function (tuner) {
  Object.keys(store.tuneHash).some(function(key){
    if(key.includes(tuner)){
      delete store.tuneHash[key]
    }
  })
}

module.exports = {
  noteLayout
}
