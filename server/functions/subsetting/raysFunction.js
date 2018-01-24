app.use('/rays', (req, res, next) => {
    wordnet.lookup('machine', (err, definitions) => {
      if (err) console.log(err)
      let result = {}
      definitions.forEach(definition => {
        let similarWords = definition.meta.words.map(word => {
          return word.word.replace(/_/g, ' ')
        })
        let otherwords = definition.meta.pointers.filter(pointer => {
          return Object.keys(pointer.data).length
        }).map(pointer => {
          return pointer.data.meta.words.map(word => {
            return word.word.replace(/_/g, ' ')
          })
        }).join(',')
        .split(',')
        result.similarWords = result.similarWords ? result.similarWords.concat(similarWords) : similarWords
        result.otherSimilarWords = result.otherSimilarWords ? result.otherSimilarWords.concat(otherwords) : otherwords
      });
      res.send(result)
    })
  })