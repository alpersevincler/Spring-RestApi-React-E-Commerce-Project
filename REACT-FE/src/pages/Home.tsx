import React, { useEffect, useState } from 'react'
import { allCategories, allProduct } from '../service'
import { Category, Result } from '../models/Products'
import { NavLink, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { IUsers } from '../models/IUsers'
import { decrypt } from '../util'
import { ICategory } from '../models/ICategory'



function Home() {

  const [arr, setArr] = useState<Result[]>([])
  const [catArr, setCatArr] = useState<ICategory[]>([])
  

    useEffect(() => {
      allProduct().then( res =>{
          setArr(res.data.result)
      }).catch(err => {

      })
    }, [])

    useEffect(() => {
      allCategories().then( res =>{
          setCatArr(res.data)
      }).catch(err => {

      })
    }, [])


    const navigate = useNavigate()
    const stSession = sessionStorage.getItem('users')
    var users:IUsers
    if( stSession !== null ){
        const plainText = decrypt(stSession)
        users = JSON.parse(plainText) as IUsers
    }
    

  return (
    <>
        <Navbar users={users!}/>
        <hr></hr>
        <center><h3> Latest Products </h3></center> 
        <hr></hr>
        <div className='row'>
        
          { arr.map((item,index)=>
            <div className='col-sm-4' key={index}>
              <div style={{marginTop:10}} className="card">
                <img src={item.thumbnail} style={{height: 220,}} className="card-img-top"/>
                <div className="card-body">
                  <h5 className="card-title">{item.title}</h5>     
                  <p className="card-text">{item.price}$</p>
                  <NavLink to={'/detail/'+item.pid} className="btn btn-primary" >Detail</NavLink>
                </div>
              </div>
            </div>
            
          ) }
          
        </div>
    </>
  )
}

export default Home