'use strict'

const api = require('./api')
const ui = require('./ui')
const getFormFields = require('../../lib/get-form-fields')
const notesToolBox = require('./notes.js')
const store = require('./store')

// Changes the single line when a tuner is changed
const onTunerChange = function (event) {
  event.preventDefault()
  //console.log(event)
  let curId = $(event.target).parent().siblings()[0]
  curId = $(curId).attr('id')
  //console.log(curId)
  const note = [$(event.target).text()]
  //console.log(note[0])
  $(`#${curId}`).text(note[0])
  //note = note.replace(/\W/g, '')
  //console.log($(`#${curId}`).text())
  const tuner = ['#' + curId]
  const frets = []
  $(event.target).parent().parent().siblings().each(function () { frets.push(this.id) })
  //console.log(note)
  //console.log(tuner)
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
  $('.tuner').each(function () { tunerNotes.push($('#' + this.id).text().replace(/\W/g, '')) })
  $('.fret').each(function () { frets.push(this.id) })
  //console.log(tunerNotes)
  //tunerNotes = tunerNotes.replace(/\W/g, '')
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
  let title = $('#tuning-title').val()
  title = title.replace(/[^\w\s]/gi, '')
  store.currentTuning = notesToolBox.searchSavedTunings(title)
  //console.log(title)
  if (store.token && title !== '') {
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
    api.sendDeleteExistingTuning()
      .then(api.sendGetUserTunings)
      .then(ui.fillTuningsDropDown)
    } else if (!store.token) {
      ui.inputNotAllowed()
    } else if (title === '') {
    ui.deleteNotAllowedNoInput()
}
}

const onSaveTuning = function (event) {
  event.preventDefault()
  let title = $('#tuning-title').val()
  title = title.replace(/[^\w\s]/gi, '')
  store.currentTuning = notesToolBox.searchSavedTunings(title)
  if (store.token && title !== '') {
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
  } else if (!store.token) {
    ui.inputNotAllowed()
  } else if (title === '') {
  ui.saveNotAllowedNoInput()
}
}

const onGetUserTuning = function (event) {
  event.preventDefault()
  const tuningName = $(event.target).text()
  $('#tuning-selector').text(tuningName)
  //console.log(tuningName)
  store.currentTuning = notesToolBox.searchSavedTunings(tuningName)
  //console.log(store.currentTuning)
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
