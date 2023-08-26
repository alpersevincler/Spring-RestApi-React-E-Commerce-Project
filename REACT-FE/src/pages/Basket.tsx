import React, { useEffect, useState } from 'react'

function Basket() {

    const [proArr, setProArr] = useState<string[]>([])
    useEffect(() => {
      // Local Storage'daki basket isimli yapıyı stArr' a ata
      const stArr = localStorage.getItem("basket")

      // stArr oluşmuşsa if'e gir
      if(stArr) {
        // stArr'ı string dizi türünde JSON'a çevirip arr'a ata
        const arr:string[] = JSON.parse(stArr) as string[]
        
        // arr'ı yukarıda oluşturululan useState'e gönder
        setProArr(arr)
      }
    }, [])
    
    const fncDelete =(index: number) => {
        // proArr useState'i, doğası gereği readonly özelliğine sahip olduğundan üzerinde değişim yapabilmek adına evrimleştirildi
        const newArr = Object.assign([],proArr)

        // newArr dizisinde indexinci elemandan itibaren 1 tane eleman sil
        newArr.splice(index, 1)

        // Yeni oluşan diziyi de useState'deki setProArr'a gönderildi
        setProArr(newArr)

        // Local Storage'daki basket isimli yapıya newArr dizisi, Json formatına çevirilip gönderildi
        localStorage.setItem("basket", JSON.stringify(newArr))
    }

  return (
    <>
        <hr></hr>
        <h3>Products in Basket</h3>
        <hr></hr>

        {/*
          <span> içindeki Delete'ye tıklandığında(onClick) üstteki fncDelete fonk.unu tetikleyecek ve aldığı
          index değerini parametre olarak gönderecek.
        */}
        {proArr.map( (item, index) =>
            <div key={index} style={{marginTop:20}}>
              <h4> {item} 
                <span style={{marginLeft:50}} onClick={ () => fncDelete(index)} role='button' className='btn btn-danger btn-sm' > <b><i>Delete</i></b>  </span> 
              </h4>
            </div>
        )}
    </>
  )
}

export default Basket