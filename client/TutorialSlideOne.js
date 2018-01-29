import React from 'react'
import {NavLink} from 'react-router-dom'
import Particles from 'react-particles-js'


export const LandingPage = () => {
    return (
       
        <div >

            <div id="overlay">
                <h1 id="title">Convergence</h1>
                
                <NavLink to="/tutorial/1">
                    <button className="center-action-button">
                        Play
                    </button>
                </NavLink>
            </div>
             
        </div>
    )
}
