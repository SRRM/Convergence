import React from 'react'


export const GameplayStart = () => {
    return (
        <div className="overlay" >
            <h2>Game Setup</h2>
           <span></span> 
           <form>
           <span>Personality:</span>
               <textarea>
                   </textarea>
                   <span>First word:</span>
               <input
                id="firstWord"
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