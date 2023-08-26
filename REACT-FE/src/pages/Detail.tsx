import React, { useEffect, useState } from 'react'
import {  useNavigate, useParams } from 'react-router-dom'
import { addCard, singleProduct } from '../service'
import { Result } from '../models/Products'
import { IUsers } from '../models/IUsers'
import { toast } from 'react-toastify';
import { decrypt } from '../util'
import { title } from 'process'


function Detail() {

    // useEffect catch'e düştüğünde yönlendirme yapabilmek adına önceden useNavigate tanımlandı
    const navigate = useNavigate()

    // adres çubuğundaki /detail/'dan sonra yazılan id datasını yakalayabilmek için useParams oluşturuldu
    const params = useParams()

    const pid = params.pid
    const title = params.title
    const price = params.price

    const [item, setItem] = useState<Result>()
    const [bigImage, setBigImage] = useState('')

    useEffect(() => {
      if(pid){
        singleProduct(pid).then( res => {
          setItem(res.data)
          setBigImage(res.data.images[0])
          
        }).catch(err => {
          //alert(err.message)
          navigate('/')
        })
      }
    }, [])

    const [userr, setUserr] = useState<IUsers>()
    useEffect(() => {
      const stSession = sessionStorage.getItem('user')
      var users:IUsers
      if( stSession !== null ){
        try{
          const plainText = decrypt(stSession)
          users = JSON.parse(plainText) as IUsers
          if(users){
            setUserr(users)
          }else{
            navigate('/login')
          }
          
        } catch (error){
          sessionStorage.removeItem("user")
          navigate('/login')
        }
       
      }
    }, [])
    

    const addBasket = () => {
      // ! işareti ile kesin olarak bu datalarının gönderileceğini belirtildi
      addCard(userr!.email, pid!,item!.title,item!.price).then(res => {
        const obj = res.data
        if(obj){
          toast.success("Add Basket Success!")
        }
        console.log(obj)
      }).catch(err => {
        console.log(err.message)
      })
      
      // Add Basket'e tıklanıldığında bu ürün dataları aşağıdaki addLocal fonk.una parametre olarak gönderldi
      addLocal(pid!,title!,price!)
    }

    const addLocal = (pid: string,title:string,price:string) => {
        const stObj = localStorage.getItem('basket')

        // basket isimli Lokal Storage daha önceden varsa if'e gir yoksa içini oluşturmak için else'ye gir.
        if (stObj){
            // Daha sonradan türü değiştireleceği için var olarak tanımlandı
            var stArr:string[] = []
            stArr = JSON.parse(stObj) as string[]
            stArr.push(item!.title)
        
            const st = JSON.stringify(stArr)
            localStorage.setItem("basket",st)
        }else{
          const arr:string[] = []
          arr.push(item!.title)
          
          // arr dizisi JSON formatında bir string'e dönüştürülüp saveStr'ye atandı.
          // -JSON.parse() kullanılmamasının sebebi düz json formatının taşınmaya elverişli olmamasıdır.
          const saveStr = JSON.stringify(arr)
          localStorage.setItem("basket",saveStr)
          
        }
    }
    

  return (
    <>
      {/* item değişkeni var ise alttaki fragment'i çalıştır */}
      { item &&
       <>
        <div className='row'>
            <div className='col-sm-6'>
              <h2 style={{marginTop:150}} >{item.title}</h2>
              <p>{item.detail}</p>
              <p>{item.price}$</p>
              <button onClick={addBasket} className='btn btn-danger' > Add Basket</button>
            </div>
            <div className='col-sm-6'>
              <img src={bigImage} className="img-fluid img-thumbnail" style={{height:400}} />
              <div className='row mt-3'>
                  { item.images.map((item,index)=>
                    <div key={index} className='col-3' role='button' onClick={() => setBigImage(item)} > 
                      <img src={item} className='img-thumbnail' style={{height:100}} />
                    </div>
                  ) }
              </div>
            </div>
        </div>
       </>
      }
    </>
  )
}

export default Detail