import axios from 'axios'
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import Swal from 'sweetalert2'

const Bind = () => {
    const [emp, setemp]=useState()

    function hii(){
        axios.get('http://208.109.34.247:8012/Employee/GetAllEmployeeDetails')
        .then((e) =>{
            setemp(e.data.employeeList)
        })
    }

        useEffect(()=>{
            hii()
        },[])


        let coll=[
            {
                name:'Id',
                selector:row => row.employeeId
            },
            {
                name:'Employees',
                selector:row =>row.employeeName
            },
            {
                name:'Username',
                selector:row =>row.userName
            },
            {
                name:'Mobile',
                selector:row =>row.mobile
            }, {
                name:'Delete',
                selector:row=><button onClick={()=>DeleteHandler(row)}>Delete</button>
            }
        ]

        function DeleteHandler(emp){
            let remarks=prompt('Enter the reson for delte this emp')

            let data={
                'employeeId':emp.employeeId,
                'removedRemarks':remarks,
                'createdBy':emp.createdBy
            }


            console.log(data); 
                        // axios.post(`http://208.109.34.247:8012/Employee/RemoveEmployee\${emp.employeeId}`)

            
            axios.post('http://208.109.34.247:8012/Employee/RemoveEmployee',data)
            // .then(res=>alert('userDeleted Successfully'))

            .then(res=>{
            
Swal.fire({
  title: "Emp delted successfully"+ emp.employeeId,
  icon: "success",
  draggable: true
});
            })

            hii()
        }

  return (
    <div>
        <DataTable
        columns={coll}
        data={emp}
        pagination
        selectableRows
        highlightOnHover
        />
      
    </div>
  )
}

export default Bind
