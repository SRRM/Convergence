# Convergence
<br>
A Game of Cooperative Word Alchemy
<br>
https://wordconvergence.tk


## Playing the Game
Prior to gameplay, our AI selects a word from the most common nouns in the English language. At the beginning of the game, the user will also get to choose a starting word. Once these words are revealed, the objective is to guess the same word as the AI. How might one accomplish such a challenging task? 

The key is to try to meet halfway by guessing words that have some semantic relationship to previously guessed words. For example, if one chooses 'lava' as a first word, and the AI selects 'water', then 'liquid', 'caldera', and 'steam' might be good guesses. Each game has maximum of 20 chances to converge on the same word.

The user also has the option of selecting a 'personality' for the AI. The 'personality' only influences gameplay when the words in play are sufficiently close to personality keywords.

## Installing

You'll need [Node.js](https://nodejs.org/en/download/), then
```
npm install
```
To run [locally](http://localhost:3000/)
```
npm run go-dev
```
 
## Built With

- [word2vec](https://www.npmjs.com/package/word2vec)
- [particles.js](https://github.com/VincentGarreau/particles.js/)


## Built By

- [Mike](https://github.com/mikekanter)
- [Raul](https://github.com/RaulVinueza)
- [Ray](https://github.com/rutvikhp)
- [Shannon](https://github.com/scwikla)


## Acknowledgements

Special thanks to [Collin](https://github.com/collin) for general awesomeness and architectural wizardry.


