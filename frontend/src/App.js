import React from "react"
import {createBrowserRouter, RouterProvider, Outlet} from "react-router-dom"
import Home from './pages/Home'
import Feedback from './pages/Feedback'
import SearchResults from "./pages/SearchResults"
import ContentPage from "./pages/ContentPage"
import ContentPageMultiple from "./pages/ContentPageMultiple"
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
      },
      {
        path: "/site/bd/search",
        element: <SearchResults/>
      },
      {
        path: "/site/feedback",
        element: <Feedback/>
      },
    ]
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