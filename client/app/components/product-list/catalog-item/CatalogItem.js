import { Component } from 'react';
import { PropTypes } from 'prop-types';



class CatalogItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const transportation = this.props.transportation;
        const color = transportation.status === 'ADDED' ? 'green' : 'yellow';
        // status => status (String)
        // id => ID (String)

        return (
            <div className={`catalog-item ${this.props.selected && 'active'}`} onClick={()=>this.props.onClick()}>
                <div className="transportation-status">
                    <i className={`fa fa-circle ${color}`}/>
                </div>
                <div className="transportation-message">
                    <div className="transportation-name">{transportation.id}</div>
                </div>
                <div className="transportation-meta">
                    <div className="transportation-last-update">12:06 AM</div>
                </div>
            </div>
        );
    }
}

CatalogItem.propTypes = {
    selected: PropTypes.bool,
    transportation: PropTypes.object,
    onClick: PropTypes.func
}

export default CatalogItem;
