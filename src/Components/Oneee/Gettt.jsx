import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap'

const Gettt = () => {
  const [user, setuser]=useState()

  function getus(){
    axios.get('https://jsonplaceholder.typicode.com/posts')
    .then((res)=>{
      setuser(res.data)
    })
  }

  useEffect(()=>{
    getus()
  },[])

  // let col=[
  //   {
  //     name:'UserId',
  //     selector:row=>row.userId
  //   },
  //   {
  //     name:'Id',
  //     selector:row =>row.id
  //   },
  //   {
  //     name:'Title',
  //     selector:row.title
  //   },
  //   {
  //     name:'Body',
  //     selector:row=>row.body
  //   }
  // ]
  return (
    <div>
      {
        user && user.map((u)=>
          <Card>
            <p>{u.id}</p>
            <h4>{u.title}</h4>
            <p>{u.body}</p>
          </Card>
        )
      }
    </div>
  )
}

export default Gettt
