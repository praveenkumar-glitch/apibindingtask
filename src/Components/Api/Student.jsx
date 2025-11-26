import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import DataTable from 'react-data-table-component'
import Swal from 'sweetalert2'

const Student = () => {
    const [stu, setstu] = useState()
    const [addstu,setaddstu]=useState({
            studentId:'',
            name:'',
            rollno:'',
            year:'',
            department:'',
            gender:'',
            __v:0
        })
    const [isEdit,setIsEdit]=useState(false)

function one() {
        axios.get('http://92.205.109.210:8051/api/getall')
            .then((e) => {
                setstu(e.data.data)
            })
    }

    function HandleChange(e){
        setaddstu({...addstu,[e.target.name]:e.target.value})
    }

    function Handlesubmit(e){
        e.preventDefault()
        console.log(addstu);
        if(isEdit){
            axios.post(`http://92.205.109.210:8051/api/update/${addstu.studentId}`,addstu)
            Swal.fire({
            title: "Updated Successfully!",
            icon: "success",
             draggable: true
});
            setIsEdit(false)
        }else{
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
    axios.post('http://92.205.109.210:8051/api/create',addstu)
        .then((e)=>{
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
        one()
        setaddstu({
            _id:0,
            studentId:'',
            name:'',
            rollno:'',
            year:'',
            department:'',
            gender:'',
            __v:0
        })
    }

    useEffect(() => {
        one()
    }, [stu])

    let col = [
        {
            name: 'studentId',
            selector: row => row.studentId
        },
        {
            name: 'name',
            selector: row => row.name
        },
        {
            name: 'rollno',
            selector: row => row.rollno
        },
        {
            name: 'year',
            selector: row => row.year
        },
        {
            name: 'department',
            selector: row => row.department
        },
        {
            name: 'gender',
            selector: row => row.gender
        },
        {
            name: '__v',
            selector: row => row.__v
        },
        {
            name: 'Delete',
            cell: row => <Button onClick={() => del(row.studentId)}>Delete</Button>
        },
        {
            name: 'Edit',
            cell: row => <Button onClick={() => edithandler(row)} variant='success'>Edit</Button>
        }

    ]

    function edithandler(data){
        console.log(data);
        setaddstu(data)
        setIsEdit(true)
    }

    function del(studentId) {
        axios.post(`http://92.205.109.210:8051/api/delete/${studentId}`)
            .then((e) => {
                Swal.fire({
                    title: "Delete success",
                    icon: "success",
                    draggable: true
                });
                one();
            })
    }
    return (
        <div>
            <form onSubmit={(e)=>Handlesubmit(e)}>
               {isEdit&& <input value={addstu.studentId} disabled />}
                <input placeholder='name' name='name' onChange={HandleChange} value={addstu.name}/>
                <input placeholder='Rollno' name='rollno' onChange={HandleChange} value={addstu.rollno}/>
                <input placeholder='Year' name='year' onChange={HandleChange} value={addstu.year}/>
                <input placeholder='Department' name='department' onChange={HandleChange} value={addstu.department}/>
                <input placeholder='Gender' name='gender' onChange={HandleChange}/>
                <input placeholder='V' name='-__v' onChange={HandleChange}/>
                {isEdit ? <button>update</button> : <button>Save</button>}

            </form>
            <DataTable
                columns={col}
                data={stu}
                highlightOnHover
                selectableRows
            />
        </div>
    )
}

export default Student
