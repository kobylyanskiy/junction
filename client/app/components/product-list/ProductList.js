import { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { withRouter } from 'react-router-dom';
import Infinite from 'react-infinite';
import { getTransportationCatalog } from '../../actions/transportationCatalog';
import { selectTransportation, updateTransportationCatalogFilter } from '../../actions/selectTransportation'

import CatalogItem from './catalog-item/CatalogItem';
import SearchTransportation from './search-transportation/SearchTransportation';


class ProductCatalog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            catalogHeight: this.getElementHeight()
        }
    }

    getElementHeight = () => {
        const headerElement = document.getElementsByClassName('header-wrap');
        const catalogSearchElement = document.getElementsByClassName('catalog-search');
        let size = window.innerHeight;
        if (headerElement[0]) {
            size -= headerElement[0].scrollHeight;
        }
        if (catalogSearchElement[0]) {
            size -= catalogSearchElement[0].scrollHeight;
        }
        return size;
    };

    componentDidMount() {
        const catalogHeight = this.getElementHeight();
        if (this.state.catalogHeight !== catalogHeight) {
            this.setState((state) => {
                return { catalogHeight }
            })
        }

        this.props.getTransportationCatalog();
    }

    selectTransportation(transportation) {
        this.props.selectTransportation(transportation);
        this.props.history.push(`/order/${transportation.id}`);
    }

    isSelected(id){
        return this.props.selectedId === id;
    }

    filterTransportationCatalog = (transportation, index) => {
        return !this.props.catalogFilter || transportation.id.indexOf(this.props.catalogFilter) !== -1;
    }

    createCatalog = () => {
        return this.props.transportationCatalog.catalog
            .filter(this.filterTransportationCatalog)
            .map((transportation, index) => {
            return (<CatalogItem key={index} transportation={transportation} selected={this.isSelected(transportation.id)}
                                onClick={this.selectTransportation.bind(this, transportation)}/>);
        });
    }

    catalogFilterChange = (catalogFilter) => {
        this.props.updateTransportationCatalogFilter(catalogFilter);
    }

    render() {
        return (
            <div className="catalog-wrapper">
                <SearchTransportation onChange={this.catalogFilterChange} value={this.props.catalogFilter}/>
                <Infinite containerHeight={this.state.catalogHeight}
                          elementHeight={55}
                          className="infinite-scroller"
                >
                    {this.createCatalog()}
                </Infinite>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        transportationCatalog: state.transportationCatalog,
        selectedId: state.selectedTransportation.selected.id,
        catalogFilter: state.selectedTransportation.catalogFilter
    };
}

ProductCatalog.propTypes = {
    selectedId: PropTypes.string,
    transportationCatalog: PropTypes.object,
    history: PropTypes.object,
    getTransportationCatalog: PropTypes.func,
    selectTransportation: PropTypes.func,
    updateTransportationCatalogFilter: PropTypes.func
}

export default connect(mapStateToProps, {
    getTransportationCatalog, selectTransportation, updateTransportationCatalogFilter
})(withRouter(ProductCatalog));
