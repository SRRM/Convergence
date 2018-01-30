import React from 'react'
import { connect } from 'react-redux'
import {NavLink} from 'react-router-dom'
import {submitHumanWordThunkCreator} from '../reducer'
import store from '../store'

export const Gameplay = () => {
    return (     
        <div >
            <h2>Round #:</h2>
            <span>1</span>
           <h2>Computer chose:</h2>
           <span></span>
           <h2>You chose:</h2>
           <span></span> 
           <form>
               <input
                id="daInput"
               />
               <button
                    type="button"
                    onClick={()=>{
                        submitHumanWordThunkCreator('word')
                    }}
                >
                    SUBMIT 
                </button>
            </form>    
        </div>
    )
}

// const mapState = (state) => ({})
// export default connect(mapState, mapDispatch)(Routes)