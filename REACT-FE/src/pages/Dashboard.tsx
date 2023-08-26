import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Dashboard() {
  return (
    <>
      <hr />
      <center>
          <h3 className='mt-3' >Admin Dashboard</h3>
          <hr />
          <NavLink to={'/category-management'} type="button" className="btn btn-info" >Category Management</NavLink>
          <NavLink to={'/product-management'} type="button" className="btn btn-info" style={{marginLeft:15}}>Product Management</NavLink>
          <NavLink to={'/order-management'} type="button" className="btn btn-info ml-3" style={{marginLeft:15}}>Order Management</NavLink>
      </center>

    </>
  )
}
