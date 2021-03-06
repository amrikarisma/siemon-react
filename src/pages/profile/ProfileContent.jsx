import React, { Component, Fragment } from 'react'
import {NavLink } from 'react-router-dom';
import { Card, CardBody, Col, Nav, NavItem, Row, TabContent, TabPane } from 'reactstrap';
import classNames from 'classnames';
import UserBox from './UserBox';
import ProfileForm from './ProfileForm';
import PendidikanFormal from './PendidikanFormal';
import Api from '../../constants/Api';
import Axios from 'axios';

export class ProfileContent extends Component {
    constructor(props) {
        super(props);

        this.toggleTab = this.toggleTab.bind(this);
        this.state = {
            isLoaded: false,
            activeTab: '1',
            data: []
        };
    }
    componentDidMount() {
        this._asyncRequest = Api.get("user").then(
            (result) => {
                this._asyncRequest = null;
                this.setState({
                    isLoaded: true,
                    data:result.data
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
    componentWillUnmount() {
        const CancelToken = Axios.CancelToken;
        const source = CancelToken.source();
        
        Api.get('user', {
          cancelToken: source.token
        }).catch(function (thrown) {
          if (Axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
          } else {
            // handle error
          }
        });

        // cancel the request (the message parameter is optional)
        source.cancel('Operation canceled by the user.');

      }
    /**
     * Toggles tab
     * @param {*} tab 
     */
    toggleTab(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }
    render() {
        return (
            <Fragment>
                <Row>
                    <Col lg={3}>
                        {/* User information */}
                        <UserBox user={this.state.data}/>
                    </Col>

                    <Col lg={9}>
                        <Card>
                            <CardBody>
                                <Nav className="nav nav-pills navtab-bg nav-justified">
                                    <NavItem>
                                        <NavLink
                                            to="#"
                                            className={classNames({ active: this.state.activeTab === '1' }) +' nav-link'}
                                            onClick={() => {  this.toggleTab('1'); }}
                                        >Profile Notaris</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink
                                            to="#"
                                            className={classNames({ active: this.state.activeTab=== '2' })+' nav-link'}
                                            onClick={() => {  this.toggleTab('2'); }}
                                        >Pendidikan Formal</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink
                                            to="#"
                                            className={classNames({ active: this.state.activeTab === '3' })+' nav-link'}
                                            onClick={() => {  this.toggleTab('3'); }}
                                        >Pendidikan Informal</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink
                                            to="#"
                                            className={classNames({ active: this.state.activeTab === '4' })+' nav-link'}
                                            onClick={() => {  this.toggleTab('4'); }}
                                        >Riwayat Sanksi</NavLink>
                                    </NavItem>
                                </Nav>
                                <TabContent activeTab={this.state.activeTab}>
                                    <TabPane tabId="1">
                                        <ProfileForm user={this.state.data} />
                                    </TabPane>
                                    <TabPane tabId="2">
                                        <PendidikanFormal />
                                    </TabPane>
                                    <TabPane tabId="3">
                                        {/* <Projects /> */}
                                    </TabPane>
                                    <TabPane tabId="4">
                                        {/* <Tasks /> */}
                                    </TabPane>
                                </TabContent>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>

            </Fragment>
        )
    }
}

export default ProfileContent
