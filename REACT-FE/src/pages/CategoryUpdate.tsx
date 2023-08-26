import React, { useEffect, useState } from 'react'
import { ICategory } from '../models/ICategory'
import { allCategories, categoryDelete, categorySave, categoryUpdate } from '../service'
import { toast } from 'react-toastify'
import axios from 'axios'
import { NavLink, useParams } from 'react-router-dom'

function CategoryUpdate() {

  

  const [catArr, setCatArr] = useState<ICategory[]>([])

  const [cid, setCid] = useState('')
  const [name, setName] = useState('')

  
  

  const sendForm = (evt:React.FormEvent) =>{
    evt.preventDefault()
    categoryUpdate(cid,name).then( res =>{
      const stData = JSON.stringify(res.data)
      window.location.reload()
      toast.success("Category Update Success!")
      
    }).catch(err => {
      console.log(err.message)
      toast.error("Category Update Failed!")
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
      <h3 className='mt-3'>Category Update Form</h3>

    <form onSubmit={sendForm} style={{marginTop:30}} className='col-sm-5'>
          <div className='mb-3'>
             <input onChange={(evt) => setCid(evt.target.value)} className='form-control' placeholder='Cid'></input>
             <input style={{marginTop:15}} onChange={(evt) => setName(evt.target.value)} className='form-control' placeholder='Category Name' ></input> 
          </div>
          <button className='btn btn-info btn-sm' >Update</button>
      </form>
      </center>

    <table className="table mt-3">
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

export default CategoryUpdate