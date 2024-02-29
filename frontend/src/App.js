import React from "react"
import ReactDOM from 'react-dom/client'
import {createBrowserRouter, RouterProvider, Route, Outlet} from "react-router-dom"

import Home from './pages/Home'
import About from './pages/About'
import Links from './pages/Links'
import Feedback from './pages/Feedback'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import Header from './components/Header'

import './style.scss'

// allows us to display navbar + footer for all our pages
// without having to type it out multiple times
const Layout = () => {
  return (
    <>
      <Header/>
      <Navbar/>
      <Outlet/>
      <Footer/>
    </>
  )
}

// creating routes of our pages
const router = createBrowserRouter
([
  {
    path: "/",
    element: <Layout/>,
    children:
    [
      {
        path: "/",
        element: <Home/>
      },
      {
        path: "/about",
        element: <About/>
      },
      {
        path: "/feedback",
        element: <Feedback/>
      },
      {
        path: "/links",
        element: <Links/>
      },
  ]
  },
  {
    path: "/about",
    element: <About/>
  },
  {
    path: "/links",
    element: <Links/>
  },
  {
    path: "/feedback",
    element: <Feedback/>
  },
])

function App()
{
  return (
    <div className="app">
      <div className="container">
          <RouterProvider router={router} />
      </div>
        
    </div>
  )
}


export default App