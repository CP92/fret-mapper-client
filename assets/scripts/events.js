'use strict'

// const api = require('./api')
const ui = require('./ui')
// const getFormFields = require('../../lib/get-form-fields')
const notesToolBox = require('./notes.js')

const onTunerChange = function (event) {
  event.preventDefault()
  const note = [$(event.target).val()]
  const tuner = ['#' + $(event.target).closest('select').attr('id')]
  //console.log(tuner)
  const frets = []
  $(event.target).parent().siblings().each(function () { frets.push(this.id) })
  let newStringTuning = notesToolBox.noteLayout(note, tuner)
  newStringTuning = [].concat.apply([], newStringTuning)
  ui.changeStringNotes(newStringTuning, frets)
}

const onLoad = function (event) {
  event.preventDefault()
  const frets = []
  const tuners = []
  let tunerNotes = []
  $('.tuner').each(function () { tuners.push('#' + this.id) })
  $('.tuner').each(function () { tunerNotes.push($('#' + this.id).val()) })
  $('.fret').each(function () { frets.push(this.id) })
  tunerNotes = notesToolBox.noteLayout(tunerNotes, tuners)
  tunerNotes = [].concat.apply([], tunerNotes)
  ui.changeStringNotes(tunerNotes, frets)
}

module.exports = {
  onTunerChange,
  onLoad
}
