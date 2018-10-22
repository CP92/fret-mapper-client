'use strict'

const api = require('./api')
const ui = require('./ui')
const getFormFields = require('../../lib/get-form-fields')
const notesToolBox = require('./notes.js')
const store = require('./store')

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

const onLoad = function (event) {
  event.preventDefault()
  const frets = []
  const tuners = []
  let tunerNotes = []
  $('.tuner').each(function () { tuners.push('#' + this.id) })
  $('.tuner').each(function () { tunerNotes.push($('#' + this.id).val()) })
  $('.fret').each(function () { frets.push(this.id) })
//  console.log(tuners)
  tunerNotes = notesToolBox.noteLayout(tunerNotes, tuners)
//  console.log(tunerNotes)
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

  // console.log(store.token)
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
  // console.log(passData)
  api.sendPassChange(passData)
    .then(ui.passChangeSuccess)
    .catch(ui.wrongPassChange)
}

const onLogOut = function (event) {
  // console.log(event)
  event.preventDefault()
  api.sendLogOut()
    .then(ui.logOutSuccess)
    .catch(ui.error)
}

const onDeleteTuning = function () {
  event.preventDefault()
  if (store.token) {

  }
}

const onSaveTuning = function (event) {
  event.preventDefault()
  if (store.token) {
    const title = $('#tuning-title').val()
    store.tuneHash['title'] = title
    // console.log(store.tuneHash)
    //console.log(store.token)
    const data = {
      'tuning': {'title': store.tuneHash['title']}
    }

    //notesToolBox.setCurrentTuning()
    //console.log(store.tuneHash)
    for (const [key, value] of Object.entries(store.tuneHash)) {
      if (key === 'title') {
        // console.log('skipped')
      } else {
        data.tuning[key] = value
      }
    }
    //console.log(data)
    // console.log(data)
    if (store.currentTuning.id !== null) {
        api.sendUpdateExistingTuning(data)
          .then(api.sendGetUserTunings)
            .then(ui.fillTuningsDropDown)
         {
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
  //console.log($(event.target).val())
  const tuningName = $(event.target).val()
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
