import { Component } from 'react';
import { PropTypes } from 'prop-types';
import GoogleMapsLoader from 'google-maps';

GoogleMapsLoader.KEY = 'AIzaSyAlcErPPAuggXyZtZr5bEi-g59o8o-aQAs';

let map;
let google;
let currentTrailer;

class TravelMap extends Component {
    constructor(props) {
        super();
    }

    createMarker = (marker) => {
        return new google.maps.Marker({
            label: {text: `${marker.name || 'Select Name'}`, fontWeight: '900'},
            map: map,
            position: new google.maps.LatLng(marker.latitude, marker.longitude)
        });
    }

    createTrailer = (trailer) => {
        if (!google) return;
        if (currentTrailer) {
            currentTrailer.setMap(null);
        }
        currentTrailer = this.createMarker(trailer);
    }


    // no sure if single use
    createPoints = (props) => {
        if (!google) return;
        this.createMarker(props.startPoint);
        this.createMarker(props.finishPoint);
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
            map = new google.maps.Map(document.getElementById('travel_map'), options);
            if (that.props.startPoint) {
                that.createPoints(that.props);
            }
        });
        if (that.props.startPoint) {
            that.createTrailer(that.props);
        }
    }

    componentWillReceiveProps(props) {
        console.info('props', props);
        if (props.trailer) {
            this.createTrailer(props.trailer);
        }
    }

    render() {
        return (
            <div id="travel_map" />
        );
    }
}

TravelMap.propTypes = {
    trailer: PropTypes.object,
    startPoint: PropTypes.object,
    finishPoint: PropTypes.object
}

export default TravelMap;
