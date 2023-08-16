import React from 'react'
import Chart from './Chart'
// import SideNav from './SideNav'
import SideBar from './SideBar'

const Dashboard = () => {
  return (
    <>
     <SideBar  PassedComponent={<Chart />} />
    </>
 )

}

export default Dashboard