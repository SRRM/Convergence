const nlp = require('compromise')

function pluralize (noun) {
  try {
    nlp(noun).nouns().out('list')
  } catch (err) {
    return []
  }
}

function conjugate (verb) {

  try {

    const conjugation = nlp(verb).verbs().conjugate()[0]

    const { PastTense, PresentTense, Infinitive, Gerund, Participle } = conjugation

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

module.exports = { conjugate }

/*
{ PastTense: 'spoke',
  PresentTense: 'speaks',
  Infinitive: 'speak',
  Gerund: 'speaking',
  Actor: 'speaker',
  Participle: 'spoken',
  FutureTense: 'will speak' }
*/
console.log(conjugation)
