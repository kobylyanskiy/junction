import { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { ButtonToolbar, DropdownButton, MenuItem } from 'react-bootstrap';

class Hamburger extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
    }

    handleClick = (e) => {
        e.preventDefault();
        this.setState((state) => {
            return { open: !state.open };
        });
    }

    handleToggle = (open) => {
        this.setState(() => {
            if (!open) {
                return { open: open };
            }
        })
    }

    createOrder = () => {
        this.props.history.push('/create_order');
    }

    createHub = () => {
        this.props.history.push('/create_hub');
    }

    render() {
        const isOpen = this.state.open;
        return (
            <div className="hamburger" onClick={this.handleClick}>
                <div className="hamburger-bg"/>
                <span id="closebtn">
                    <span className={`line1 ${isOpen && "active"}`}></span>
                    <span className={`line2 ${isOpen && "active"}`}></span>
                    <span className={`line3 ${isOpen && "active"}`}></span>
                </span>
                <ButtonToolbar>
                    <DropdownButton bsSize="large" title="Your tracks"
                                    id="dropdown-size-large"
                                    open={this.state.open}
                                    onToggle={this.handleToggle}
                    >
                        <MenuItem eventKey="1" onClick={this.createOrder}>Create Order</MenuItem>
                        <MenuItem eventKey="2" onClick={this.createHub}>Create Hub</MenuItem>
                        <MenuItem eventKey="3">Something else here</MenuItem>
                        <MenuItem divider />
                        <MenuItem eventKey="4">Separated link</MenuItem>
                    </DropdownButton>
                </ButtonToolbar>
            </div>
        )
    }
}

Hamburger.propTypes = {
    history: PropTypes.object
}

export default withRouter(Hamburger);