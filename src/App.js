import logo from './logo.svg';
import './App.css';
import { Dashboard } from './views/dashboard';
import { Navbar } from './components/navbar';
import { Search } from './components/dash-search';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ListView } from './views/listView';
import { DetailView } from './views/detailView';
import { Login } from './views/login/login';

import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Workers from './views/workers';
  import { AnimatePresence } from 'framer-motion';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

function App() {

  const message = useSelector((state) => state.messages.message)
  const notify = (message) => toast.success(message);

  useEffect(() => {
    if (message) {
      console.log('message updated')
      notify(message)
    }
    console.log('errrrrrr')
  }, [message])

  return (
  <QueryClientProvider client={queryClient}>
      <BrowserRouter>
  
        <Routes>
          <Route path="/" element={<Login />} />
  
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/:type" element={<AnimatePresence mode='wait'><ListView /></AnimatePresence>} />
          <Route path="/dashboard/:type/:id" element={<AnimatePresence
          mode='wait'
          ><DetailView /></AnimatePresence>} />
          <Route path="/login" element={<Login />} />
          <Route path="/workers" element={<Workers />} />
  
  
  
  
  
        </Routes>
  
  
      </BrowserRouter>
  </QueryClientProvider>
  );
}

export default App;
