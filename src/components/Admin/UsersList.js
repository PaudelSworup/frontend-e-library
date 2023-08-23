import React from 'react'
import SideBar from './SideBar'
import Users from './Users'

const UsersList = () => {
  return (
    <SideBar PassedComponent={<Users/>} />
  )
}

export default UsersList