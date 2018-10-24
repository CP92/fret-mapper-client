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
  //console.log(notes)
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
  noSavedTuning
}
