import axios from 'axios'
import { Button } from 'react-bootstrap'
import React, { useEffect, useState } from 'react'
import DataTable, { SortOrder } from 'react-data-table-component'

const Client = () => {
    const [cli, setcli]=useState()
    const [addcli, setaddcli]=useState()

    function one(){
        axios.get('http://208.109.34.247:8012/Client/GetAllClientDetails')
        .then((e)=>{
            setcli(e.data.clientList)
        })
    }

    useEffect(()=>{
        one()
    },[])

    function Handlechange(e){
        setaddcli({...addcli,[e.target.name]:e.target.value})
    }

    function Handlesubmit(e){
        e.preventDefault()
        axios.post("http://208.109.34.247:8012/Client/InsertClient",addcli)
        .then(e =>{
            console.log(e.data);
            one()
        })

        setaddcli({
            clientId:0,
            clientName:'',
            phone:'',  
            address:'',
            gst:'',
            website:'',
            email:''
        })
         alert('data saved')
    }
   

    let ser=[
        {
            name:'Id',
            selector:row =>row.clientId,
            
        },
        {
            name:'ClientName',
            selector:row =>row.clientName
        },
        {
            name:'Phone',
            selector:row =>row.phone
        },
        {
            name:'Address',
            selector:row =>row.address
        },
        {
            name:'GST',
            selector:row =>row.gst
        },
        {
            name:'Website',
            selector:row =>row.website
        },
        {
            name:'Email',
            selector:row =>row.email
        },
        {
            name: 'Contact Person',
            selector: row => row.contactPerson,
        },
         {
            name: 'Phone Number',
            selector: row => row.phoneNumber,
        },
        {
            name: 'RemovedOn',
            selector: row => row.removedOn,
        }, {
            name: 'removedRemarks',
            selector: row => row.removedRemarks,
        }, {
            name: 'Created By',
            selector: row => row.createdBy,
        },
        {
            name:'Delete',
            selector:row=><Button onClick={()=>deleteClient(row.clientId)}>delete</Button>
        }
    ]

    function deleteClient(id){

        console.log(id);
        
        let data={
            cllientId:id,
            removedRemarks:'',
            createdBy:1
        }

        axios.post('http://208.109.34.247:8012/Client/RemoveClient',data)
        .then(res=>alert('userDeleted successfully'))

        one()


    }
  return (
    <div>

        <form onSubmit={Handlesubmit}>
            <input placeholder='name' name='clientName' onChange={Handlechange}/>
            <input placeholder='number' name='phone' onChange={Handlechange}/>
            <input placeholder='address' name='address' onChange={Handlechange}/>
            <input placeholder='gst' name='gst' onChange={Handlechange}/>
            <input placeholder='website' name='website' onChange={Handlechange}/>
            <input placeholder='email' name='email' onChange={Handlechange}/>
            <input placeholder='contactPerson' name='contactPerson' onChange={Handlechange}/>
            <input placeholder='phoneNumber' name='phoneNumber' onChange={Handlechange}/>
            <input placeholder='removedOn' name='removedOn' onChange={Handlechange}/>
            <input placeholder='removedRemarks' name='removedRemarks' onChange={Handlechange}/>
            <input placeholder='createdBy' name='createdBy' onChange={Handlechange}/>
            <Button>Submit</Button>
        </form>

      <DataTable 
      columns={ser}  
      data={cli}   
      highlightOnHover
      selectableRows
      />
    </div>
  )
}

export default Client
