import React from 'react'
import {NavLink} from 'react-router-dom'
import Particles from 'react-particles-js'


export const LandingPage = () => {
    return (

        <div >

            <div id="overlay">
                <h1 id="title">Convergence</h1>
                
                <NavLink to="/tutorial/1">
                <h2>
                    Play
                </h2>
                </NavLink>
            </div>

             <Particles
             params={{
                particles: {
                    line_linked: {
                        shadow: {
                            enable: true,
                            color: "#F7A859",
                            blur: 5
                        }
                    }
                }
            }}
          style={
            {
                width: '100%',
                background: 'linear-gradient(#DAEDE3, #9DACE0, #F9C2DF)'
            }
          }

             />
            <h1>Convergence</h1>

            <NavLink to="/tutorial/1">
            <h2>
                Play
            </h2>
            </NavLink>
            <NavLink to="/gameplay/summary"> <h2>Gameplay Summary</h2></NavLink>
        </div>
    )
}
