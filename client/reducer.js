import axios from 'axios'

//ACTION TYPES
const STORE_MACHINE_WORD = "STORE_MACHINE_WORD"
const STORE_HUMAN_WORD = "STORE_HUMAN_WORD"
const SETUP_GAME = "SETUP_GAME"
const ADD_ROUND = "ADD_ROUND"
const UPDATE_HIDDEN_GUESS = "UPDATE_HIDDEN_GUESS"
const INCREMENT_ROUND = "INCREMENT_ROUND"




//ACTION CREATORS
const updateHumanWordActionCreator = word => ({ type: SUBMIT_WORD, word })
const getFirstMachineWordActionCreator = word => ({ type: SUBMIT_WORD, word })
export const storeMachineWordActionCreator = word => ({type: STORE_MACHINE_WORD, word})
export const storeHumanWordActionCreator = word => ({type: STORE_HUMAN_WORD, word})
const setupGameActionCreator = game => ({type: SETUP_GAME, game})
const addRoundActionCreator = round => ({type: ADD_ROUND, round})
const updateHiddenGuessActionCreator = guess => ({type: UPDATE_HIDDEN_GUESS, guess})
export const incrementRoundActionCreator = () => ({type: INCREMENT_ROUND})

//THUNK CREATORS
export const getFirstMachineWordThunkCreator = () =>
  dispatch =>
    axios.get(`/api/play`)
      .then(res => res.data)
      .then(result => {
        dispatch(storeMachineWordActionCreator(result.computerWord))
      })
      .catch(err => console.log(err))

export const setupGameThunkCreator = (personality, userWord, computerWord) =>
      dispatch =>
        axios.post(`/api/play/start`, {
          personality,
          userWord,
          computerWord
        })
          .then(res => res.data)
          .then(result => {
            dispatch(setupGameActionCreator(result.game))
            dispatch(addRoundActionCreator(result.firstRound))
            dispatch(updateHiddenGuessActionCreator(result.machineFirstGuess))
          })
          .catch(err => console.log(err))

export const postRoundThunkCreator = (userWord, computerWord, gameId, personality) => dispatch => {
  
  axios.post(`/api/play/${gameId}`, {
    userWord,
    computerWord,
    gameId,
    personality
  })
  .then(res => res.data)
  .then(result => {
    dispatch(addRoundActionCreator(result.newRound))
    dispatch(updateHiddenGuessActionCreator(result.machineOneGuess))
  })
}

//INITIAL STATE
const initialState = {
  machineWord: '',
  humanWord: '',
  machineHiddenGuess: '',
  game: {},
  rounds: [],
  roundNumber: 1
}

//REDUCER
function reducer (state = initialState, action) {
    switch (action.type) {
      case STORE_MACHINE_WORD:
        return Object.assign({}, state, { machineWord: action.word} )
      case STORE_HUMAN_WORD:
        return Object.assign({}, state, {humanWord: action.word} )
      case SETUP_GAME:
        return Object.assign({}, state, {game: action.game} )
      case ADD_ROUND:
        return Object.assign({}, state, {rounds: [...state.rounds, action.round]} )
      case UPDATE_HIDDEN_GUESS:
        return Object.assign({}, state, {machineHiddenGuess: action.guess} )
      case INCREMENT_ROUND:
        return Object.assign({}, state, {roundNumber: state.roundNumber + 1} )
      default:
        return state;
    }
  }

  export default reducer
