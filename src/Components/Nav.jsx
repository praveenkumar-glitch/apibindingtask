import React from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Nav = () => {
  return (
    <div>
      <Link to='/game'><Button>Game</Button></Link>
      <Link to='/validation'><Button>Validation</Button></Link>
      <Link to='/loan' ><Button>Loan</Button></Link>
      <Link to='/balance'><Button>Balance</Button></Link> 
      <Link to='/bind'><Button>Bind</Button></Link>
      <Link to='/get'><Button>Getdata</Button></Link>
      <Link to='/client'><Button>Client</Button></Link>
      <Link to='/Student'><Button>Student</Button></Link>
      <Link to='/Category'><Button>Category</Button></Link>
    </div>
  )
}

export default Nav
