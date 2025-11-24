import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Card } from 'react-bootstrap'
import DataTable from 'react-data-table-component'

const Getdata = () => {
    const [name, setname]=useState()

    function gett(){
        axios.get('https://jsonplaceholder.typicode.com/users')
        .then((ev)=>{
            setname(ev.data)
        })
    }

    useEffect(()=>{
        gett()
    },[])


    let co=[
        {
            name:'ID',
            selector:row =>row.id
        },
        {
            name:'Name',
            selector:row =>row.name
        },
        {
            name:'Username',
            selector:row =>row.username
        },
        {
            name:'Email',
            selector:row =>row.email
        },
        {
            name:'Delete',
            selector:row =><Button>Delete</Button>
        }
    ]
  return (
    <div>
        {/* {
            name && name.map((n)=>
                <Card>
                    <p>{n.id}</p>
                    <p>{n.name}</p>
                    <p>{n.username}</p>
                    <p>{n.email}</p>
                </Card>
            )
        } */}
      <DataTable
      columns={co}
      data={name}
      pagination
      highlightOnHover
      selectableRows
      />
    </div>
  )
}

export default Getdata
