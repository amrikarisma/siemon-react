import React, { Component } from 'react'
import {ChevronDown, User, Settings, HelpCircle, Lock, LogOut, Home} from 'react-feather';
import {Link} from "react-router-dom";

export class Sidebar extends Component {
    render() {
        const menus = [
            {
                label: 'Dashboard',
                icon: Home,
                redirectTo: "/"
            },
            {
                label: 'Informasi',
                icon: Home,
                redirectTo: "/informasi"
            },
            {
                label: 'Pertaturan',
                icon: Home,
                redirectTo: "/peraturan"
            },
            {
                label: 'Akta',
                icon: Home,
                redirectTo: "/akta"
            },
            {
                label: 'Legalisasi',
                icon: Home,
                redirectTo: "/"
            },
            {
                label: 'Warmarking',
                icon: Home,
                redirectTo: "/"
            },
            {
                label: 'Surat Wasiat',
                icon: Home,
                redirectTo: "/"
            },
            {
                label: 'Laporan Notaris',
                icon: Home,
                redirectTo: "/"
            },
            {
                label: 'Pemeriksaan Protokol',
                icon: Home,
                redirectTo: "/"
            },
        ];
        return (
            <div className="left-side-menu">
                <div className="media user-profile mt-2 mb-2">
                    <img src="assets/images/users/avatar-7.jpg" className="avatar-sm rounded-circle mr-2" alt="Shreyu" />
                    <img src="assets/images/users/avatar-7.jpg" className="avatar-xs rounded-circle mr-2" alt="Shreyu" />
                    <div className="media-body">
                    <h6 className="pro-user-name mt-0 mb-0">Nik Patel</h6>
                    <span className="pro-user-desc">Administrator</span>
                    </div>
                    <div className="dropdown align-self-center profile-dropdown-menu">
                    <a href="/" className="dropdown-toggle mr-0" data-toggle="dropdown" role="button" aria-haspopup="false" aria-expanded="false">
                        <ChevronDown />

                    </a>
                    <div className="dropdown-menu profile-dropdown">
                        <a href="pages-profile.html" className="dropdown-item notify-item">
                        <User className="icon-dual icon-xs mr-2"/>

                        <span>My Account</span>
                        </a>
                        <a href="/" className="dropdown-item notify-item">
                        <Settings className="icon-dual icon-xs mr-2"/>

                        <span>Settings</span>
                        </a>
                        <a href="/" className="dropdown-item notify-item">
                        <HelpCircle className="icon-dual icon-xs mr-2"/>

                        <span>Support</span>
                        </a>
                        <a href="pages-lock-screen.html" className="dropdown-item notify-item">
                        <Lock className="icon-dual icon-xs mr-2"/>

                        <span>Lock Screen</span>
                        </a>
                        <div className="dropdown-divider" />
                        <a href="/" className="dropdown-item notify-item">
                        <LogOut className="icon-dual icon-xs mr-2"/>

                        <span>Logout</span>
                        </a>
                    </div>
                    </div>
                </div>
                <div className="sidebar-content">
                    {/*- Sidemenu */}
                    <div id="sidebar-menu" className="slimscroll-menu">
            
                        <ul className="metismenu" id="menu-bar">
                        <li className="menu-title">Navigation</li>

                        { Object.keys(menus).map(function(key, index) {
                            const Icon = menus[key].icon;

                            return (
                                <li key={key}>
                                    <Link to={menus[key].redirectTo} >
                                        <Icon />
                                        <span className="badge badge-success float-right">1</span>
                                        <span> {menus[key].label} </span>
                                    </Link>
                                </li>
                            )
                        })}
                       


                        </ul>





                    </div>
                    {/* End Sidebar */}
                    <div className="clearfix" />
                </div>
                {/* Sidebar -left */}
            </div>

        )
    }
}

export default Sidebar
