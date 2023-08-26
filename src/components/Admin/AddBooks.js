import React from 'react'
import AddBook from './AddBook'
import SideBar from './SideBar'

const AddBooks = () => {
  return (
    <SideBar PassedComponent={<AddBook/>}  />
  )
}

export default AddBooks