import React, { Component, Fragment } from 'react'

export class Content extends Component {
    render() {

        const elements = [
            {
                "value": 293,
                "name": 'Akta Notaris'
            },
            {
                "value" : 39,
                "name" : 'Legalisasi'
            },
            {
                "value": 98,
                "name": 'Warmarking'
            }
        ];


    
    
        return (
            <Fragment>
                <div className="content">
                <div className="container-fluid">
                <div className="row page-title">
                    <div className="col-md-12">
                        <nav aria-label="breadcrumb" className="float-right mt-1">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">Home</li>
                            <li className="breadcrumb-item active" aria-current="page">{this.props.title}</li>
                        </ol>
                        </nav>
                        <h4 className="mb-1 mt-0">{this.props.title}</h4>
                    </div>
                    </div>
                    {/* content */}
                    <div className="row">
                    { Object.keys(elements).map(function(key, index) {
                        return (
                            <div className="col-md-4 col-xl-4" key={key}>
                            <div className="card">
                                <div className="card-body p-0">
                                    <div className="media p-3">
                                        <div className="media-body">
                                            <span className="text-muted text-uppercase font-size-12 font-weight-bold">{elements[key].name}</span>
                                            <h2 className="mb-0">{elements[key].value}</h2>
                                        </div>
                                        <div className="align-self-center">
                                            <div id="today-revenue-chart" className="apex-charts" />
                                            <span className="text-success font-weight-bold font-size-13"><i className="uil uil-arrow-up" /> 10.21%</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </div> 
                            )
            
                    }) }
                        
                            
                    </div>
                    
                </div>
                </div>
            </Fragment>
        )
    }
}

export default Content
