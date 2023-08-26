import React from 'react'
import Requests from './Requests'
import SideBar from './SideBar'

const RequestSection = () => {
  return (
    <SideBar PassedComponent={<Requests />} />
  )
}

export default RequestSection