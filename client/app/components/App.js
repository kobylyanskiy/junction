import { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from './header/Header';
import ProductCatalog from './product-catalog/ProductCatalog';
import ProductsList from './product-list/ProductList';
import { addNewTrack } from '../api/general';

class App extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount () {
        addNewTrack();
    }
    render() {
        return (
            <div>
                <Header/>
                <ProductCatalog>
                    <ProductsList />
                    { this.props.children }
                </ProductCatalog>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        transportationCatalog: state.transportationCatalog,
        selectedId: state.selectedTransportation.selected.id
    };
}

App.propTypes = {
    location: PropTypes.object,
    children: PropTypes.array.isRequired
}

export default connect(mapStateToProps, {})(withRouter(App));
