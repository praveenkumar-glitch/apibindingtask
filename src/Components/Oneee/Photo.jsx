import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Photo = () => {
    const [pho, setpho]=useState()

    function getph(){
        axios.get('https://jsonplaceholder.typicode.com/photos')
        .then((res)=>{
            setpho(res.data)
        })
    }
    useEffect(()=>{
        getph()
    },[])
  return (
    <div>
      {
        pho && pho.map((p)=>
            <div>
                <p>{p.albumId}</p>
                <p>{p.title}</p>
                <img src={p.url} alt={p.title}/>
                <a href={p.url} target='_blank'>Open</a>
            </div>
        )
      }
    </div>
  )
}

export default Photo
