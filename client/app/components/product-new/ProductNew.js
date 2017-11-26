import { Component } from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import { createNewOrder } from '../../api/general';

import { getHubsCatalog } from '../../actions/hubsCatalog';


class ProductNew extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ethereum: '',
            origin: {name: ''},
            destination: {name: ''}
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

    onOriginChange = (e, key) => {
        this.setState(() => {
            return {
                origin: this.props.hubsCatalog[key]
            }
        })
    }

    onDestinationChange = (e, key) => {
        this.setState(() => {
            return {
                destination: this.props.hubsCatalog[key]
            }
        })
    }

    getHubs = () => {
        let catalog;
        if (this.props.hubsCatalog[0]) {
            catalog = this.props.hubsCatalog.map((hub, index) => {
                return (<MenuItem value={hub.name} key={index} primaryText={hub.name}/>);
            });
        } else {
            catalog = (<MenuItem value={false} primaryText="There're no hubs"/>);
        }
        return catalog;
    }

    createOrder = (e) => {
        e.preventDefault();
        console.info('createOrder', this.state);
            createNewOrder(this.state)
            .then((res) => {
                console.info('Create order succeed');
                this.props.getHubsCatalog();
            })
            .catch((err) => console.info('Failed to create', err));
        return false;
    }

    render() {
        return (
        <div className="product-new">
            <form  onSubmit={this.createOrder}>
                <TextField type="text"
                           name="ethereum"
                           className="product-new-input"
                           hintText="Enter ethereum wallet number"
                           value={this.state.ethereum}
                           onChange={this.onInputChange}
                />
                <SelectField
                    floatingLabelText="Select origin point"
                    className="product-new-input"
                    name="origin"
                    value={this.state.origin.name}
                    onChange={this.onOriginChange}
                    disabled={!this.props.hubsCatalog[0]}
                >
                    {this.getHubs()}
                </SelectField>
                <SelectField
                    className="product-new-input"
                    floatingLabelText="Select destination point"
                    name="destination"
                    value={this.state.destination.name}
                    onChange={this.onDestinationChange}
                    disabled={!this.props.hubsCatalog[0]}
                >
                    {this.getHubs()}
                </SelectField>
                <TextField
                    className="product-new-input"
                    hintText="Enter freight rates"
                    multiLine={true}
                    rows={4}
                    name="rates"
                    onChange={this.onInputChange}
                    value={this.state.rates}
                />
                <RaisedButton primary={true} label="Create order" type="submit" className=""/>
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
    getHubsCatalog: PropTypes.func
}

export default connect(mapStateToProps, {getHubsCatalog})(ProductNew);
