'use strict'

const store = require('./store.js')

const musicNotes = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#']

const noteLayout = function (notes, tuners) {
  const collection = []
  //console.log(notes)
  //console.log(tuners)
  notes.forEach(function (note, index) {
    const outNotes = musicNotes.map(x => x)

    if (outNotes.indexOf(note) === 0) {
      outNotes.shift()
      containsTuner(tuners[index])
      collection.push(outNotes)
    } else {
      const last = outNotes.slice(0, outNotes.indexOf(note) + 1)
      for (let i = 0; i < last.length; i++) {
        outNotes.shift()
      }
      last.forEach(function (x) {
        outNotes.push(x)
      })
      outNotes.pop()
      collection.push(outNotes)
      containsTuner(tuners[index])
    }
  })

  collection.forEach(function (col, index) {
    store.tuneHash[`string${index}`] = col
  })
  return collection
}

const oneNoteLayout = function (notes, tuners) {
  const collection = []

  notes.forEach(function (note, index) {
    const outNotes = musicNotes.map(x => x)

    if (outNotes.indexOf(note) === 0) {
      outNotes.shift()
      containsTuner(tuners[index])
      collection.push(outNotes)
    } else {
      const last = outNotes.slice(0, outNotes.indexOf(note) + 1)
      for (let i = 0; i < last.length; i++) {
        outNotes.shift()
      }
      last.forEach(function (x) {
        outNotes.push(x)
      })
      outNotes.pop()
      collection.push(outNotes)
      containsTuner(tuners[index])
    }
  })

  collection.forEach(function (col, index) {
    store.tuneHash[`string${tuners[0].slice(7)}`] = col
  })
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
  store.currentTuning['title'] = $('#tuning-title').val()
  $('.fret').each(function (fret) {
    const fretId = this.id.slice(5, 6)
    store.currentTuning[`string${fretId}`].push($('#' + this.id).text())
  })
}

const searchSavedTunings = function (tuningName) {
  let tuning = {}
  if (typeof store.tunings === 'undefined') {
    return tuning
  } else {
    tuning = store.tunings.find(function (objTuning) {
      return objTuning.title === tuningName
    })
  }
  if (typeof tuning === 'undefined') {
    tuning = {}
  }
  return tuning
}

const getTunerNote = function (notes) {
  const tunerNotes = notes.map(function (note) {
    return musicNotes[musicNotes.indexOf(note) - 1]
  })
  return tunerNotes
}

module.exports = {
  noteLayout,
  searchSavedTunings,
  getTunerNote,
  setCurrentTuning,
  oneNoteLayout
}
