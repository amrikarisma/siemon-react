import Axios from 'axios';
import React, { Component, useContext } from 'react'
import {ChevronDown, User, Settings, HelpCircle, Lock, LogOut, Home, Users} from 'react-feather';
import {Link} from "react-router-dom";
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap';
import { AppContext } from '../../contexts/AppContext';
export class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
          user: []
        };
    }
    componentWillMount() {
        Axios.get("http://localhost:8000/api/user", 
        {
          headers: {
              "Authorization": 'Bearer ' + sessionStorage.getItem('_token'),
          }
        }
        ).then(
            (result) => {
                this.setState({
                    isLoaded: true,
                    user: result.data
                });
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
                console.log(error);
                this.setState({
                    isLoaded: true,
                    error
                });
            }
        )
    }
    render() {
        const menus = [
            {
                label: 'Dashboard',
                icon: Home,
                redirectTo: "/dashboard"
            },
            {
                label: 'Notaris',
                icon: Users,
                redirectTo: "/notaris"
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
                label: 'Laporan Notaris',
                icon: Home,
                redirectTo: "/laporan"
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
                label: 'Pemeriksaan Protokol',
                icon: Home,
                redirectTo: "/"
            },
        ];

        return (
            <div className="left-side-menu">
                <div className="media user-profile mt-2 mb-2">
                    <img src={this.state.user.foto_notaris} className="avatar-sm rounded-circle mr-2" alt="" />
                    <img src={this.state.user.foto_notaris} className="avatar-xs rounded-circle mr-2" alt="" />
                    <div className="media-body">
                        <h6 className="pro-user-name mt-0 mb-0">{this.state.user.nama_notaris}</h6>
                        <span className="pro-user-desc">Administrator</span>
                    </div>
                    <UncontrolledDropdown className="align-self-center profile-dropdown-menu">
                        <DropdownToggle 
                            data-toggle="dropdown"
                            tag="button"
                            className="btn btn-link p-0 dropdown-toggle mr-0">
                            <ChevronDown />
                        </DropdownToggle>
                        <DropdownMenu right className="topbar-dropdown-menu profile-dropdown-items">
                            <Link to="/profile" className="dropdown-item notify-item">
                                <User className="icon-dual icon-xs mr-2" />
                                <span>My Account</span>
                            </Link>
                            <Link to="/" className="dropdown-item notify-item">
                                <Settings className="icon-dual icon-xs mr-2" />
                                <span>Settings</span>
                            </Link>
                            <Link to="/" className="dropdown-item notify-item">
                                <HelpCircle className="icon-dual icon-xs mr-2" />
                                <span>Support</span>
                            </Link>
                            <Link to="/" className="dropdown-item notify-item">
                                <Lock className="icon-dual icon-xs mr-2" />
                                <span>Lock Screen</span>
                            </Link>
                            <DropdownItem divider />
                            <ButtonLogout />
                        </DropdownMenu>
                    </UncontrolledDropdown>
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

function ButtonLogout() {
    const appContext = useContext(AppContext);
    const {logout } = appContext;
    return (
        <button onClick={() => logout()} className="dropdown-item notify-item">
            <LogOut className="icon-dual icon-xs mr-2"/>
            <span>Logout</span>
        </button>
    )

}
export default Sidebar
