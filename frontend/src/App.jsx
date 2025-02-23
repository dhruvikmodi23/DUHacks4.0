import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/Header'
import { Route } from 'react-router-dom'
import { RouterProvider,createBrowserRouter,createRoutesFromElements } from 'react-router'
import Signup from './components/Signup'
import Layout from './Layout'
import Login from './components/Login'
import Userhome from './components/Userhome'
import Ngos from './components/Ngos'
import CreateDonation from './components/Donationreq'
import CreateEvent from './components/Events'
import AllEvents from './components/Getallevents'
import NgoDonations from './components/Mypost'

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
              <Route path="/signup" element={<Signup/>}/>
              <Route path="/login" element={<Login/>}/>
              <Route path="/" element={<Layout/>}>
                <Route path="" element={<Userhome/>}/>
                <Route path="ngos" element={<Ngos/>}/>
                <Route path="userhome" element={<Userhome/>}/>
                <Route path="ngohome" element={<Userhome/>}/>
                <Route path="donationreq" element={<CreateDonation/>}/>
                <Route path="postevent" element={<CreateEvent/>}/>
                <Route path="getevent" element={<AllEvents/>}/>
                <Route path="getmypost" element={<NgoDonations/>}/>

  
              </Route>
      </Route>
    ))
  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
