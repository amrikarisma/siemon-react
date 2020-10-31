import Axios from 'axios'
import React, { Component } from 'react'
import Footer from '../../components/sections/Footer'
import Header from '../../components/sections/Header'
import Sidebar from '../../components/sections/Sidebar'
import Topbar from '../../components/sections/Topbar'
import Api from '../../constants/Api'
import NotarisContent from './NotarisContent'

export class Notaris extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: []
        };
      }
    componentDidMount() {
        Api.get("notaris", 
        {
          headers: {
              "Authorization": 'Bearer ' + sessionStorage.getItem('_token'),
          }
        }
        ).then(
            (result) => {
                console.log(result.data);
                this.setState({
                    isLoaded: true,
                    data:result.data.attributes
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
        
        Api.get('notaris', {
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
        return (
            <div id="wrapper">
            <Topbar />
            <Sidebar />
            <div className="content-page">
                <div className="content">
                    <div className="container-fluid">
                        <Header title="Notaris" />
                            <NotarisContent data={this.state.data}/>
                    </div>
                </div>
                <Footer />
            </div>
          </div>
        )
    }
}

export default Notaris
