import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { IUsers } from '../models/IUsers'
import { ICategory } from '../models/ICategory'
import { allCategories } from '../service'

// IUsers türünde users nesnesini parametre olarak al bunu item'a ata
function Navbar( item: { users:IUsers } ) {

  const [catArr, setCatArr] = useState<ICategory[]>([])

  // Logout yapınca giriş sayfasına yönlendirme yapabilmek adına önceden useNavigate() fonk.unu tanımlandı
  const navigate = useNavigate()

  useEffect(() => {
    if (item.users){

    }else{
      navigate('/')
    }
  }, [])


  useEffect(() => {
    allCategories().then( res =>{
        setCatArr(res.data)
    }).catch(err => {

    })
  }, [])
  

  const logout = () => {
    // Logout olunduğunda üretilen users key'ine sahip sessionStrorage'ı sil
    sessionStorage.removeItem('users')

    // Üstte tanımlanan navigate'i çağırıp bu fonk. sayesinde sessionStorage silindikten sonra başlangıç sayfasına('/') yönlendirme yapıldı
    navigate('/')
  }

  return (
    <>

      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          
          <div className="collapse navbar-collapse" id="navbarSupportedContent">

            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li> <NavLink to={'/login'} className="btn btn-outline-success">User Login</NavLink></li>
            </ul>

            <ul className="navbar-nav me-auto p-2">
              <li><NavLink to={'/register'} className="btn btn-outline-success">User Register</NavLink></li>
            </ul>
            
            <ul className="d-flex navbar-nav">
              <li><NavLink to={'/admin'} className="btn btn-outline-success">Admin Login</NavLink></li>
            </ul>
            
          </div>
        </div>
      </nav>


      <nav className="navbar navbar-expand-lg bg-primary">
        <div className="container-fluid">
          <a className="navbar-brand" href="/" style={{fontSize:20, backgroundColor:'yellow', padding:10, borderRadius:20}}><b>Happy e-Shopping</b></a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link text-light" to={'/'} style={{fontSize:17}}> <b>Home</b> </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to={'/basket'} className="nav-link text-light" style={{fontSize:17}}><b>Profile</b></NavLink>
              </li>
              <li className="nav-item dropdown" style={{marginLeft:8}}>
                <a className="nav-link dropdown-toggle text-light" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <b>Categories</b> 
                </a>
                <ul className="dropdown-menu">
                {catArr.map((item,index) =>
                      <ul key={index} className="list-group" style={{paddingRight:100}}>
                        <NavLink className="list-group-item" style={{paddingRight:82, marginTop:10}} to={'/category/'+item.name} aria-current="true"> <b>{item.name}</b> </NavLink>
                      </ul>  
                    )}
                  
                  {/* <li><a className="dropdown-item" href="#">Action</a></li> */}
                </ul>
              </li>
              <li className="nav-item" style={{marginLeft:45}}>
                {/* item'ın altında users var ise item'ın altındaki, users'in altındaki email bilgisini yaz */}
                <a className="nav-link" aria-disabled="true"> <b> Account: {item.users && item.users.email}</b> </a>
              </li>
            </ul>

            <ul className="d-flex navbar-nav">
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle text-light" role="button" data-bs-toggle="dropdown" aria-expanded="false" style={{fontSize:16}}>
                  <b>Options</b> 
                </a>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" onClick={logout} role='button'>LogOut</a></li>
                </ul>
              </li>
            </ul>

          </div>
        </div>
      </nav>

    </>
  )
}

export default Navbar