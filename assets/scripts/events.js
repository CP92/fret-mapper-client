'use strict'

const api = require('./api')
const ui = require('./ui')
const getFormFields = require('../../lib/get-form-fields')
const notesToolBox = require('./notes.js')
const store = require('./store')

// Changes the single line when a tuner is changed
const onTunerChange = function (event) {
  event.preventDefault()
  const note = [$(event.target).val()]
  const tuner = ['#' + $(event.target).closest('select').attr('id')]
  const frets = []
  $(event.target).parent().siblings().each(function () { frets.push(this.id) })
  let newStringTuning = notesToolBox.oneNoteLayout(note, tuner)
  newStringTuning = [].concat.apply([], newStringTuning)
  ui.changeStringNotes(newStringTuning, frets)
}

// Loads the tuning for the guitar. At the current version this is standard E at all times
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
  store.currentTuning = {}
}

const onSignUpCreds = function (event) {
  event.preventDefault()
  const credData = getFormFields(event.target)
  api.sendSignUpCreds(credData)
    .then(ui.signUpSuccess)
    .catch(ui.signUpError)
}

const onLoginCreds = function (event) {
  event.preventDefault()
  const credData = getFormFields(event.target)
  api.sendLoginCreds(credData)
    .then(ui.loginSuccess)
    .then(api.sendGetUserTunings)
    .then(ui.fillTuningsDropDown)
    .catch(ui.loginError)
}

const onPasswordChange = function (event) {
  event.preventDefault()
  const passData = getFormFields(event.target)
  api.sendPassChange(passData)
    .then(ui.passChangeSuccess)
    .catch(ui.wrongPassChange)
}

const onLogOut = function (event) {
  event.preventDefault()
  api.sendLogOut()
    .then(ui.logOutSuccess)
    .catch(ui.error)
}

// allows the user to delete a existing tuning
const onDeleteTuning = function (event) {
  event.preventDefault()
  if (store.token) {
    const title = $('#tuning-title').val()

    store.tuneHash['title'] = title
    const data = {
      'tuning': {'title': store.tuneHash['title']}
    }
    for (const [key, value] of Object.entries(store.tuneHash)) {
      if (key === 'title') {
      } else {
        data.tuning[key] = value
      }
    }
    store.currentTuning = notesToolBox.searchSavedTunings(data.tuning.title)
    api.sendDeleteExistingTuning()
      .then(api.sendGetUserTunings)
      .then(ui.fillTuningsDropDown)
  } else {
    ui.inputNotAllowed()
  }
}

const onSaveTuning = function (event) {
  event.preventDefault()
  if (store.token) {
    const title = $('#tuning-title').val()
    store.tuneHash['title'] = title
    const data = {
      'tuning': {'title': store.tuneHash['title']}
    }
    for (const [key, value] of Object.entries(store.tuneHash)) {
      if (key === 'title') {
      } else {
        data.tuning[key] = value
      }
    }
    store.currentTuning = notesToolBox.searchSavedTunings(data.tuning.title)
    if ((!jQuery.isEmptyObject(store.currentTuning))) {
      api.sendUpdateExistingTuning(data)
        .then(api.sendGetUserTunings)
        .then(ui.fillTuningsDropDown)
    } else {
      api.sendNewTuning(data)
        .then(api.sendGetUserTunings)
        .then(ui.fillTuningsDropDown)
        .catch()
    }
  } else {
    ui.inputNotAllowed()
  }
}

const onGetUserTuning = function (event) {
  event.preventDefault()
  const tuningName = $(event.target).text()
  $('#tuning-selector').text(tuningName)
  store.currentTuning = notesToolBox.searchSavedTunings(tuningName)
  ui.loadCurrentTuning()
}

module.exports = {
  onTunerChange,
  onLoad,
  onLogOut,
  onPasswordChange,
  onLoginCreds,
  onSignUpCreds,
  onSaveTuning,
  onGetUserTuning,
  onDeleteTuning
}
