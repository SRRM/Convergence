import React from 'react'
import {NavLink} from 'react-router-dom'
import Particles from 'react-particles-js'

// Particles configuration object
// particles.particlesNumber number (default: 150) Amount of particles.
// particles.linkDist number (default: 100) Distance where link is full opacity
// particles.createLinkDist number (default: 150) Distance where particles start linking.
// particles.disableLinks bool (default: false) Disable particle links
// particles.disableMouse bool (default: false) Disable particle mouse interactions
// particles.linksWidth number (default: 1) Particle links width.
// particles.background string (default: transparent) Background color.
// particles.color string (default: #333333) Links color.
// Particle configuration object
// particle.color string (default: '#333333') Particles color.
// particle.minSize string (default: 2) Particle minimum size.
// particle.maxSize string (default: 4) Particle maximum size.
// particle.speed string (default: 20) Animation speed.

export const LandingPage = () => {
    return (
       
        <div >
             <Particles
             params={{
                particles: {
                    line_linked: {
                        shadow: {
                            enable: true,
                            color: "#3CA9D1",
                            blur: 5
                        }
                    }
                }
            }}
          style={
            {width: '100%',
            backgroundColor: '#000'}
          }
             
             />
            <h1>Convergence</h1>
            
            <NavLink to="/tutorial/1">
            <h2>
                Play
            </h2>
            </NavLink>
        </div>
    )
}
