import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import DataTable from 'react-data-table-component'
import Swal from 'sweetalert2'
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom'


const Student = () => {

    const [id, setid] = useState('')
    const [virat, setvirat] = useState()
    const [stu, setstu] = useState()
    const [addstu, setaddstu] = useState({
        studentId: '',
        name: '',
        rollno: '',
        year: '',
        department: '',
        gender: '',
        __v: 0
    })


    const [isEdit, setIsEdit] = useState(false)
    const [addmark, setaddmark] = useState({
        studentId: '',
        subject1: '',
        subject2: '',
        subject3: ''
    })

    const [showone, setShowone] = useState(false);
    const handleClose = () => setShowone(false);
    const handleShow = (row) => {
        setaddmark({
            studentId: row.studentId,
            name: row.name,
            subject1: '',
            subject2: '',
            subject3: ''
        })
        setShowone(true);
    };



    function one() {
        axios.get('http://92.205.109.210:8051/api/getall')
            .then((e) => {
                setstu(e.data.data)
            })
    }

    function HandleMarkChange(e) {
        setaddmark({ ...addmark, [e.target.name]: e.target.value })
    }

    function HandleMarksubmit(e) {
        e.preventDefault()
        console.log(addmark);

        axios.post('http://92.205.109.210:8051/api/addmark', addmark)
            .then((res) => {
                Swal.fire({
                    title: "Updated Successfully!",
                    icon: "success",
                    draggable: true
                });
                handleClose()
            })


        setaddmark({
            studentId: '',
            subject1: '',
            subject2: '',
            subject3: ''
        })
    }



    function HandleChange(e) {
        setaddstu({ ...addstu, [e.target.name]: e.target.value })
    }

    function Handlesubmit(e) {
        e.preventDefault()
        console.log(addstu);
        if (isEdit) {

            Swal.fire({
                title: "Do you want to save the changes?",
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: "Save",
                denyButtonText: `Don't save`
            }).then((result) => {
                if (result.isConfirmed) {
                    axios.post(`http://92.205.109.210:8051/api/update/${addstu.studentId}`, addstu)
                    Swal.fire("Saved!", "", "success");
                } else if (result.isDenied) {
                    Swal.fire("Changes are not saved", "", "info");
                }
            });
            setIsEdit(false)
        } else {
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
                    axios.post('http://208.109.34.247:8012/Employee/InsertEmployee', addstu)
                        .then((e) => {
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
            _id: 0,
            studentId: '',
            name: '',
            rollno: '',
            year: '',
            department: '',
            gender: '',
            __v: 0
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
            selector: row => row.name,
            sortable: true
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
            name: 'Delete',
            selector: row => <Button onClick={() => del(row.studentId)}>Delete</Button>
        },
        {
            name: 'Edit',
            selector: row => <Button onClick={() => edithandler(row)} variant='success'>Edit</Button>
        },
        {
            name: 'Add marks',
            selector: row => <Button variant="primary" onClick={() => handleShow(row)}>Add Mark</Button>
        },
        {
            name: 'View Marks',
            selector: row => <Button>View Marks</Button>
        }
    ]



    function edithandler(data) {
        console.log(data);
        setaddstu(data)
        setIsEdit(true)
    }

    function del(studentId) {
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
                axios.post(`http://92.205.109.210:8051/api/delete/${studentId}`)
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
            }
            one()
        });

    }

    function getStudmarkById() {
        console.log(id);

        axios.get(`http://92.205.109.210:8051/api/getbyidmark/${id}`)
            .then(res => {
                console.log(res)
                console.log(res.data.data);
                setvirat(res.data.data.data)

            })
        setid('')
    }

    return (
        <div>
            <form onSubmit={(e) => Handlesubmit(e)}>
                {isEdit && <input value={addstu.studentId} disabled />}
                <input placeholder='name' name='name' onChange={HandleChange} value={addstu.name} />
                <input placeholder='Rollno' name='rollno' onChange={HandleChange} value={addstu.rollno} />
                <input placeholder='Year' name='year' onChange={HandleChange} value={addstu.year} />
                <input placeholder='Department' name='department' onChange={HandleChange} value={addstu.department} />
                <input placeholder='Gender' name='gender' onChange={HandleChange} />
                {isEdit ? <Button type='submit'>update</Button> : <Button type='submit'>Save</Button>}
                <Link to='/Studentmark'><Button>View All marks</Button></Link>
            </form>
            <Modal show={showone} onHide={handleClose}>
                <form onSubmit={HandleMarksubmit}>
                    <Modal.Header closeButton>
                        <Modal.Title><span style={{ fontWeight: 'bold', color: 'green' }}>{addmark.name}</span>'s Marks</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <input placeholder='subject1' name='subject1' onChange={HandleMarkChange} value={addmark.subject1} />
                        <br /><br />
                        <input placeholder='subject2' name='subject2' onChange={HandleMarkChange} value={addmark.subject2} />
                        <br /><br />
                        <input placeholder='subject3' name='subject3' onChange={HandleMarkChange} value={addmark.subject3} />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>Close</Button>
                        <Button variant="primary" type='submit'>Save</Button>
                    </Modal.Footer>
                </form>
            </Modal>

            <DataTable
                columns={col}
                data={stu}
                highlightOnHover
                selectableRows
                pagination
            />

            <input onChange={(e) => setid(e.target.value)} />
            <button onClick={getStudmarkById}>find</button>

        </div>
    )
}

export default Student