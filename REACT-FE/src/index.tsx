import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter,Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import Home from './pages/Home';
import Login from './pages/Login';
import Control from './pages/Control';
import Detail from './pages/Detail';
import Basket from './pages/Basket';
import Category from './pages/Category';
import Register from './pages/Register';
import Admin from './pages/Admin';
import Dashboard from './pages/Dashboard';
import CategoryManagement from './pages/CategoryManagement';
import ProductManagement from './pages/ProductManagement';
import OrderManagement from './pages/OrderManagement';
import CategoryUpdate from './pages/CategoryUpdate';


const router =
<BrowserRouter>
  <ToastContainer position='top-center' />
  <Routes>
    <Route path='/login' element={<Login/>}/>
    <Route path='/' element={<Home/>}/>
    <Route path='/detail/:pid' element={<Control item={<Detail/>} />} />
    <Route path='/category-update/:cid' element={<Control item={<CategoryUpdate/>} />} />
    <Route path='/category/:name' element={<Category/>} />
    <Route path='/basket' element={<Control item={<Basket/>} />} />
    <Route path='/dashboard' element={<Control item={<Dashboard/>} />} />
    <Route path='/category-management' element={<Control item={<CategoryManagement/>} />} />
    <Route path='/product-management' element={<Control item={<ProductManagement/>} />} />
    <Route path='/order-management' element={<Control item={<OrderManagement/>} />} />
    <Route path='/register' element={<Register/>} />
    <Route path='/admin' element={<Admin/>} />
  </Routes>
</BrowserRouter>


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(router);

