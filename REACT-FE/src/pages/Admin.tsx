import React, { FormEvent, useState } from 'react'
import { login } from '../service'
import { NavLink, useNavigate } from 'react-router-dom'
import { decrypt, encrypt } from '../util'
import Navbar from '../components/Navbar'
import { IUsers } from '../models/IUsers'




function Login() {

    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const sendForm = (evt: FormEvent) => {
        evt.preventDefault()
        login(email,password).then( res => {
            const stData = JSON.stringify(res.data)
            const cipherText = encrypt(stData)
            sessionStorage.setItem('users', cipherText)
            navigate('/dashboard')
        }).catch(err => {
            console.log(err.message)
            alert("Username or Password Fail!")
        })
    }

    const stSession = sessionStorage.getItem('users')
    var users:IUsers
    if( stSession !== null ){
        const plainText = decrypt(stSession)
        users = JSON.parse(plainText) as IUsers
    }

  return (
    <>
        <Navbar users={users!}/>

        <div className='row'>

            <div className='col-sm-4'></div>
            <div className='col-sm-4 mt-3' style={{backgroundColor:'lightblue', padding:50}}>

                <h2>Admin Login</h2>
                <form onSubmit={sendForm}>
                    <div className='mb-3'>
                        <input required onChange={(evt) => setEmail(evt.target.value)} className='form-control' placeholder='E-mail'></input>
                    </div>
                    <div className='mb-3'>
                        <input required type='password' onChange={(evt) => setPassword(evt.target.value)} className='form-control' placeholder='Password'></input>
                    </div>
                    <button className='btn btn-info'>Send</button>
                </form>
                
            </div>
            <div className='col-sm-4'></div>

        </div>
    </>
  )
}

export default Login