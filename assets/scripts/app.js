'use strict'

const events = require('./events')
// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')

$(() => {
  $(window).on('load', events.onLoad)
  $('.tuner').change(events.onTunerChange)
})
