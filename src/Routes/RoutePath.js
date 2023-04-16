import React from 'react'
import { Routes, Route } from 'react-router-dom'
import SearchedItem from '../components/SearchedItem'
import Home from '../components/Home'
// import NavBars from '../components/NavBars'

const RoutePath = () => {
  return (
    <Routes>
        <Route path="/" element={<Home/>} />
        <Route path='/search' element={<SearchedItem/>} />
    </Routes>
  )
}

export default RoutePath