import React from 'react'
import Chart from './Chart'
import SideNav from './SideNav'

const Dashboard = () => {
  return <SideNav PassedComponent={<Chart />} />
}

export default Dashboard