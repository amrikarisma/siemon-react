import React, { Component } from 'react'
import Footer from '../../components/sections/Footer'
import Sidebar from '../../components/sections/Sidebar'
import Topbar from '../../components/sections/Topbar'
import DashboardContent from './DashboardContent'

export class Dashboard extends Component {
    render() {
        return (
            <div id="wrapper">
            <Topbar />
            <Sidebar />
            <div className="content-page">
              <DashboardContent />
              <Footer />
            </div>
          </div>
        )
    }
}

export default Dashboard
