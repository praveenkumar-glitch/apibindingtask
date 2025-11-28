import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import DataTable, { SortOrder } from 'react-data-table-component'
import Swal from 'sweetalert2'

const Bind = () => {
    const [emp, setemp] = useState()
    const [addemp, setaddemp] = useState({
        employeeId: 0,
        employeeName: '',
        mobile: '',
        userName: '',
        password: null,
        confirmPassword: null,
        removedOn: '',
        removedRemarks: '',
        createdBy: '',
        deviceId: ''
    })
    const [edit, setedit] = useState(false)

    function getemp() {
        axios.get('http://208.109.34.247:8012/Employee/GetAllEmployeeDetails')
            .then((res) => {
                setemp(res.data.employeeList)
            })
    }

    function Handlechange(e) {
        setaddemp({ ...addemp, [e.target.name]: e.target.value })
    }

    function Handlesubmit(e) {
        e.preventDefault()
        console.log(addemp);
        
        if (edit) {
            axios.post('http://208.109.34.247:8012/Employee/InsertEmployee', addemp)
            Swal.fire({
                title: "Updated Successfully",
                icon: "success",
                draggable: true
            });
            setedit(false)
        }
        else {
            axios.post('http://208.109.34.247:8012/Employee/InsertEmployee', addemp)
                .then((e) => {
                    console.log(addemp);
                    
                    getemp()
            })

            Swal.fire({
                title: "Added successfully",
                icon: "success",
                draggable: true
            });
        }
        setaddemp({
            employeeId: 0,
            employeeName: '',
            mobile: '', 
            userName: '',
            password: null,
            confirmPassword: null,
            removedOn: '',
            removedRemarks: '',
            createdBy: '',
            deviceId: ''
        })
            
        getemp()

    }

    useEffect(() => {
        getemp()
    }, [emp])

    let col = [
        {
            name: 'employeeName',
            selector: row => row.employeeName,
            sortable: true
        },
        {
            name: 'userName',
            selector: row => row.userName
        },
        {
            name: 'mobile',
            selector: row => row.mobile
        },
        {
            name: 'createdBy',
            selector: row => row.createdBy
        },
        {
            name: 'Delete',
            selector: row => <Button variant='danger' onClick={() => del(row)}>Delete</Button>
        },
        {
            name: 'Update',
            selector: row => <Button variant='success' onClick={() => up(row)}>Update</Button>
        }
        
    ]

    function up(data) {
        setaddemp(data)
        setedit(true)
    }

    function del(emp) {
        let data = {
            employeeId: emp.employeeId,
            removedRemarks: emp.removedRemarks,
            createdBy: emp.createdBy
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
                axios.post(`http://208.109.34.247:8012/Employee/RemoveEmployee`, data)
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
            }
        });
        getemp()
    }
    return (
        <div>
            <form onSubmit={(e) => Handlesubmit(e)}>
                <input placeholder='employeeName' name='employeeName' onChange={Handlechange} value={addemp.employeeName} />
                <input placeholder='userName' name='userName' onChange={Handlechange} value={addemp.userName} />
                <input placeholder='mobile' name='mobile' onChange={Handlechange} value={addemp.mobile} />
                <input placeholder='createdBy' name='createdBy' onChange={Handlechange} value={addemp.createdBy} />
                {edit ? <Button type='submit'>Update</Button> : <Button type='submit'>Add</Button>}
            </form>
            <DataTable
                columns={col}
                data={emp}
                highlightOnHover
                pagination
                selectableRows
            />
        </div>
    )
}

export default Bind
