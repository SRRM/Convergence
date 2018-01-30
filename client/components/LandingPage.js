import React from 'react'
import {NavLink} from 'react-router-dom'
import Particles from 'react-particles-js'


export const LandingPage = () => {
    return (
      <div >
        <div id="overlay">
          <h1 id="title">Convergence</h1>
          <NavLink to="/tutorial/1"> <h2> Play </h2></NavLink>
          <NavLink to="/gameplay/summary"> <h2>Gameplay Summary</h2></NavLink>
          <NavLink to="/tutorial/1">
            <button className="center-action-button">
                Play
            </button>
          </NavLink>
          <NavLink to="/wordgraph"> <h2> Word Graph </h2></NavLink>
        </div>
       <Particles
         params={{
          particles: {
            line_linked: {
              shadow: {
                enable: true,
                color: '#F990A2',
                blur: 5
              }
            },
            shape: {
              type: "polygon",
              polygon: {
                nb_sides: 5
              },
            },
            size: {
              value: 10,
              random: true,
              anim: {
                enable: false,
                speed: 80,
                size_min: 0.1,
                sync: false
              }
            }
          }
        }}
        style={{
          width: '100%',
          background: 'linear-gradient(#C9D2F2, #F9D9EA, #F7D091)'
        }}
     />
    </div>
  )
}
