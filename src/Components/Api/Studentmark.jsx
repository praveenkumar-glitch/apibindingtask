import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import DataTable from 'react-data-table-component'
import Swal from 'sweetalert2';

const Studentmark = () => {
  const [mark, setmark] = useState([]);

  function showmark() {
    axios.get('http://92.205.109.210:8051/api/getallmark')
      .then((res) => {
        setmark(res.data.data)
      })
  }

  useEffect(() => {
    showmark()
  }, [])

  let col = [
    {
      name: 'name',
      selector: row => row.name
    },
    {
      name: 'subject1',
      selector: row => row.subject1
    },
    {
      name: 'subject2',
      selector: row => row.subject2
    },
    {
      name: 'subject3',
      selector: row => row.subject3
    },
    {
      name: 'Total',
      selector: row => row.subject1 + row.subject2 + row.subject3
    },
    {
      name: 'Delete',
      selector: row => <Button type='submit' onClick={() => delmark(row.studentId)}>Delete</Button>
    }
  ]

  function delmark(studentId) {
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
        axios.post(`http://92.205.109.210:8051/api/removemark/${studentId}`)
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      }
      showmark()
    });
  }

  return (
    <div>
      <DataTable
        columns={col}
        data={mark}
      />
    </div>
  )
}

export default Studentmark
