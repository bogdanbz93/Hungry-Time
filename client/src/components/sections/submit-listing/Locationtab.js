import React, { Component, Fragment } from "react";
import L from "leaflet";
import { MapContainer, TileLayer, Popup, Marker } from "react-leaflet";

const MyMarker = props => {
  const initMarker = ref => {
    if (ref) {
      ref.leafletElement.openPopup();
    }
  };

  return <Marker ref={initMarker} {...props} />;
};

const customMarker = L.icon({
  iconUrl: process.env.PUBLIC_URL + "/assets/img/misc/marker.png",
  iconSize: [50, 50],
  iconAnchor: [25, 5]
});
class Locationtab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPos: null
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    this.setState({ currentPos: e.latlng });
  }
  render() {
    return (
      <Fragment>
        {/* <div className="form-group submit-listing-map">
                    <MapContainer zoom={8} center={{ lat: 51.5287718, lng: -0.2416804 }} onClick={this.handleClick}>
                        <TileLayer
                            url='https://{s}.tile.osm.org/{z}/{x}/{y}.png'
                        />
                        {this.state.currentPos && <MyMarker position={this.state.currentPos} icon={customMarker}>
                            <Popup position={this.state.currentPos}>
                                Current location: <pre>{JSON.stringify(this.state.currentPos, null, 2)}</pre>
                            </Popup>
                        </MyMarker>}
                    </MapContainer>
                </div> */}
        <div className="row">
          <div className="col-md-12 form-group">
            <label>Full Address</label>
            <input type="text" name="address" className="form-control" placeholder="Full Address" />
          </div>
          <div className="col-md-12 form-group">
            <label>Region</label>
            <select className="form-control" name="region">
              <option value="Connecticut">Connecticut</option>
              <option value="Washington DC">Washington DC</option>
              <option value="Los Angelas">Los Angelas</option>
              <option value="Missouri">Missouri</option>
            </select>
          </div>
          <div className="col-md-6 form-group">
            <label>Longitude</label>
            <input type="text" name="lng" id="lngVal" className="form-control" placeholder="Longitude" />
          </div>
          <div className="col-md-6 form-group">
            <label>Latitude</label>
            <input type="text" name="lat" id="latVal" className="form-control" placeholder="Latitude" />
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Locationtab;
