'use strict'

const store = require('./store.js')
const notesToolBox = require('./notes')

const changeStringNotes = function (notes, frets) {
  frets.forEach(function (fret, index) {
    $(`#${fret}`).text(notes[index])
  })
}

const changeOnLoad = function (noteGroups, frets) {
  frets.forEach(function (fret) {

  })
}

const signUpError = function () {
  $('#sign-up-message').html("<h4>The email you have entered already exists, or your passwords don't match. Please try again</h4>")
  setTimeout(function () { $('#sign-up-message').fadeOut('slow') }, 500)
  $('#sign-up-form').trigger('reset')
}
// Generic error when something unforseen breaks
const error = function (response) {
  // console.log(response)
  $('#state-message').fadeIn().html('<h4>Something broke!</h4>')
  setTimeout(function () { $('#sign-in-message').fadeOut('slow') }, 500)
}
// shows the player they are signed up
const signUpSuccess = function () {
  $('#sign-up-message').html('')
  $('#sign-up-form').addClass('hidden')
  $('#sign-up-message').fadeIn().html('<h4>Sign up successful! Please login.</h4>')
  setTimeout(function () { $('#sign-up-message').fadeOut('slow') }, 500)
  $('#sign-up-form').trigger('reset')
}
//  shows the player they are logged in
const loginSuccess = function (response) {
  $('#sign-in-message').fadeIn().html('<h4>Login successful!</h4>')
  setTimeout(function () { $('#sign-in-message').fadeOut('slow') }, 500)
  const token = response.user.token
  store.token = token
  $('#sign-out').removeClass('hidden')
  $('#change-password').removeClass('hidden')
  $('#sign-in-form').addClass('hidden')
  $('#sign-up-form').addClass('hidden')
  $('#sign-in-button').addClass('hidden')
  $('#sign-up-button').addClass('hidden')
  $('#sign-in-form').trigger('reset')
  $('#tuning-selector-div').removeClass('hidden')
}

const onPasswordChangeShow = function () {
  if ($('#change-password-form').hasClass('hidden')) {
    $('#change-password-form').trigger('reset')
    $('#change-password-form').removeClass('hidden')
  } else {
    $('#change-password-form').addClass('hidden')
  }
}

const passChangeSuccess = function () {
  $('#change-password-form').addClass('hidden')
  $('#sign-in-message').fadeIn().html('<h4>Password change successful!</h4>')
  setTimeout(function () { $('#sign-in-message').fadeOut('slow') }, 500)
  $('#change-password-form').trigger('reset')
}

const loginError = function () {
  $('#state-message').fadeIn().html('<h4>Please enter a existing email and password.</h4>')
  setTimeout(function () { $('#game-state-message').fadeOut('slow') }, 500)
  $('#sign-in-form').trigger('reset')
}

const showLoginForm = function () {
  if ($('#sign-in-form').hasClass('hidden')) {
    $('#sign-up-form').trigger('reset')
    $('#sign-in-form').trigger('reset')
    $('#sign-up-form').addClass('hidden')
    $('#sign-in-form').removeClass('hidden')
  } else {
    $('#sign-in-form').addClass('hidden')
  }
}

const showSignUpForm = function () {
  if ($('#sign-up-form').hasClass('hidden')) {
    $('#sign-up-form').trigger('reset')
    $('#sign-in-form').trigger('reset')
    $('#sign-in-form').addClass('hidden')
    $('#sign-up-form').removeClass('hidden')
  } else {
    $('#sign-up-form').addClass('hidden')
  }
}

//  Shows the player they are logged out
const logOutSuccess = function (response) {
  $('#logout-message').fadeIn().html('<h4>Logout successful!</h4>')
  setTimeout(function () { $('#logout-message').fadeOut('slow') }, 500)
  $('#sign-out').addClass('hidden')
  $('#change-password-form').addClass('hidden')
  $('#change-password').addClass('hidden')
  $('#sign-in-button').removeClass('hidden')
  $('#sign-up-button').removeClass('hidden')
  $('#change-password-form').trigger('reset')
  $('#sign-in-form').trigger('reset')
  $('#sign-up-form').trigger('reset')
  $('#state-message').html('')
  $('#sign-in-message').html('')
  $('#tuning-selector-div').addClass('hidden')
  $('#tuning-title').val('')
  store.token = null
  store.tunings = {}
  store.currentTuning = {}
  store.tuneHash = {}
}

const inputNotAllowed = function () {
  $('#state-message').fadeIn().html('<h4>Please log in to do that!</h4>')
  setTimeout(function () { $('#state-message').fadeOut('slow') }, 500)
}

const fillTuningsDropDown = function (response) {
  store.tunings = response.tunings
  if (store.tunings.length === 0) {
    $('#tuning-selector').text('Select Tuning')
    $('.selector').html('')
  } else {
    $('#tuning-selector').text('Select Tuning')
    $('.selector').html('')
    store.tunings.forEach(function (tuning) {
      $('.selector').append(`<button class="dropdown-item drop-tuning" type="button">${tuning.title}</button>`)
    })
  }
  store.currentTuning = store.tuneHash
}

const loadCurrentTuning = function () {
  const firstNotes = []
  let notes = []
  const frets = []
  $('#tuning-title').val(store.currentTuning.title)
  for (const [key, value] of Object.entries(store.currentTuning)) {
    if (key.includes('string')) {
      firstNotes.push(value[0])
      notes.push(value)
    }
  }
  $('.fret').each(function () {
    frets.push(this.id)
  })
  const tunerNotes = notesToolBox.getTunerNote(firstNotes)
  $('.tuner').each(function (tuner) {
    $('#' + this.id).text(tunerNotes[this.id.slice(6)])
  })
  notes = [].concat.apply([], notes)
  changeStringNotes(notes, frets)
}

const saveNotAllowedNoInput = function () {
  $('#state-message').fadeIn().html('<h4>Please enter a title to save the tuning!</h4>')
  setTimeout(function () { $('#state-message').fadeOut('slow') }, 500)
}

const deleteNotAllowedNoInput = function () {
  $('#state-message').fadeIn().html('<h4>In order to delete a tuning it must first be saved, and the title of the tuning must be in the title box</h4>')
  setTimeout(function () { $('#state-message').fadeOut('slow') }, 2000)
}

const noSavedTuning = function () {
  $('#state-message').fadeIn().html('<h4>No saved tuning to delete with that name!</h4>')
  setTimeout(function () { $('#state-message').fadeOut('slow') }, 2000)
}

const saveTuningSuccess = function () {
  $('#state-message').fadeIn().html('<h4>Tuning saved!</h4>')
  setTimeout(function () { $('#state-message').fadeOut('slow') }, 2000)
}

const deleteTuningSuccess = function () {
  $('#state-message').fadeIn().html('<h4>Tuning deleted!</h4>')
  setTimeout(function () { $('#state-message').fadeOut('slow') }, 2000)
}

const addString = function (lastString) {
  $(`#row-${lastString}`).removeClass('last-row')
  $('.container').append(`<div class="row last-row" id="row-${lastString + 1}">
    <div class="column col-xs-1 col-sm-1 col-md-1 col-lg-1 box tuner-${lastString + 1} text-center dropdown"  id="tuner">

        <button class="btn-sm btn-warning dropdown-toggle tuner" type="button" id="tuner-${lastString + 1}" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          ${notesToolBox.getFourth($(`#tuner-${lastString}`).text())}
        </button>
        <div class="dropdown-menu tuner-drop" aria-labelledby="tuner-${lastString + 1}">
          <button class="dropdown-item drop-tuning" type="button">A</button>
          <button class="dropdown-item drop-tuning" type="button">A#</button>
          <button class="dropdown-item drop-tuning" type="button">B</button>
          <button class="dropdown-item drop-tuning" type="button">C</button>
          <button class="dropdown-item drop-tuning" type="button">C#</button>
          <button class="dropdown-item drop-tuning" type="button">D</button>
          <button class="dropdown-item drop-tuning" type="button">D#</button>
          <button class="dropdown-item drop-tuning" type="button">E</button>
          <button class="dropdown-item drop-tuning" type="button">F</button>
          <button class="dropdown-item drop-tuning" type="button">F#</button>
          <button class="dropdown-item drop-tuning" type="button">G</button>
          <button class="dropdown-item drop-tuning" type="button">G#</button>
        </div>

    </div>
    <div class="column col-xs-1 col-sm-1 col-md-1 col-lg-1 box text-center fret" id="fret-${lastString + 1}-1">${lastString + 1}-1</div>
    <div class="column col-xs-1 col-sm-1 col-md-1 col-lg-1 box text-center fret" id="fret-${lastString + 1}-2">${lastString + 1}-2</div>
    <div class="column col-xs-1 col-sm-1 col-md-1 col-lg-1 box text-center fret" id="fret-${lastString + 1}-3">${lastString + 1}-3</div>
    <div class="column col-xs-1 col-sm-1 col-md-1 col-lg-1 box text-center fret" id="fret-${lastString + 1}-4">${lastString + 1}-4</div>
    <div class="column col-xs-1 col-sm-1 col-md-1 col-lg-1 box text-center fret" id="fret-${lastString + 1}-5">${lastString + 1}-5</div>
    <div class="column col-xs-1 col-sm-1 col-md-1 col-lg-1 box text-center fret" id="fret-${lastString + 1}-6">${lastString + 1}-6</div>
    <div class="column col-xs-1 col-sm-1 col-md-1 col-lg-1 box text-center fret" id="fret-${lastString + 1}-7">${lastString + 1}-7</div>
    <div class="column col-xs-1 col-sm-1 col-md-1 col-lg-1 box text-center fret" id="fret-${lastString + 1}-8">${lastString + 1}-8</div>
    <div class="column col-xs-1 col-sm-1 col-md-1 col-lg-1 box text-center fret" id="fret-${lastString + 1}-9">${lastString + 1}-9</div>
    <div class="column col-xs-1 col-sm-1 col-md-1 col-lg-1 box text-center fret" id="fret-${lastString + 1}-10">${lastString + 1}-10</div>
    <div class="column col-xs-1 col-sm-1 col-md-1 col-lg-1 box text-center fret last-fret" id="fret-${lastString + 1}-11">${lastString + 1}-11</div>
  </div>`)

}

const removeString = function (lastString) {
  $('.container').children().last().remove()
  console.log(lastString)
  $(`#row-${lastString - 1}`).addClass('last-row')
}

module.exports = {
  changeStringNotes,
  changeOnLoad,
  loginSuccess,
  signUpSuccess,
  error,
  signUpError,
  logOutSuccess,
  showSignUpForm,
  showLoginForm,
  loginError,
  passChangeSuccess,
  onPasswordChangeShow,
  inputNotAllowed,
  fillTuningsDropDown,
  loadCurrentTuning,
  saveNotAllowedNoInput,
  deleteNotAllowedNoInput,
  noSavedTuning,
  saveTuningSuccess,
  deleteTuningSuccess,
  addString,
  removeString
}
