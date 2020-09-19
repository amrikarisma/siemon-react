import React, { Component } from 'react'
import Content from '../components/Content'
import Footer from '../components/sections/Footer'
import Sidebar from '../components/sections/Sidebar'
import Topbar from '../components/sections/Topbar'

export class Dashboard extends Component {
    render() {
        return (
            <div id="wrapper">
            <Topbar />
            <Sidebar />
            <div className="content-page">
              <Content title="Dashboard"/>
              <Footer />
            </div>
          </div>
        )
    }
}

export default Dashboard
