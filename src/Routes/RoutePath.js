import React from 'react'
import { Routes, Route } from 'react-router-dom'
import SearchedItem from '../components/SearchedItem'
import Home from '../components/Home'
import Profile from '../components/Profile'
import BookDetail from '../components/BookDetail'
// import NavBars from '../components/NavBars'

const RoutePath = () => {
  return (
    <Routes>
        <Route path="/" element={<Home/>} />
        <Route path='/search' element={<SearchedItem/>} />
        <Route path='/profile' element={<Profile/>} />
        <Route path='/book/detail/:id' element={<BookDetail/>} />
    </Routes>
  )
}

export default RoutePath