import Axios from 'axios'
import React, { Component } from 'react'
import Footer from '../../components/sections/Footer'
import Header from '../../components/sections/Header'
import Sidebar from '../../components/sections/Sidebar'
import Topbar from '../../components/sections/Topbar'
import NotarisContent from './NotarisContent'

export class Notaris extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: []
        };
      }
    componentWillMount() {
        Axios.get("http://localhost:8000/api/notaris", 
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
