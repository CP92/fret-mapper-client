'use strict'

const store = require('./store.js')

const musicNotes = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#']

const noteLayout = function (notes, tuners) {
  const collection = []

  notes.forEach(function (note, index) {
    const outNotes = musicNotes.map(x => x)

    if (outNotes.indexOf(note) === 0) {
      // console.log(outNotes)
      outNotes.shift()
      //const curCol = outNotes

      containsTuner(tuners[index])
      //store.tuneHash[`string${index}`] = curCol
      collection.push(outNotes)
    } else {
      const last = outNotes.slice(0, outNotes.indexOf(note) + 1)
      for (let i = 0; i < last.length; i++) {
        outNotes.shift()
      }
      last.forEach(function (x) {
        outNotes.push(x)
      })
      // const colKey = outNotes.pop()
      // console.log(colKey)
      //const curCol = outNotes
      outNotes.pop()
      collection.push(outNotes)
      // console.log(collection)
      // console.log(curCol)
      containsTuner(tuners[index])
      //store.tuneHash[`string${index}`] = curCol
    }
  })

  //console.log(collection)
  collection.forEach(function (col, index) {
    store.tuneHash[`string${index}`] = col
  })
  //console.log(store.tuneHash)
  return collection
}

const oneNoteLayout = function (notes, tuners) {
  const collection = []

  notes.forEach(function (note, index) {
    const outNotes = musicNotes.map(x => x)

    if (outNotes.indexOf(note) === 0) {
      // console.log(outNotes)
      outNotes.shift()
      //const curCol = outNotes

      containsTuner(tuners[index])
      //store.tuneHash[`string${index}`] = curCol
      collection.push(outNotes)
    } else {
      const last = outNotes.slice(0, outNotes.indexOf(note) + 1)
      for (let i = 0; i < last.length; i++) {
        outNotes.shift()
      }
      last.forEach(function (x) {
        outNotes.push(x)
      })
      // const colKey = outNotes.pop()
      // console.log(colKey)
      //const curCol = outNotes
      outNotes.pop()
      collection.push(outNotes)
      // console.log(collection)
      // console.log(curCol)
      containsTuner(tuners[index])
      //store.tuneHash[`string${index}`] = curCol
    }
  })

  //console.log(collection)
  //console.log(tuners[0].slice(7))
  collection.forEach(function (col, index) {
    store.tuneHash[`string${tuners[0].slice(7)}`] = col
  })
  //console.log(store.tuneHash)
  return collection
}

const containsTuner = function (tuner) {
  Object.keys(store.tuneHash).some(function (key) {
    if (key.includes(tuner)) {
      delete store.tuneHash[key]
    }
  })
}

const setCurrentTuning = function () {
  let noteListCollection = []
  let noteList = []
  //console.log(store.currentTuning)
  store.currentTuning['title'] = $('#tuning-title').val()
  //console.log(store.currentTuning.title)
  $('.fret').each(function (fret) {
    const fretId = this.id.slice(5, 6)
    //console.log(fretId)
    store.currentTuning[`string${fretId}`].push($('#' + this.id).text())

  })

  //console.log(store.currentTuning)
}

const searchSavedTunings = function (tuningName) {
  const tuning = store.tunings.find(function (tuning) {
    if (tuning.title === tuningName) {
      // console.log(tuning)
      return tuning
    }
  })
  // console.log(tuning)
  return tuning
}

const getTunerNote = function (notes) {
  //console.log(notes)
  const tunerNotes = notes.map(function (note) {
    return musicNotes[musicNotes.indexOf(note) - 1]
  })
  //console.log(tunerNotes)
  return tunerNotes
}

module.exports = {
  noteLayout,
  searchSavedTunings,
  getTunerNote,
  setCurrentTuning,
  oneNoteLayout
}
