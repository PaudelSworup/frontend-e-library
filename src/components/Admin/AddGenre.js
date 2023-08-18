import React from 'react'
import SideNav from './SideNav'
import AddCategory from './AddCategory'
import SideBar from './SideBar'

const AddGenre = () => {
  return (
    <SideBar PassedComponent={<AddCategory/>}/>
  )
}

export default AddGenre