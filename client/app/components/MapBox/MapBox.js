import { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import GoogleMapsLoader from 'google-maps';

GoogleMapsLoader.KEY = 'AIzaSyAlcErPPAuggXyZtZr5bEi-g59o8o-aQAs';

let map;
let mapListener;
let google;
let currentMarker;

class MapBox extends Component {
    constructor(props) {
        super();
    }

    createMarker = (marker) => {
        if (!google) return;
        if (currentMarker) {
            currentMarker.setMap(null);
        }
        currentMarker = new google.maps.Marker({
            label: {text: `${marker.name || 'Select Name'}`, fontWeight: '900'},
            map: map,
            position: new google.maps.LatLng(marker.position.lat, marker.position.lng)
        });
    }

    componentDidMount() {
        const that = this;
        GoogleMapsLoader.load(function(_google) {
            google = _google;
            const centerlatlng = new google.maps.LatLng(51.308386, 10.213201);
            const options = {
                zoom: 7,
                center: centerlatlng,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            map = new google.maps.Map(document.getElementById('mapbox_map'), options);
            if (that.props.marker) {
                that.createMarker(that.props.marker);
            }
            map.addListener('click', that.mapClickHandler);
        });
        if (that.props.marker) {
            that.createMarker(that.props.marker);
        }
    }

    componentWillReceiveProps(props) {
        console.info('props', props);
        if (props.marker && props.marker.position) {
            this.createMarker(props.marker);
        }
    }

    mapClickHandler = (e) => {
        if (this.props.onSelection){
            this.props.onSelection({
                lat: e.latLng.lat(),
                lng: e.latLng.lng()
            })
        }
    }

    render() {
        return (
            <div id="mapbox_map"/>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        selected: state.selectedTransportation.selected
    };
}

MapBox.propTypes = {
    inputSelected: PropTypes.string,
    marker: PropTypes.object,
    onSelection: PropTypes.func
}

export default connect(mapStateToProps, {})(MapBox);
