import React from 'react'
import SideNav from './SideNav'
import AddBook from './AddBook'

const AddBooks = () => {
  return (
    <SideNav PassedComponent={<AddBook/>}  />
  )
}

export default AddBooks