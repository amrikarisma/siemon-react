import React, { Component } from 'react'
import { Redirect } from 'react-router'
import Header from '../../components/sections/Header'
import Footer from '../../components/sections/Footer'
import Sidebar from '../../components/sections/Sidebar'
import Topbar from '../../components/sections/Topbar'
import ProfileContent from './ProfileContent'

export class Profile extends Component {
    render() {

        return (
          <div id="wrapper">
            <Topbar />
            <Sidebar />
            <div className="content-page">
                <div className="content">
                    <div className="container-fluid">
                        <Header title="Profil" />
                            <ProfileContent />
                    </div>
                </div>
                <Footer />
            </div>
          </div>
        )
    }
}

export default Profile
