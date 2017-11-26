import { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import {List, ListItem} from 'material-ui/List';
import TravelMap from '../travel-map/TravelMap';
import { getTransportationCatalog } from '../../actions/transportationCatalog';
import { Fade, Well } from 'react-bootstrap';
import RaisedButton from 'material-ui/RaisedButton';

let longpulling;

class TransportationDescription extends Component {
    constructor(props) {
        super(props);
        this.state = {
            trailer: false,
            startPoint: false,
            finishPoint: false,
            showSmth: false
        }
    }

    toggleSmth = () => {
        this.setState((state)=>{
            return {
                showSmth: !state.showSmth
            }
        })
    }

    componentDidMount() {
        this.watchTrack();
    }

    componentWillUnmount = () => {
        clearInterval(longpulling);
    }

    watchTrack = () => {
        const that = this;
        longpulling = setInterval(function(){
            that.props.getTransportationCatalog();
        }, 1000);
    }

    notSelectedElement = () => {
        return (
            <div className="transportation-description-empty">
                <div className="text">
                    No transportation is selected. Choose any to start!
                </div>
            </div>
        )
    };

    selectedElement = () => {
        const selected = this.props.selected || {};
        return (
            <div className="transportation-description">
                <TravelMap trailer={this.props.catalog[0]}/>
                <div className="transportation-description-content">
                    <List className="column">
                        <ListItem primaryText={`Name: ${selected.name}`} />
                        <ListItem primaryText={`Origin: ${selected.city_from}`} />
                        <ListItem primaryText={`Destination: ${selected.city_to}`} />
                        <ListItem primaryText={`Lat: ${selected.latitude} Lng: ${selected.longitude}`} />
                    </List>
                    <List className="column">
                        <RaisedButton label="Open Alerts" className="toggle-btn" onClick={this.toggleSmth}/>
                        <Fade in={this.state.showSmth}>
                            <div>
                                <Well>
                                    No alerts right now
                                </Well>
                            </div>
                        </Fade>
                    </List>
                </div>
            </div>
        )
    }

    getDescription() {
        let descriptionElement;
        if (!this.props.selected.id) {
            descriptionElement = this.notSelectedElement();
        } else {
            descriptionElement = this.selectedElement();
        }
        return descriptionElement;
    }



    render() {
        console.info('selected', this.props.selected);
        return (
            <div className="transportation-info">
                {this.getDescription()}
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        selected: state.selectedTransportation.selected,
        catalog: state.transportationCatalog.catalog
    };
}

TransportationDescription.propTypes = {
    selected: PropTypes.object,
    catalog: PropTypes.array,
    getTransportationCatalog: PropTypes.func
}

export default connect(mapStateToProps, {getTransportationCatalog})(TransportationDescription);
