import { Formik } from 'formik'
import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import { number } from 'yup'

const Balance = () => {
    const [amount,setamount]=useState(500)
    const [deposit, setdeposit]=useState()
    const [withdraw,setwithdraw]=useState()
    const [balance, setbalance]=useState(amount)

    function dep(){
        let a=parseInt(amount)+parseInt(deposit)
        setbalance(a)
        setamount(a)
        setdeposit('')
    }

    function wit(){
         let am=parseInt(amount)
         let wi=parseInt(withdraw)
        if(am < wi){
            setbalance("Insufficient amount")
        }   
        else{
            let b=parseInt(am)-wi
            setbalance(b)
            setamount(b)
        }
        setwithdraw('')
    }

  return (
    <div>
    <br />
    <input placeholder='Deposit amount' onChange={(e)=>setdeposit(e.target.value)} value={deposit}/>
    <Button onClick={dep}>Deposit</Button>
    <br /><br />
    <input placeholder='Withdraw amount' onChange={(e)=>setwithdraw(e.target.value)} value={withdraw}/>
    <Button onClick={wit}>With</Button>
    <br />
    <p>Balance Amount :{balance}</p>
      
    </div>
  )
}

export default Balance

