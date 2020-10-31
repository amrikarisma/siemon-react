import React, { Component } from 'react'
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

export class Maps extends Component {
    constructor(props) {
        super(props);
        this.state = {
          marker: 
            {
              title: "Silahkan pilih lokasi kantor Notaris.",
              name: "Yogyakarta",
              position: { lat: -7.789191956295359, lng: -110.3680872880621 }
            }
        };
        this.onClick = this.onClick.bind(this);
      }
    
      onClick(t, map, coord) {
        const { latLng } = coord;
        const lat = latLng.lat();
        const lng = latLng.lng();
        console.log('lat: ',lat);
        console.log('lng: ',lng);
        console.log(t, map, coord);
        this.setState({
            marker : {
                title: "",
                name: "",
                position: { lat, lng },
              }
       
        });
      }
    render() {
        console.log(this.state.marker.position)
        return (
            <Map
                google={this.props.google}
                style={{ width: "91%", margin: "auto" }}
                className={"map"}
                zoom={14}
                onClick={this.onClick}
            >
                <Marker
                    title={this.state.marker.title}
                    name={this.state.marker.name}
                    position={this.state.marker.position}
                />
            </Map>
        )
    }
}

// export default Maps
export default GoogleApiWrapper({
  apiKey: 'AIzaSyAUEFOytD5AjiDAUV1Gvhvj63Yugeulr1o'
})(Maps);