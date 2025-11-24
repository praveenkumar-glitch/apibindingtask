import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Student = () => {
    const[stu, setstu]=useState()

    function one(){
        axios.get('http://92.205.109.210:8051/api/getall')
        .then((e)=>{
            setstu(e.data)
        })
    }

    useEffect(()=>{
        one()
    },[])

    let col=[
        {
            name:'Id',
            selector:row=>row._id
        },
        {
            name:'StudentId',
            selector:row =>row.studentId
        },
        {
            name:'Name',
            selector:row =>row.name
        },
        {
            name:'Rollno',
            selector:row =>row.rollno
        },
         {
            name:'Year',
            selector:row =>row.year
        },
        {
            name:'Department',
            selector:row =>row.department
        },
         {
            name:'Gender',
            selector:row =>row.gender
        },
         {
            name:'V',
            selector:row =>row.__v
        }
    ]
  return (
    <div>
      
    </div>
  )
}

export default Student
