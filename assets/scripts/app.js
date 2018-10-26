'use strict'

const events = require('./events')
const ui = require('./ui')

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')

$(() => {
  $(window).on('load', events.onLoad)
  $('.tuner-drop').on('click', 'button', events.onTunerChange)
  $('#sign-up-form').on('submit', events.onSignUpCreds)
  $('#sign-in-form').on('submit', events.onLoginCreds)
  $('#sign-out').on('click', events.onLogOut)
  $('#change-password').on('click', ui.onPasswordChangeShow)
  $('#change-password-form').on('submit', events.onPasswordChange)
  $('li #sign-in-button').on('click', ui.showLoginForm)
  $('#sign-up-button').on('click', ui.showSignUpForm)
  $('#save').on('click', events.onSaveTuning)
  $('#delete').on('click', events.onDeleteTuning)
  $('.selector').on('click', 'button', events.onGetUserTuning)
  $('#add-string').on('click', events.onGetLastString)
  $('#remove-string').on('click', events.onGetLastString)
})
