import React, { Component } from 'react'
import Footer from '../../components/sections/Footer'
import Header from '../../components/sections/Header'
import Sidebar from '../../components/sections/Sidebar'
import Topbar from '../../components/sections/Topbar'
import Api from '../../constants/Api'
import LaporanContent from './LaporanContent'

export class Laporan extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            isLoaded: false
        };
      }
    componentDidMount() {
        Api.get("laporan", 
        {
          headers: {
              "Authorization": 'Bearer ' + sessionStorage.getItem('_token'),
          }
        }
        ).then(
            (result) => {
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

    render() {
        return (
            <div id="wrapper">
            <Topbar />
            <Sidebar />
            <div className="content-page">
                <div className="content">
                    <div className="container-fluid">
                        <Header title="Laporan" />
                            <LaporanContent data={this.state.data}/>
                    </div>
                </div>
                <Footer />
            </div>
          </div>
        )
    }
}

export default Laporan