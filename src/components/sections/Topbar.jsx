import React, { Component } from 'react'
import {Menu, X, Search, User, Settings, HelpCircle, Lock, LogOut, Globe, Bell, ChevronDown} from 'react-feather';

export class Topbar extends Component {

    render() {
        return (
            <div className="navbar navbar-expand flex-column flex-md-row navbar-custom">
                <div className="container-fluid">
                {/* LOGO */}
                <a href="index.html" className="navbar-brand mr-0 mr-md-2 logo">
                    <span className="logo-lg">
                    <img src="assets/images/logo.png" alt="logo" height={24} />
                    <span className="d-inline h5 ml-1 text-logo">Sistem Informasi Elektronik Monitoring Notaris (siEMON)</span>
                    </span>
                    <span className="logo-sm">
                    <img src="assets/images/logo.png" alt="logo" height={24} />
                    </span>
                </a>
                <ul className="navbar-nav bd-navbar-nav flex-row list-unstyled menu-left mb-0">
                    <li className="">
                    <button className="button-menu-mobile open-left disable-btn">
                    <Menu className="menu-icon" />
                    <X className="close-icon"/>
                    </button>
                    </li>
                </ul>
                <ul className="navbar-nav flex-row ml-auto d-flex list-unstyled topnav-menu float-right mb-0">
                    <li className="d-none d-sm-block">
                    <div className="app-search">
                        <form>
                        <div className="input-group">
                            <input type="text" className="form-control" placeholder="Search..." />
                            <Search/>
                        </div>
                        </form>
                    </div>
                    </li>
                    <li className="dropdown d-none d-lg-block" data-toggle="tooltip" data-placement="left" title="Change language">
                    <a href="/" className="nav-link dropdown-toggle mr-0" data-toggle="dropdown" role="button" aria-haspopup="false" aria-expanded="false">
                        <Globe/>
                    </a>
                    <div className="dropdown-menu dropdown-menu-right">
                        {/* item*/}
                        <a href="/" className="dropdown-item notify-item">
                        <img src="assets/images/flags/germany.jpg" alt="user" className="mr-2" height={12} /> <span className="align-middle">German</span>
                        </a>
                        {/* item*/}
                        <a href="/" className="dropdown-item notify-item">
                        <img src="assets/images/flags/italy.jpg" alt="user" className="mr-2" height={12} /> <span className="align-middle">Italian</span>
                        </a>
                        {/* item*/}
                        <a href="/" className="dropdown-item notify-item">
                        <img src="assets/images/flags/spain.jpg" alt="user" className="mr-2" height={12} /> <span className="align-middle">Spanish</span>
                        </a>
                        {/* item*/}
                        <a href="/" className="dropdown-item notify-item">
                        <img src="assets/images/flags/russia.jpg" alt="user" className="mr-2" height={12} /> <span className="align-middle">Russian</span>
                        </a>
                    </div>
                    </li>
                    <li className="dropdown notification-list" data-toggle="tooltip" data-placement="left" title="8 new unread notifications">
                    <a href="/" className="nav-link dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="false" aria-expanded="false">
                        <Bell/>
                        <span className="noti-icon-badge" />
                    </a>
                    <div className="dropdown-menu dropdown-menu-right dropdown-lg">
                        {/* item*/}
                        <div className="dropdown-item noti-title border-bottom">
                        <h5 className="m-0 font-size-16">
                            <span className="float-right">
                            <a href="/" className="text-dark">
                                <small>Clear All</small>
                            </a>
                            </span>Notification
                        </h5>
                        </div>
                        <div className="slimscroll noti-scroll">
                        {/* item*/}
                        <a href="/" className="dropdown-item notify-item border-bottom">
                            <div className="notify-icon bg-primary"><i className="uil uil-user-plus" /></div>
                            <p className="notify-details">New user registered.<small className="text-muted">5 hours ago</small>
                            </p>
                        </a>
                        {/* item*/}
                        <a href="/" className="dropdown-item notify-item border-bottom">
                            <div className="notify-icon">
                            <img src="assets/images/users/avatar-1.jpg" className="img-fluid rounded-circle" alt="avatar" />
                            </div>
                            <p className="notify-details">Karen Robinson</p>
                            <p className="text-muted mb-0 user-msg">
                            <small>Wow ! this admin looks good and awesome design</small>
                            </p>
                        </a>
                        {/* item*/}
                        <a href="/" className="dropdown-item notify-item border-bottom">
                            <div className="notify-icon">
                            <img src="assets/images/users/avatar-2.jpg" className="img-fluid rounded-circle" alt="avatar" />
                            </div>
                            <p className="notify-details">Cristina Pride</p>
                            <p className="text-muted mb-0 user-msg">
                            <small>Hi, How are you? What about our next meeting</small>
                            </p>
                        </a>
                        {/* item*/}
                        <a href="/" className="dropdown-item notify-item border-bottom active">
                            <div className="notify-icon bg-success"><i className="uil uil-comment-message" /> </div>
                            <p className="notify-details">Jaclyn Brunswick commented on Dashboard<small className="text-muted">1
                                min
                                ago</small></p>
                        </a>
                        {/* item*/}
                        <a href="/" className="dropdown-item notify-item border-bottom">
                            <div className="notify-icon bg-danger"><i className="uil uil-comment-message" /></div>
                            <p className="notify-details">Caleb Flakelar commented on Admin<small className="text-muted">4 days
                                ago</small></p>
                        </a>
                        {/* item*/}
                        <a href="/" className="dropdown-item notify-item">
                            <div className="notify-icon bg-primary">
                            <i className="uil uil-heart" />
                            </div>
                            <p className="notify-details">Carlos Crouch liked
                            <b>Admin</b>
                            <small className="text-muted">13 days ago</small>
                            </p>
                        </a>
                        </div>
                        {/* All*/}
                        <a href="/" className="dropdown-item text-center text-primary notify-item notify-all border-top">
                        View all
                        <i className="fi-arrow-right" />
                        </a>
                    </div>
                    </li>
                    <li className="dropdown notification-list" data-toggle="tooltip" data-placement="left" title="Settings">
                    <a href="/" className="nav-link right-bar-toggle">
                        <Settings/>
                    </a>
                    </li>
                    <li className="dropdown notification-list align-self-center profile-dropdown">
                    <a href="/" className="nav-link dropdown-toggle nav-user mr-0" data-toggle="dropdown" role="button" aria-haspopup="false" aria-expanded="false">
                        <div className="media user-profile ">
                        <img src="assets/images/users/avatar-7.jpg" alt="user" className="rounded-circle align-self-center" />
                        <div className="media-body text-left">
                            <h6 className="pro-user-name ml-2 my-0">
                            <span>Shreyu N</span>
                            <span className="pro-user-desc text-muted d-block mt-1">Administrator </span>
                            </h6>
                        </div>
                        <ChevronDown className="ml-2 align-self-center"/>
                        </div>
                    </a>
                    <div className="dropdown-menu profile-dropdown-items dropdown-menu-right">
                        <a href="pages-profile.html" className="dropdown-item notify-item">
                        <i data-feather="user" className="icon-dual icon-xs mr-2" />
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
                    </li>
                </ul>
                </div>
            </div>

        )
    }
}

export default Topbar