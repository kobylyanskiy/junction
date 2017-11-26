import { connect } from 'react-redux';
import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';
import Hamburger from './hamburger/hamburger';

class Header extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="header-wrap">
                <div className="header-logo-wrap">
                    <Hamburger />
                </div>
                <div className="header-main-wrap">
                    <div>
                        {this.props.selected || ''}
                    </div>
                    <div>
                        <Badge
                            style={{right: 6}}
                            badgeContent={10}
                            secondary={true}
                            badgeStyle={{top: 24, right: 18}}
                        >
                            <IconButton tooltip="Notifications">
                                <NotificationsIcon />
                            </IconButton>
                        </Badge>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        selected: state.selectedTransportation.selected.id
    };
}


Header.propTypes = {
    selected: PropTypes.string
}

export default connect(mapStateToProps, {})(Header);
