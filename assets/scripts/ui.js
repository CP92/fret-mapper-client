'use strict'

const store = require('./store.js')

const changeStringNotes = function (notes, frets) {
  frets.forEach(function (fret, index) {
    $(`#${fret}`).text(notes[index])
    //console.log(notes[index] + ` added to #${fret}`)
  })
}

const changeOnLoad = function (noteGroups, frets) {
  frets.forEach(function (fret) {

  })
}

const signUpError = function () {
  //console.log(error)
  $('#sign-up-message').html("<h4>The email you have entered already exists, or your passwords don't match. Please try again</h4>")
  setTimeout(function () { $('#sign-up-message').fadeOut('slow') }, 500)
  $('#sign-up-form').trigger('reset')

}
// Generic error when something unforseen breaks
const error = function (response) {
  //console.log(response)
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
//  console.log(response)
  const user = response.user
  store.token = user.token
  $('#sign-out').removeClass('hidden')
  $('#change-password').removeClass('hidden')
  $('#sign-in-form').addClass('hidden')
  $('#sign-up-form').addClass('hidden')
  $('#sign-in-button').addClass('hidden')
  $('#sign-up-button').addClass('hidden')
  $('#sign-in-form').trigger('reset')
}

module.exports = {
  changeStringNotes,
  changeOnLoad,
  loginSuccess,
  signUpSuccess,
  error,
  signUpError
}
