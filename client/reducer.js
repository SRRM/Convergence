import axios from 'axios'

//ACTION TYPES
const STORE_MACHINE_WORD = "STORE_MACHINE_WORD"
const STORE_HUMAN_WORD = "STORE_HUMAN_WORD"
const SETUP_GAME = "SETUP_GAME"
const ADD_ROUND = "ADD_ROUND"
const UPDATE_HIDDEN_GUESS = "UPDATE_HIDDEN_GUESS"
const INCREMENT_ROUND = "INCREMENT_ROUND"
const UPDATE_GAME_STATUS = "UPDATE_GAME_STATUS"
const RESET_GAME = "RESET_GAME"
const TOGGLE_AWAITING_REPLY = "TOGGLE_AWAITING_REPLY"


//ACTION CREATORS
const updateHumanWordActionCreator = word => ({ type: SUBMIT_WORD, word })
const getFirstMachineWordActionCreator = word => ({ type: SUBMIT_WORD, word })
export const storeMachineWordActionCreator = word => ({ type: STORE_MACHINE_WORD, word })
export const storeHumanWordActionCreator = word => ({ type: STORE_HUMAN_WORD, word })
const setupGameActionCreator = game => ({ type: SETUP_GAME, game })
const addRoundActionCreator = round => ({ type: ADD_ROUND, round })
const updateHiddenGuessActionCreator = guess => ({ type: UPDATE_HIDDEN_GUESS, guess })
export const incrementRoundActionCreator = () => ({ type: INCREMENT_ROUND })
const updateGameStatusActionCreator = game => ({ type: UPDATE_GAME_STATUS, game })
const resetGameActionCreator = word => ({ type: RESET_GAME, word })
export const toggleAwaitingReplyActionCreator = () => ({type: TOGGLE_AWAITING_REPLY})

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

export const postRoundThunkCreator = (userWord, computerWord, gameId, personality, roundNumber) => dispatch => {
  dispatch(toggleAwaitingReplyActionCreator())
  // might need to send round number?
  axios.post(`/api/play/${gameId}`, {
    userWord,
    computerWord,
    gameId,
    personality,
    roundNumber
  })
    .then(res => res.data)
    .then(result => {
      dispatch(addRoundActionCreator(result.newRound))
      dispatch(updateHiddenGuessActionCreator(result.machineOneGuess))

      dispatch(toggleAwaitingReplyActionCreator())
    })
    .catch(() => {
      dispatch(toggleAwaitingReplyActionCreator())
    })
}

export const winGameThunkCreator = (gameId, userWord, roundNumber) => dispatch => {
  // store round, change state of game
  axios.post(`/api/play/${gameId}/win`, {
    userWord,
    gameId,
    roundNumber
  })
    .then(res => res.data)
    .then(result => {
      dispatch(addRoundActionCreator(result.newRound))
      dispatch(updateGameStatusActionCreator(result.game))
      console.log(result)
      // history.push
    })
}

export const loseGameThunkCreator = (gameId, userWord, computerWord, roundNumber) => dispatch => {
  // store round, change state of game
  axios.post(`/api/play/${gameId}/lose`, {
    userWord,
    computerWord,
    gameId,
    roundNumber
  })
    .then(res => res.data)
    .then(result => {
      dispatch(addRoundActionCreator(result.newRound))
      dispatch(updateGameStatusActionCreator(result.game))
      console.log(result)
      // history.push
    })
}

export const resetGameThunkCreator = () => dispatch =>
  axios.get(`/api/play`)
    .then(res => res.data)
    .then(result => {
      dispatch(resetGameActionCreator(result.computerWord))
    })
    .catch(err => console.log(err))


//INITIAL STATE
const initialState = {
  machineWord: '',
  humanWord: '',
  machineHiddenGuess: '',
  game: {},
  rounds: [],
  roundNumber: 1,
  awaitingReply: false
}

//REDUCER
function reducer(state = initialState, action) {
  switch (action.type) {
    case STORE_MACHINE_WORD:
      return Object.assign({}, state, { machineWord: action.word })
    case STORE_HUMAN_WORD:
      return Object.assign({}, state, { humanWord: action.word })
    case SETUP_GAME:
      return Object.assign({}, state, { game: action.game })
    case ADD_ROUND:
      return Object.assign({}, state, { rounds: [...state.rounds, action.round] })
    case UPDATE_HIDDEN_GUESS:
      return Object.assign({}, state, { machineHiddenGuess: action.guess })
    case INCREMENT_ROUND:
      return Object.assign({}, state, { roundNumber: state.roundNumber + 1 })
    case UPDATE_GAME_STATUS:
      return Object.assign({}, state, { game: action.game })
    case RESET_GAME:
      return Object.assign({}, initialState, { machineWord: action.word })
    case TOGGLE_AWAITING_REPLY:
      return Object.assign({}, state, {awaitingReply: !state.awaitingReply})
    default:
      return state;
  }
}

export default reducer
