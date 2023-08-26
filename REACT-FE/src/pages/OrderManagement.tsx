import React, { useEffect, useState } from 'react'
import { ICard, Product } from '../models/ICard'
import { allCard, allProduct } from '../service'
import { Result } from '../models/Products'
import { NavLink } from 'react-router-dom'

function OrderManagement() {

  const [arr, setArr] = useState<ICard[]>()
  const [bigImage, setBigImage] = useState('')
 

  useEffect(() => {
    allCard().then(res =>{
      setArr(res.data)
      
      
    })
  }, [])
  
  
  

  return (
    <>
      <div className='mt-3'>
        <center>
          <NavLink to={'/category-management'} type="button" className="btn btn-info" >Category Management</NavLink>
          <NavLink to={'/product-management'} type="button" className="btn btn-info" style={{marginLeft:15}}>Product Management</NavLink>
          <NavLink to={'/order-management'} type="button" className="btn btn-info ml-3" style={{marginLeft:15}}>Order Management</NavLink>
        </center>
      </div>
    <h3 className='mt-3' >Last Orders</h3>
      <table style={{marginTop:20}} className="table">
  <thead>
    <tr>
      <th scope="col">User Email</th>
      <th scope="col">Card ID</th>
      
    </tr>
  </thead>
  <tbody>
    {arr?.map((item,index) =>
        <tr key={index} >
              <td >{item.userEmail}</td>
              <td>{item.cardId}</td>
            </tr>
    )}
       
  </tbody>
</table>
    </>
  )
}

export default OrderManagement