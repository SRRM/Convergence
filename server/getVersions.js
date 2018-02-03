console.time('requiring modules')
const nlp = require('compromise')
const pl = require('pluralize')
console.timeEnd('requiring modules')

function pluralize(noun) {
  try {
    const plural = pl.plural(noun)
    const singular = pl.singular(noun)

    return [singular, plural]

  } catch (err) {
    return []
  }
}

function conjugate(verb) {

  try {

    const conj = nlp(verb).verbs().conjugate()[0]

    /*
    { PastTense: 'spoke',
      PresentTense: 'speaks',
      Infinitive: 'speak',
      Gerund: 'speaking',
      Actor: 'speaker',
      Participle: 'spoken',
      FutureTense: 'will speak' }
    */

    const { PastTense, PresentTense, Infinitive, Gerund, Participle } = conj

    return [
      PastTense,
      PresentTense,
      Infinitive,
      Gerund,
      Participle
    ]
  } catch (err) {
    return []
  }
}

function getVersions(word) {

  return [...new Set([...pluralize(word), ...conjugate(word)].filter(x => x !== undefined))]

}

module.exports = getVersions

console.time('getting versions')

console.log(getVersions('specific'))

console.timeEnd('getting versions')
