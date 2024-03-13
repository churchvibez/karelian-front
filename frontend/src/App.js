import React from "react"
import {createBrowserRouter, RouterProvider, Outlet} from "react-router-dom"

import Home from './pages/Home'
import About from './pages/About'
import Links from './pages/Links'
import Feedback from './pages/Feedback'

import ContentPage from "./ContentPage"
import ContentPageMultiple from "./ContentPageMultiple"

import Footer from './components/Footer'
import Navbar from './components/Navbar'
import Header from './components/Header'

import './style.scss'

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

const router = createBrowserRouter
([
  {
    path: "/",
    element: <Layout/>,
    children: [
      {
        path: "/",
        element: <Home/>
      },
      {
        path: "/site",
        element: <Home/>
      },
      {
        path: "/site/:pathName",
        element: <ContentPage />
      },
      {
        path: "/site/:param1/:param2",
        element: <ContentPageMultiple />
      }
    ]
  },
  {
    path: "/site/about",
    element: <About/>
  },
  {
    path: "/site/links",
    element: <Links/>
  },
  {
    path: "/site/feedback",
    element: <Feedback/>
  },
])

function App() {
  return (
    <div className="app">
      <div className="container">
        <RouterProvider router={router} />
      </div>
    </div>
  )
}


export default App