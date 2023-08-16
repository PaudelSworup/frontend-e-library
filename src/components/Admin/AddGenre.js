import React from 'react'
import SideNav from './SideNav'
import AddCategory from './AddCategory'

const AddGenre = () => {
  return (
    <SideNav PassedComponent={<AddCategory/>}/>
  )
}

export default AddGenre