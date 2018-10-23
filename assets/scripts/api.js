'use strict'

const config = require('./config')
const store = require('./store')

const sendSignUpCreds = function (data) {
  // console.log(data)
  return $.ajax({
    url: config.apiUrl + '/sign-up',
    method: 'POST',
    data
  })
}

const sendLoginCreds = function (data) {
  // console.log(data)
  return $.ajax({
    url: config.apiUrl + '/sign-in',
    method: 'POST',
    data
  })
}

const sendPassChange = function (data) {
  return $.ajax({
    url: config.apiUrl + '/change-password',
    headers: {
      Authorization: `Token token=${store.token}`
    },
    method: 'PATCH',
    data
  })
}

const sendLogOut = function () {
  // console.log(store)
  return $.ajax({
    url: config.apiUrl + '/sign-out',
    headers: {
      Authorization: `Token token=${store.token}`
    },
    method: 'DELETE'
  })
}

const sendGetUserTunings = function (data) {
  return $.ajax({
    url: config.apiUrl + '/tunings',
    headers: {
      Authorization: `Token token=${store.token}`
    },
    method: 'GET'
  })
}

const sendNewTuning = function (data) {
  return $.ajax({
    url: config.apiUrl + '/tunings',
    headers: {
      Authorization: `Token token=${store.token}`
    },
    method: 'POST',
    data
  })
}

const sendUpdateExistingTuning = function (data) {
  return $.ajax({
    url: config.apiUrl + `/tunings/${store.currentTuning.id}`,
    headers: {
      Authorization: `Token token=${store.token}`
    },
    method: 'PATCH',
    data
  })
}

const sendDeleteExistingTuning = function () {
  return $.ajax({
    url: config.apiUrl + `/tunings/${store.currentTuning.id}`,
    headers: {
      Authorization: `Token token=${store.token}`
    },
    method: 'DELETE'
  })
}

module.exports = {
  sendLogOut,
  sendPassChange,
  sendLoginCreds,
  sendSignUpCreds,
  sendNewTuning,
  sendGetUserTunings,
  sendUpdateExistingTuning,
  sendDeleteExistingTuning
}
