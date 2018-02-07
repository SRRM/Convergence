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
const CORRECT_BAD_INPUT = "CORRECT_BAD_INPUT"
const CLEAR_ERROR = "CLEAR_ERROR"
const GET_GAME_ROUNDS = "GET_GAME_ROUNDS"
const GET_PAST_GAMES = "GET_PAST_GAMES"

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
const correctBadInputActionCreator = (error, newInput) => ({type: CORRECT_BAD_INPUT, error, newInput})
const clearErrorActionCreator = () => ({type: CLEAR_ERROR})
const getGameRoundsActionCreater = (result) => ({type: GET_GAME_ROUNDS, result})
const getPastGamesActionCreator = (result) => ({type: GET_PAST_GAMES, result})

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
  dispatch => {
    dispatch(clearErrorActionCreator())
    return axios.post(`/api/play/start`, {
      personality,
      userWord,
      computerWord
    })
      .then(res => res.data)
      .then(result => {
        if (!result.error){
          dispatch(setupGameActionCreator(result.game))
          dispatch(addRoundActionCreator(result.firstRound))
          dispatch(updateHiddenGuessActionCreator(result.machineFirstGuess))

        } else {
          dispatch(correctBadInputActionCreator(result.error, result.firstRound.userWord))
          dispatch(setupGameActionCreator(result.game))
          dispatch(addRoundActionCreator(result.firstRound))
          dispatch(updateHiddenGuessActionCreator(result.machineFirstGuess))
        }
      })
      .catch(err => {
        //expecting object with fields game, firstround, machineFirstGuess, user interpreted word
        //dispatch CORRECT_BAD_INPUT changes userword and makes error component vsible
        // dispatch(setupGameActionCreator(result.game))
        // dispatch(addRoundActionCreator(result.firstRound))
        // dispatch(updateHiddenGuessActionCreator(result.machineFirstGuess))
        console.log(err)
      })
    }

export const postRoundThunkCreator = (userWord, computerWord, gameId, personality, roundNumber) => dispatch => {
  dispatch(toggleAwaitingReplyActionCreator())
  dispatch(clearErrorActionCreator())
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
      if (!result.error){
        dispatch(addRoundActionCreator(result.newRound))
        dispatch(updateHiddenGuessActionCreator(result.machineOneGuess))
        dispatch(toggleAwaitingReplyActionCreator())

      } else {
        // console.log(result)
        dispatch(correctBadInputActionCreator(result.error, result.newRound.userWord))
        dispatch(addRoundActionCreator(result.newRound))
        dispatch(updateHiddenGuessActionCreator(result.machineOneGuess))
        dispatch(toggleAwaitingReplyActionCreator())
      }
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
    .catch(err => console.log(err)
)

export const getGameRoundsThunkCreator = (gameId) => dispatch =>
  axios.get(`/api/games/${gameId}`)
    .then(res => res.data)
    .then(result => dispatch(getGameRoundsActionCreater(result))
  )

export const getPastGamesThunkCreator = (page) => dispatch =>
  axios.get(`/api/games/history/${page}`)
    .then(res => res.data)
    .then(result =>
      dispatch(getPastGamesActionCreator(result))
  )

//INITIAL STATE
const initialState = {
  machineWord: '',
  humanWord: '',
  machineHiddenGuess: '',
  game: {},
  rounds: [],
  roundNumber: 1,
  awaitingReply: false,
  error: '',
  gameHistory: []
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
    case CORRECT_BAD_INPUT:
      return Object.assign({}, state, {humanWord: action.newInput, error: action.error})
    case CLEAR_ERROR:
      return Object.assign({}, state, {error: ''})
    case GET_GAME_ROUNDS:
      return Object.assign({}, state, {rounds: action.result.rounds, game: action.result})
    case GET_PAST_GAMES:
      return Object.assign({}, state, {gameHistory: action.result})
    default:
      return state;
  }
}

export default reducer
