import { Component } from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/MenuItem';
import MapBox from '../MapBox/MapBox';

import { createNewHub } from '../../api/general';

import { getHubsCatalog } from '../../actions/hubsCatalog';


class ProductNew extends Component {
    constructor(props) {
        super(props);
        this.state = {
            position: {},
            name: '',
            errorName: '',
            errorMarker: ''
        };
    }

    componentDidMount() {
        this.props.getHubsCatalog();
    }

    onInputChange = (e) => {
        const { name, value } = e.target;
        this.setState((state) => {
            return { [name]: value};
        });
    };

    getHubs = () => {
        let catalog;
        if (this.props.hubsCatalog[0]) {
            catalog = this.props.hubsCatalog.map((hub, index) => {
                return (<MenuItem value={hub.id} key={index} primaryText="Never"/>);
            });
        } else {
            catalog = (<MenuItem value={false} primaryText="There're no hubs"/>);
        }
        return catalog;
    }

    createHub = (e) => {
        e.preventDefault();
        if (!this.state.name) {
            this.setState((state) => {
                return {
                    errorMarker: 'You can not create Hub without name'
                }
            })
        }

        if (!this.state.position.lat){
            this.setState((state) => {
                return {
                    errorName: 'You can not create Hub without location'
                }
            })
        }
        if (!this.state.name || !this.state.position.lat) {
            return;
        }
        this.setState(()=> {
            return {
                errorMarker: '',
                errorName: ''
            }
        });
        const { position, name } = this.state;
        createNewHub({ position, name })
            .then((res) => {
                console.info('Create order succeed');
                this.props.getHubsCatalog();
            })
            .catch((err) => console.info('Failed to create', err));
    }

    selectHubPosition = (position) => {
        this.setState(() => {
            return { position };
        });
    }

    render() {
        return (
            <div className="hub-new">
                <MapBox onSelection={this.selectHubPosition} marker={ this.state } />
                {this.state.errorName && (
                    <div className="error">{this.state.errorName}</div>
                )}
                <form  onSubmit={this.createHub}>
                    <TextField type="text" name="name"
                               className="product-new-input"
                               hintText="Enter Hub name"
                               onChange={this.onInputChange}
                               errorText={ this.state.errorMarker }
                    />
                    <RaisedButton primary={true} label="Create hub" type="submit" className="hub-new-submit"/>
                </form>
            </div>
        );
    }
}
function mapStateToProps(state, ownProps) {
    return {
        hubsCatalog: state.hubsCatalog.hubs
    };
}
ProductNew.propTypes = {
    getHubsCatalog: PropTypes.func,
    history: PropTypes.object
}

export default connect(mapStateToProps, {getHubsCatalog})(ProductNew);
