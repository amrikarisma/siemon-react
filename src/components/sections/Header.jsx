import React, { Component, Fragment } from 'react'

export class Header extends Component {
    render() {
        return (
            <Fragment>
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
            </Fragment>
        )
    }
}

export default Header
