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

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
              <Route path="/signup" element={<Signup/>}/>
              <Route path="/login" element={<Login/>}/>
              <Route path="/" element={<Layout/>}>
                <Route path="" element={<h1>Home Component</h1>}/>
                <Route path="ngos" element={<h1>ngo</h1>}/>
                <Route path="userhome" element={<Userhome/>}/>

  
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
