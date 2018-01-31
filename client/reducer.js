import axios from 'axios'

//ACTION TYPES
const GET_FIRST_MACHINE_WORD = "GET_FIRST_MACHINE_WORD"
const SETUP_GAME = "SETUP_GAME"
const PUSH_MACHINE_WORD = "PUSH_MACHINE_WORD"



//ACTION CREATORS
const updateHumanWordActionCreator = word => ({ type: SUBMIT_WORD, word })
const getFirstMachineWordActionCreator = word => ({ type: SUBMIT_WORD, word })
const pushMachineWordActionCreator = word => ({type: PUSH_MACHINE_WORD, word})

//THUNK CREATORS
export const getFirstMachineWordThunkCreator = () =>
  dispatch =>
    axios.get(`/api/play`)
      .then(res => res.data)
      .then(result => {
        dispatch(pushMachineWordActionCreator(result.computerWord))
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
            dispatch()
          })
          .catch(err => console.log(err))

export const submitHumanWordThunkCreator = word =>
  dispatch =>
    axios.post(`/api/users/admin/orders/`, {word})
      .then(res => res.data)
      .then(result => {
        dispatch(updateHumanWordActionCreator(result.computerWord))
      })
      .catch(err => console.log(err))

//INITIAL STATE
const initialState = {
  machineWords: []
}

//REDUCER
function reducer (state = initialState, action) {
    switch (action.type) {
      case PUSH_MACHINE_WORD:
        return Object.assign({}, state, { machineWords: [...state.machineWords, action.word]} )
      default:
        return state;
    }
  }

  export default reducer
