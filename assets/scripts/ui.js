'use strict'

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

module.exports = {
  changeStringNotes,
  changeOnLoad
}
