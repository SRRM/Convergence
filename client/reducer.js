import axios from 'axios'

//ACTION TYPES
const SET_PERSONALITY = "SET_PERSONALITY"
const GET_FIRST_MACHINE_WORD = "GET_FIRST_MACHINE_WORD"
const UPDATE_MACHINE_WORD = "SUBMIT_HUMAN_WORD"
const SUBMIT_HUMAN_WORD = "SUBMIT_HUMAN_WORD"
const UPDATE_HUMAN_WORD = "UPDATE_HUMAN_WORD"

//ACTION CREATORS
const updateHumanWordActionCreator = word => ({ type: SUBMIT_WORD, word })
const getFirstMachineWordActionCreator = word => ({ type: SUBMIT_WORD, word })

//THUNK CREATORS
export const getFirstMachineWordThunkCreator = word =>
  dispatch =>
    axios.post(`/api/users/admin/orders/`, {word})
      .then(res => res.data)
      .then(result => {
        dispatch(updateHumanWordActionCreator(result))
      })
      .catch(err => console.log(err))

export const submitHumanWordThunkCreator = word =>
  dispatch =>
    axios.post(`/api/users/admin/orders/`, {word})
      .then(res => res.data)
      .then(result => {
        dispatch(updateHumanWordActionCreator(result))
      })
      .catch(err => console.log(err))

function reducer (state = {}, action) {
    return state;
  }

  export default reducer
