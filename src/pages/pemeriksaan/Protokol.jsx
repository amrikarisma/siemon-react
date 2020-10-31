import React, { Component } from 'react'
import Header from '../../components/sections/Header'
import Footer from '../../components/sections/Footer'
import Sidebar from '../../components/sections/Sidebar'
import Topbar from '../../components/sections/Topbar'
import ProtokolContent from './ProtokolContent'

export class Protokol extends Component {
    render() {

        return (
          <div id="wrapper">
            <Topbar />
            <Sidebar />
            <div className="content-page">
                <div className="content">
                    <div className="container-fluid">
                        <Header title="Pemeriksaan Protokol Notaris" />
                            <ProtokolContent />
                    </div>
                </div>
                <Footer />
            </div>
          </div>
        )
    }
}

export default Protokol
