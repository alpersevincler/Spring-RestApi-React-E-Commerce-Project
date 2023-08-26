import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { IUsers } from '../models/IUsers'
import { decrypt } from '../util'

function Control( props: {item: JSX.Element} ) {

    const navigate = useNavigate()

    // sessionStorage'a users isminde bir değer gelecek, bu değer stSession'a atandı
    const stSession = sessionStorage.getItem('users')

    var users:IUsers

    if( stSession !== null ){
      try{
        // stSession util.tsx'deki decrypt fonk.una parametre olarak gönderildi
        const plainText = decrypt(stSession)
        users = JSON.parse(plainText) as IUsers
      } catch (error){
        sessionStorage.removeItem("users")
        navigate('/login')
      }
      
    }
    
  return (
    <>
      {/* stSession hem tür hem de değer bakımından boş mu diye kontrol et. Boş(null) ise ?'den sonraki, 
        değilse yani dolu ise  :'den  sonraki yapıyı çalıştır. */}
      { stSession === null  
      ?
      <Navigate to='/login' replace />
      :
      <>
          <Navbar users={users!}/>

          {/* Session dolu ise parametre olarak gelen item sayfasını göster */}
          {props.item}
      </>
      }
    </>
  )
}

export default Control