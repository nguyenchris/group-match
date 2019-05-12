import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
// import InfoBox from 'react-google-maps/lib/components/addons/InfoBox';
import { Card, CardHeader, CardBody, Col } from 'reactstrap';
import { getGoogleKey } from '../../utils/api';
import { connect } from 'react-redux';
import { InfoWindow } from 'react-google-maps';
// import currentLocMarker from '../../assets/img/gps.png';

// Styling for Map view and markers to show
const MapWrapper = withScriptjs(
  withGoogleMap(props => (
    <GoogleMap
      defaultZoom={13}
      defaultCenter={
        props.center
          ? props.center
          : props.currentLat
          ? { lat: props.currentLat, lng: props.currentLong }
          : null
      }
      defaultOptions={{
        scrollwheel: true,
        zoomControl: true,
        styles: [
          {
            elementType: 'geometry',
            stylers: [
              {
                color: '#1d2c4d'
              }
            ]
          },
          {
            elementType: 'labels.text.fill',
            stylers: [
              {
                color: '#8ec3b9'
              }
            ]
          },
          {
            elementType: 'labels.text.stroke',
            stylers: [
              {
                color: '#1a3646'
              }
            ]
          },
          {
            featureType: 'administrative.country',
            elementType: 'geometry.stroke',
            stylers: [
              {
                color: '#4b6878'
              }
            ]
          },
          {
            featureType: 'administrative.land_parcel',
            elementType: 'labels.text.fill',
            stylers: [
              {
                color: '#64779e'
              }
            ]
          },
          {
            featureType: 'administrative.province',
            elementType: 'geometry.stroke',
            stylers: [
              {
                color: '#4b6878'
              }
            ]
          },
          {
            featureType: 'landscape.man_made',
            elementType: 'geometry.stroke',
            stylers: [
              {
                color: '#334e87'
              }
            ]
          },
          {
            featureType: 'landscape.natural',
            elementType: 'geometry',
            stylers: [
              {
                color: '#023e58'
              }
            ]
          },
          {
            featureType: 'poi',
            elementType: 'geometry',
            stylers: [
              {
                color: '#283d6a'
              }
            ]
          },
          {
            featureType: 'poi',
            elementType: 'labels.text.fill',
            stylers: [
              {
                color: '#6f9ba5'
              }
            ]
          },
          {
            featureType: 'poi',
            elementType: 'labels.text.stroke',
            stylers: [
              {
                color: '#1d2c4d'
              }
            ]
          },
          {
            featureType: 'poi.park',
            elementType: 'geometry.fill',
            stylers: [
              {
                color: '#023e58'
              }
            ]
          },
          {
            featureType: 'poi.park',
            elementType: 'labels.text.fill',
            stylers: [
              {
                color: '#3C7680'
              }
            ]
          },
          {
            featureType: 'road',
            elementType: 'geometry',
            stylers: [
              {
                color: '#304a7d'
              }
            ]
          },
          {
            featureType: 'road',
            elementType: 'labels.text.fill',
            stylers: [
              {
                color: '#98a5be'
              }
            ]
          },
          {
            featureType: 'road',
            elementType: 'labels.text.stroke',
            stylers: [
              {
                color: '#1d2c4d'
              }
            ]
          },
          {
            featureType: 'road.highway',
            elementType: 'geometry',
            stylers: [
              {
                color: '#2c6675'
              }
            ]
          },
          {
            featureType: 'road.highway',
            elementType: 'geometry.fill',
            stylers: [
              {
                color: '#9d2a80'
              }
            ]
          },
          {
            featureType: 'road.highway',
            elementType: 'geometry.stroke',
            stylers: [
              {
                color: '#9d2a80'
              }
            ]
          },
          {
            featureType: 'road.highway',
            elementType: 'labels.text.fill',
            stylers: [
              {
                color: '#b0d5ce'
              }
            ]
          },
          {
            featureType: 'road.highway',
            elementType: 'labels.text.stroke',
            stylers: [
              {
                color: '#023e58'
              }
            ]
          },
          {
            featureType: 'transit',
            elementType: 'labels.text.fill',
            stylers: [
              {
                color: '#98a5be'
              }
            ]
          },
          {
            featureType: 'transit',
            elementType: 'labels.text.stroke',
            stylers: [
              {
                color: '#1d2c4d'
              }
            ]
          },
          {
            featureType: 'transit.line',
            elementType: 'geometry.fill',
            stylers: [
              {
                color: '#283d6a'
              }
            ]
          },
          {
            featureType: 'transit.station',
            elementType: 'geometry',
            stylers: [
              {
                color: '#3a4762'
              }
            ]
          },
          {
            featureType: 'water',
            elementType: 'geometry',
            stylers: [
              {
                color: '#0e1626'
              }
            ]
          },
          {
            featureType: 'water',
            elementType: 'labels.text.fill',
            stylers: [
              {
                color: '#4e6d70'
              }
            ]
          }
        ]
      }}
    >
      {props.markers}
    </GoogleMap>
  ))
);

class Map extends Component {
  state = {
    GOOGLE_KEY: null,
    markers: null,
    center: null
  };
  componentDidMount() {
    // Call /api/google/key to get google key from server
    getGoogleKey(this.props.token).then(res => {
      let markers = null;
      if (this.props.eventData) {
        markers = this.getLocationMarkers(this.props.eventData);
      }
      this.setState({
        GOOGLE_KEY: res.data.googleKey,
        markers: markers
      });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const { eventData } = prevProps;

    if (this.props.eventData) {
      if (eventData !== this.props.eventData) {
        const centerLat = parseFloat(this.props.eventData[0].venue.latitude);
        const centerLong = parseFloat(this.props.eventData[0].venue.longitude);
        let markers = this.getLocationMarkers(this.props.eventData);
        this.setState({
          ...this.state,
          markers: markers,
          center: { lat: centerLat, lng: centerLong }
        });
      }
    }
  }

  getLocationMarkers = data => {
    return data.map(event => {
      const { venue, id, name } = event;
      return (
        <Marker
          id={id}
          key={id}
          position={{ lat: parseFloat(venue.latitude), lng: parseFloat(venue.longitude) }}
        >
          <InfoWindow>
            <div>{name}</div>
          </InfoWindow>
        </Marker>
      );
    });
  };
  render() {
    const map = (
      <MapWrapper
        ref="map"
        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${
          this.state.GOOGLE_KEY
        }&v=3.exp&libraries=geometry,drawing`}
        // googleMapURL={'https://maps.googleapis.com/maps/api/js?key='}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
        markers={this.state.markers}
        center={this.state.center}
        currentLat={this.props.latitude}
        currentLong={this.props.longitude}
      />
    );
    return (
      <>
        {/* <div className="content"> */}
        {/* <Row> */}
        <Col md="5">
          <Card className="card-plain">
            <CardHeader>Google Maps</CardHeader>
            <CardBody>
              <div id="map" className="map" style={{ position: 'relative', overflow: 'hidden' }}>
                {this.state.GOOGLE_KEY ? map : null}
              </div>
            </CardBody>
          </Card>
        </Col>
        {/* </Row> */}
        {/* </div> */}
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    userId: state.auth.userId,
    token: state.auth.token,
    latitude: state.geo.latitude,
    longitude: state.geo.longitude
  };
};

export default connect(
  mapStateToProps,
  null
)(Map);
