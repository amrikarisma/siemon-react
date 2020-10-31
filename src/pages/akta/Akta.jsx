import Axios from 'axios'
import React, { Component } from 'react'
import Footer from '../../components/sections/Footer'
import Header from '../../components/sections/Header'
import Sidebar from '../../components/sections/Sidebar'
import Topbar from '../../components/sections/Topbar'
import Api from '../../constants/Api'
import AktaContent from './AktaContent'
import AktaTambah from './AktaTambah'

export class Akta extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: []
        };
    }
    componentDidMount() {
        Api.get("akta", 
        {
            headers: {
                "Authorization": 'Bearer ' + sessionStorage.getItem('_token'),
            }
        }
        ).then(
            (result) => {
                console.log(result);
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
        
        Api.get('akta', {
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

    render() {
        const Handlepage = () => {
            if(this.props.location.pathname === '/akta/tambah'){
                return (
                    <AktaTambah data={this.state.data}/>
                )
            } else {
                return (
                    <AktaContent data={this.state.data}/>
                )
            }
        }   
      return (
        <div id="wrapper">
        <Topbar />
        <Sidebar />
        <div className="content-page">
            <div className="content">
                <div className="container-fluid">
                    <Header title="Akta Notaris" />
                    
                       <Handlepage />
                        
                </div>
            </div>
            <Footer />
        </div>
      </div>
    )
    }
}

export default Akta
