import React from 'react'
import SideBar from './SideBar'
import ListBook from './ListBook'

const BookList = () => {
  return (
    <SideBar PassedComponent={<ListBook/>}  />
  )
}

export default BookList