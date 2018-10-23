'use strict'

const store = require('./store.js')
const notesToolBox = require('./notes')

const changeStringNotes = function (notes, frets) {
  frets.forEach(function (fret, index) {
    $(`#${fret}`).text(notes[index])
    // console.log(notes[index] + ` added to #${fret}`)
  })
}

const changeOnLoad = function (noteGroups, frets) {
  frets.forEach(function (fret) {

  })
}

const signUpError = function () {
  // console.log(error)
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
  // console.log(response)
  // console.log(response.user.token)
  const token = response.user.token
  store.token = token
  // console.log(store.token)
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
  // store.token = null
  //console.log(store)
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
  console.log(store.tunings)
  if (jQuery.isEmptyObject(store.tunings)) {
    $('#tuning-selector').text('Select Tuning')
  } else {
    $('#tuning-selector').text('Select Tuning')
    $('.dropdown-menu').html('')
    store.tunings.forEach(function (tuning) {
      console.log('adding' + tuning.title)
      $('.dropdown-menu').append(`<button class="dropdown-item drop-tuning" type="button">${tuning.title}</button>`)
    })
  }
  store.currentTuning = null
}

const loadCurrentTuning = function () {
  console.log(store.currentTuning)
  const firstNotes = []
  let notes = []
  const frets = []
  $('#tuning-title').val(store.currentTuning.title)
  for (const [key, value] of Object.entries(store.currentTuning)) {
    if (key.includes('string')) {
      //console.log(key)
      firstNotes.push(value[0])
      notes.push(value)
    }
  }

  $('.fret').each(function () {
    frets.push(this.id)
    // console.log(stringNum)
  })
  //console.log(firstNotes)
  // const afterTunerNotes = []
  /*  notes.forEach(function (noteArray) {
    afterTunerNotes.push(noteArray[0])
    console.log('added' + noteArray)
  }) */
  // console.log(afterTunerNotes)
  const tunerNotes = notesToolBox.getTunerNote(firstNotes)
  // console.log(tunerNotes)
  $('.tuner').each(function (tuner) {
    // console.log(tunerNotes[this.id.slice(6)])
    $('#' + this.id).val(tunerNotes[this.id.slice(6)]).trigger('change')
    // console.log($('#' + this.id).val())
  })
  notes = [].concat.apply([], notes)
  //console.log(tunerNotes)
  changeStringNotes(notes, frets)
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
  loadCurrentTuning
}
