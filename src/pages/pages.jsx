import React, { Component } from 'react'

export class pages extends Component {
    constructor(props) {
        super(props);

        this.toggleTab = this.toggleTab.bind(this);
        this.state = {
            activeTab: '1',
            data: []
        };
    }
    render() {
        return (
            <div id="wrapper">
              <Topbar />
              <Sidebar />
              <div className="content-page">
                  <div className="content">
                      <div className="container-fluid">
                          <Header title={this.props.title} />
                              <ProfileContent />
                      </div>
                  </div>
                  <Footer />
              </div>
            </div>
          )
    }
}

export default pages
