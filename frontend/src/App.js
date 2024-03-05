import React from "react"
import ReactDOM from 'react-dom/client'
import {createBrowserRouter, RouterProvider, Route, Outlet} from "react-router-dom"

import Home from './pages/Home'
import About from './pages/About'
import Links from './pages/Links'
import Feedback from './pages/Feedback'

import DatabaseMain from './pages/db/Database'
import SearchDatabase from './pages/db/SearchDatabase'

import Battles from './pages/Battles'

import PartsMain from './pages/parts/Parts'
import PartsArmy from './pages/parts/Army'
import PartsCorpus from './pages/parts/Corpus'
import PartsDivisions from './pages/parts/Divisions'

import CommandersBiography from "./pages/commanders/Biography"
import CommandersArmy from "./pages/commanders/Army"
import CommandersCorpus from "./pages/commanders/Corpus"
import CommandersDivisions from "./pages/commanders/Divisions"
import CommandersFront from "./pages/commanders/Front"

import Heroes from "./pages/Heroes"

import OccupationMain from "./pages/occupation/Main"
import OccupationRemembering from "./pages/occupation/Remembering"

import Partisans from "./pages/Partisans"
import Evacuation from "./pages/Evacuation"
import Bibliography from "./pages/Bibliography"
import Literature from "./pages/Literature"
import Abbreviations from "./pages/Abbreviations"

import PhotosMain from './pages/photos/Main'
import PhotosPtz from './pages/photos/Ptz'
import PhotosFinn from './pages/photos/Finn'
import PhotosNew from './pages/photos/New'
import PhotosOccupation from './pages/photos/Occupation'
import PhotosPrison from './pages/photos/Prison'
import PhotosFinnAndGer from './pages/photos/FinnAndGer'
import PhotosArchive from './pages/photos/Archive'
import PhotosTech from './pages/photos/Tech'
import PhotosNational from './pages/photos/National'

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
      {
        path: "/database",
        element: <DatabaseMain/>
      },
      {
        path: "/database/search",
        element: <SearchDatabase/>
      },
      {
        path: "/battles",
        element: <Battles/>
      },
      {
        path: "/parts",
        element: <PartsMain/>
      },
      {
        path: "/parts/army",
        element: <PartsArmy/>
      },
      {
        path: "/parts/corpus",
        element: <PartsCorpus/>
      },
      {
        path: "/parts/divisions",
        element: <PartsDivisions/>
      },
      {
        path: "/commanders",
        element: <CommandersBiography/>
      },
      {
        path: "/commanders/front",
        element: <CommandersFront/>
      },
      {
        path: "/commanders/army",
        element: <CommandersArmy/>
      },
      {
        path: "/commanders/corpus",
        element: <CommandersCorpus/>
      },
      {
        path: "/commanders/divisions",
        element: <CommandersDivisions/>
      },
      {
        path: "/heroes",
        element: <Heroes/>
      },
      {
        path: "/occupation",
        element: <OccupationMain/>
      },
      {
        path: "/occupation/remembering",
        element: <OccupationRemembering/>
      },
      {
        path: "/partisans",
        element: <Partisans/>
      },
      {
        path: "/evacuation",
        element: <Evacuation/>
      },
      {
        path: "/bibliography",
        element: <Bibliography/>
      },
      {
        path: "/literature",
        element: <Literature/>
      },
      {
        path: "/abbreviations",
        element: <Abbreviations/>
      },
      {
        path: "/photos",
        element: <PhotosMain/>
      },
      {
        path: "/photos/ptz",
        element: <PhotosPtz/>
      },
      {
        path: "/photos/finn",
        element: <PhotosFinn/>
      },
      {
        path: "/photos/new",
        element: <PhotosNew/>
      },
      {
        path: "/photos/occupation",
        element: <PhotosOccupation/>
      },
      {
        path: "/photos/prison",
        element: <PhotosPrison/>
      },
      {
        path: "/photos/finnAndGer",
        element: <PhotosFinnAndGer/>
      },
      {
        path: "/photos/archive",
        element: <PhotosArchive/>
      },
      {
        path: "/photos/tech",
        element: <PhotosTech/>
      },
      {
        path: "/photos/national",
        element: <PhotosNational/>
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