import logo from './logo.svg';
import './App.css';
import { Dashboard } from './views/dashboard';
import { Navbar } from './components/navbar';
import { Search } from './components/dash-search';
import { BrowserRouter, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { ListView } from './views/listView';
import { DetailView } from './views/detailView';
import { Login } from './views/login/login';

import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Workers from './views/workers';
import { AnimatePresence } from 'framer-motion';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import { getUser, setAuthenticated, setUserDetails } from './redux/reducers/users';
import { getCurrentUser } from './api/apis';
import { addMessage } from './redux/reducers/messages';
import { getRecordSp } from './api/recordsApi';
import { CloudinaryContext, Transformation, Image } from 'cloudinary-react';
import PrivateRoute from './components/PrivateRoute';

const cloudName = 'daurieb51'
const queryClient = new QueryClient();

function App() {

  const message = useSelector((state) => state.messages.message)
  const notify = (message) => toast.success(message);
  const dispatch = useDispatch()
  const userData = useSelector((state) => state.user)
  const isAuthenticated = useSelector((state) => state.users.isAuthenticated)

  useEffect(() => {
    if (message) {
      notify(message)
    }

  }, [message])






  useEffect(() => {
    // console.log('here')
    const accessToken = JSON.parse(localStorage.getItem('authToken'))
    // const _isAuthenticated = localStorage.getItem('isAuthenticated')
    if (accessToken) {
      if (accessToken) {
        const headers = {
          Authorization: `Bearer ${accessToken['access_token']}`,
        };

        getCurrentUser(headers)
          .then((res) => {
            dispatch(addMessage('yesss'));
            dispatch(setUserDetails(res.data))
            // dispatch(setAuthenticated(isAuthenticated))
            // window.location="/dashboard"
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  }, [localStorage.getItem('authToken')])


  return (
    <QueryClientProvider client={queryClient}>
      <CloudinaryContext cloudName={cloudName}>

        <BrowserRouter>

          <Routes>
            <Route
              path="/dashboard"
              element={
                <PrivateRoute isAuthenticated={isAuthenticated}>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route index path="/" element={
              <Login />

            } />

            <Route path="/login" element={
               <Login/>

            } />

            <Route path="/dashboard/:type" element={<PrivateRoute isAuthenticated={isAuthenticated}><AnimatePresence mode='wait'><ListView /></AnimatePresence> </PrivateRoute>} />

            <Route path="/dashboard/:type/:id" element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <AnimatePresence
                  mode='wait'
                ><DetailView /></AnimatePresence>
              </PrivateRoute>
            } />


            <Route path="/workers" element={
              <PrivateRoute isAuthenticated={isAuthenticated}> <Workers /></PrivateRoute>
            } />





          </Routes>

          <ToastContainer />
        </BrowserRouter>
      </CloudinaryContext>
    </QueryClientProvider>
  );
}

export default App;
