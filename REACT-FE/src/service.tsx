import axios from "axios";
import {Category, Products, Result } from "./models/Products";
import { ICategory } from "./models/ICategory";
import { ICard } from "./models/ICard";



var basicAuth = 'Basic ' + btoa('alper@mail.com' + ':' + '12345');
const config = axios.create({
    baseURL:'http://localhost:8090/',
    timeout: 15000, 
    headers: { 'Authorization': + basicAuth },
    auth: {
        username: 'alper@mail.com',
        password: '12345'
}
})



export const login = (email: string, password: string) => {
    const sendObj = {
        email: email,
        password: password,
    }
    return config.post('users/login', sendObj)
}
export const register = (name:string,surName:string,age:string,email:string,password:string) => {
    const sendObj = {
        name: name,
        surName: surName,
        age: age,
        email:email,
        password:password 
    }
    return config.post('users/register',sendObj)
}
export const categorySave = (name:string) => {
    const sendObj = {
        name: name
    }
    return config.post('category/save',sendObj)
}
export const categoryUpdate = (cid:string,name:string) =>{
    const sendObj = {
        cid:cid,
        name:name
        }
    return config.post('category/update',sendObj)
}
export const productUpdate = (pid:string,title:string,detail:string,price:string,thumbnail:string,image:string,cid:string) =>{
    const sendObj = {
        pid:pid,
        title:title,
        detail:detail,
        thumbnail:thumbnail,
        price: price,
        images:[
          image,
        ],
        categories:[
            {cid:cid}
        ]
    }
    return config.post('product/update',sendObj)
}
export const productSave = (title:string,detail:string,thumbnail:string,price:string,image:string,cid:string) =>{
    const sendObj = {
        title:title,
        detail:detail,
        price: price,
        thumbnail:thumbnail,
        images:[
          image,
        ],
        categories:[
            {cid:cid}
        ]
    }
    return config.post('product/save',sendObj)
}

export const categoryDelete = (cid:string)=>{
    return config.get("category/delete/"+cid)
}
export const productDelete = (pid:number) =>{
    return config.get("product/delete/"+pid)
}


export const allProduct = () => {
    return config.get<Products>('product/list')
}
export const allCard = () => {
    return config.get<ICard[]>('card/list')
}


export const singleProduct = (pid: string) => {
    return config.get<Result>('product/list/'+pid)
}

export const addCard = (usersEmail: string, pid: string,title:string,price:string) => {
    const sendObj = {
            usersEmail: usersEmail,
            products: [
                {
                    pid:pid,
                    title:title,
                    price:price
                }
            ]
        }
      
      return config.post('card/add',sendObj)
}

export const allCategories = () => {
    return config.get<ICategory[]>('category/list')
}

export const categoryProduct = (name:string) =>{
    return config.get<Result[]>('product/category/'+name)
}