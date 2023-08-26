import React, { useEffect, useState } from 'react'
import { ICategory } from '../models/ICategory'
import { allCategories, categoryDelete, categorySave } from '../service'
import { toast } from 'react-toastify'
import axios from 'axios'
import { NavLink, useParams } from 'react-router-dom'
import { Result } from '../models/Products'


function CategoryManagement() {

  

  const [catArr, setCatArr] = useState<ICategory[]>([])

  const [name, setName] = useState('')

  

  const sendForm = (evt:React.FormEvent) =>{
    evt.preventDefault()
    categorySave(name).then( res =>{
      const stData = JSON.stringify(res.data)
      toast.success("Category Save Success!")
      window.location.reload()
      
    }).catch(err => {
      console.log(err.message)
      toast.error("Unauthorized User")
    })
  }


  useEffect(() => {
    allCategories().then( res =>{
        setCatArr(res.data)
    }).catch(err => {

    })
  }, [])

  const catDelete = (cid:string) =>{
    categoryDelete(cid).then(res=>{
      console.log(res.data)
      toast.success("Delete Category Success!")
      window.location.reload()
    }).catch(err =>{
      toast.error("Unauthorized User")
    })
  }
    


  return (
    <>
      <div className='mt-3'>
        <center>
          <NavLink to={'/category-management'} type="button" className="btn btn-info" >Category Management</NavLink>
          <NavLink to={'/product-management'} type="button" className="btn btn-info" style={{marginLeft:15}}>Product Management</NavLink>
          <NavLink to={'/order-management'} type="button" className="btn btn-info ml-3" style={{marginLeft:15}}>Order Management</NavLink>
        </center>
      </div>
      <center>
      <h3 className='mt-3'>Category Add Form</h3>

      <form onSubmit={sendForm} className='mt-3 col-sm-4'>
            <div className='mb-3'>
                <input onChange={(evt) => setName(evt.target.value)} className='form-control' placeholder='Category Name' />
            </div>
            <button className='btn btn-info btn-sm' >Add</button>
      </form>
      </center>

      <table style={{marginTop:20}} className="table">
    <thead>
      <tr>
        <th scope="col">cid</th>
        <th scope="col">Category Name</th>
      </tr>
    </thead>
    <tbody>
      {catArr.map((item,index) =>
        <tr  key={index}>
          <th scope="row">{item.cid}</th>
          <td>{item.name}</td>
          <td><button onClick={ () => catDelete(item.cid)} type="button" className="btn btn-danger btn-sm">Delete</button></td>
          <td><NavLink to={'/category-update/'+item.cid} className="btn btn-warning btn-sm" >Update</NavLink></td>
        </tr>
      )}

    </tbody>
  </table>
    </>
  )
}

export default CategoryManagement