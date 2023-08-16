import React from 'react'
import SideNav from './SideNav'
import AddBook from './AddBook'
import SideBar from './SideBar'

const AddBooks = () => {
  return (
    <SideBar PassedComponent={<AddBook/>}  />
  )
}

export default AddBooks