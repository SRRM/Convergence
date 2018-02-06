import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'
import history from '../history'
import store from '../store'
import {setupGameThunkCreator, storeHumanWordActionCreator} from '../reducer'


class GameplayStart extends Component {
    constructor(){
        super()
        this.state = {
            inputValue: ''
        }
        this.handleClick = this.handleClick.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleClick (evt){
        evt.preventDefault()
            const computerWord = store.getState().machineWord
            const personality = evt.target.personality.value
            const userWord = this.state.inputValue
            store.dispatch(storeHumanWordActionCreator(userWord))
            store.dispatch(setupGameThunkCreator(personality, userWord, computerWord))
            history.push(`/gameplay`)
    }

    handleChange(evt){
        this.setState({inputValue: evt.target.value})
    }

    render(){
        return (
            <div className="overlay" >
                <div id="game-setup"> 
                <h2>Game Setup</h2>
                    <form
                        id="game-setup-form"
                        className="ui form"
                        onSubmit={this.handleClick}
                    >
                        <input
                            placeholder="What is your AI into?"
                            id="personality-textarea"
                            name="personality"
                            
                            >
                            </input>
                        <div id="first-word-form-subsection" className="ui grid">
                            <div className="eight wide column">
                                <input
                                    id="firstWord"
                                    name="word"
                                    placeholder="Enter your starting word"
                                    value={this.state.inputValue}
                                    onChange={this.handleChange}
                                />
                            </div>
                            <div className="eight wide column">
                                <button
                                    type="submit"
                                    className="fluid ui button"
                                    disabled = {!this.state.inputValue.length}
                                >
                                    BEGIN 
                                </button>
                            </div>
                        </div>  
                    </form>
                </div>   
            </div>
        )
    }   
}

export default GameplayStart
