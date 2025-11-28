import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import DataTable from 'react-data-table-component'
import Swal from 'sweetalert2'

const Category = () => {
    const[user, setuser]=useState([])
    const[adduser, setadduser]=useState(
        {
            categoryId:'',
            category:'',
            description:'',
            deletedOn:'',
            removedRemarks:'',
            createdBy:''
        }
    )
    const[edit, setedit]=useState(false)
    function one(){
        axios.get('http://208.109.34.247:8012/Category/GetAllCategories')
        .then((res)=>{
            setuser(res.data.categoryList)
        })
    }

    useEffect(()=>{
        one()
    },[])

    function Handlechange(e){
        setadduser({...adduser,[e.target.name]:e.target.value})
    }

    function Handlesubmit(e){
        e.preventDefault()
        axios.post('http://208.109.34.247:8012/Category/InsertCategory',adduser)
        .then((res)=>{
            one()
        })
        
        Swal.fire({
        title: "Add successfully!",
        icon: "success",
         draggable: true
        });
        
        setadduser({
            categoryId:'',
            category:'',
            description:'',
            deletedOn:'',
            removedRemarks:'',
            createdBy:''
        });

        
    }
        console.log(adduser);

    let col=[
        {
            name:'category',
            selector:row =>row.category
        },
        {
            name:'description',
            selector:row =>row.description
        },
        {
            name:'deletedOn',
            selector:row =>row.deletedOn
        },
        {
            name:'removedRemarks',
            selector:row =>row.removedRemarks
        },
        {
            name:'createdBy',
            selector:row =>row.createdBy
        },
        {
            name:'Delete',
            selector:row =><Button onClick={()=>del(row)}>Delete</Button>
        },
        {
            name:'Update',
            selector:row =><Button variant='success' onClick={()=>up(row)}>Update</Button>
        }
    ]

    function up(data){
        setadduser(data)
        setedit(true)
    }

    function del(ca){
        let data={
            'categoryId':ca.categoryId,
            'removedRemarks':ca.removedRemarks,
            'createdBy':ca.createdBy
        }

        Swal.fire({
  title: "Are you sure?",
  text: "You won't be able to revert this!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, delete it!"
}).then((result) => {
  if (result.isConfirmed) {
    axios.post(`http://208.109.34.247:8012/Category/RemoveCategory`,data)
    .then((res)=>{
        one()
    })
    Swal.fire({
      title: "Deleted!",
      text: "Your file has been deleted.",
      icon: "success"
    });
  }
});

}     
  return (
    <div>
        <form onSubmit={(e) =>Handlesubmit(e)}>
            <input placeholder='categoryname' name='category'  onChange={Handlechange} value={adduser.category}/>
            <input placeholder='description' name='description' onChange={Handlechange} value={adduser.description}/>
            <input placeholder='createdBy' name='createdBy' onChange={Handlechange} value={adduser.createdBy}/>
           {edit ? <Button type='submit'>Update</Button> : <Button type='submit'>Add</Button>}
        </form>
      <DataTable 
      columns={col}
      data={user}       
      pagination
      highlightOnHover
      selectableRows
      />
    </div>
  )
}

export default Category
