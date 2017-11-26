import { Component } from 'react';
import { PropTypes } from 'prop-types';



class SearchTransportation extends Component {
    constructor(props) {
        super(props);
    }

    clearSearch = (e) => {
        e.preventDefault();
        this.props.onChange('');
    }

    updateFilter = (e) => {
        e.preventDefault();
        this.props.onChange(e.target.value);
    }

    render() {

        return (
            <div className='catalog-search'>
                <i className="fa fa-search search-icon"/>
                <input onChange={this.updateFilter} value={this.props.value} />
                {this.props.value && (
                    <a className="clear-search" onClick={this.clearSearch}>
                        <i className="fa fa-times"/>
                    </a>
                )}
            </div>
        );
    }
}

SearchTransportation.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func
}

export default SearchTransportation;
