import React from 'react'
import AddCategory from './AddCategory'
import SideBar from './SideBar'

const AddGenre = () => {
  return (
    <SideBar PassedComponent={<AddCategory/>}/>
  )
}

export default AddGenre