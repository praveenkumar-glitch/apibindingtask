import { Button } from 'react-bootstrap'
import React, { useState } from 'react'

const Game = () => {
    let [playerone,setplayerone]=useState('')
    let [playertwo,setplayertwo]=useState('')
    let [res,setres]=useState('')
    let [onescore,setonescore]=useState(0)
    let [twoscore,settwoscore]=useState(0)
    let [round,setround]=useState(1)
    let [winner,setwinner]=useState('')

    let [isGameComp,setIsGameComplt]=useState(false)
    let a=''
    let b=3
    function one(e){
        setplayerone(e.target.value)
    }

    function two(e){
        setplayertwo(e.target.value)
    }

    function win(){

        console.log(round);
           if(!playerone && !playertwo){
            setres('Both player not select')
            return;
        }
        else if(!playerone && playertwo){
            setres('Playerone not select')
            return;
        }
        else if(playerone && !playertwo){
            setres('Playertwo not select')
            return;
        }
        else
        {
        if(playerone === playertwo){
            a='Tie'
        }
        else if(( playerone==='stone' && playertwo==='scissor') ||
         ( playerone==='paper' && playertwo==='stone') ||
         (playerone==='scissor' && playertwo==='paper'))
        {
            a='Player one Win'
            setonescore(onescore+=1)
        }
        else{
            a='player two Win'
            settwoscore(twoscore+=1)
        }
        setres(a)
        }

        if(round<=b){
            setround(round+1)
        }

        
        if(round===b){
            if(onescore > twoscore){
                setwinner('Playerone Win the series')
            }
            else if(onescore < twoscore){
                setwinner('Playertwo Win the series')
            }
            else{
                setwinner('Series Tie')
            }
            setIsGameComplt(true)
        }
        setplayerone('')
        setplayertwo('')
    }

    function reset(){
        setIsGameComplt(false)
        setplayerone('')
        setplayertwo('')
        setres('')
        setonescore(0)
        settwoscore(0)
        setround(1)
        setwinner('')
        
    }
  return (
    <div>
       
{
    isGameComp ?  <div>

        <h2  style={{color:'green'}}>{winner}</h2>
        <Button onClick={reset}>Reset</Button>

        </div> : <div >
         <h2>Player One</h2>
            <select onChange={one} value={playerone}>
                <option value=''>Select</option>
                <option value='stone'>Stone</option>
                <option value='paper'>Paper</option>
                <option value='scissor'>Scissor</option>
            </select>

        <h2>Player Two</h2>
            <select onChange={two} value={playertwo}>
                <option value=''>Select</option>
                <option value='stone'>Stone</option>  
                <option value='paper'>Paper</option>
                <option value='scissor'>Scissor</option>
              </select>
              <br /><br />
              <Button onClick={win}>Click</Button>
              <h4>{res}</h4> 
              <p>Player 1 :{onescore} point</p>
              <p>Player 2 :{twoscore} point</p>
              <h2>Round: {round}/{b}</h2>
       </div>
}
     
           

    </div>
  )
}

export default Game
