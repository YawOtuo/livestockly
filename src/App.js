import logo from './logo.svg';
import './App.css';
import { Dashboard } from './views/dashboard';
import { Navbar } from './components/navbar';
import { Search } from './components/dash-search';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ListView } from './views/listView';
import { DetailView } from './views/detailView';
import { Login } from './views/login';

import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';


function App() {

  const message = useSelector((state) => state.messages.message)
  const notify = (message) => toast.success(message);

  useEffect(()=> {
    if(message){
        console.log('message updated')
        notify(message)
    }
    console.log('errrrrrr')
}, [message])

  return (
    <BrowserRouter>

      <Routes>
      <Route path="/" element={<Login />} />

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/:type" element={<ListView />} />
        <Route path="/dashboard/:type/:id" element={<DetailView />} />
        <Route path="/login" element={<Login />} />



      </Routes>
      <ToastContainer/>

    </BrowserRouter>
  );
}

export default App;
