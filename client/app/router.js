import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import App from './components/App.js';
import TransportationDescription from './components/transportation-description/TransportationDescription';
import ProductNew from './components/product-new/ProductNew';
import HubNew from './components/hub-new/HubNew';

const ApplicationRouter = (props) => (
    <Router history={props.history}>
        <Switch>
            <App>
                <Route exact path="/" component={ ProductNew } />
                <Route path="/create_order" component={ ProductNew } />
                <Route path="/create_hub" component={ HubNew } />
                <Route path="/order/:id" component={ TransportationDescription } />
            </App>
        </Switch>
    </Router>
);


export default ApplicationRouter;

ApplicationRouter.propTypes = {
    history: PropTypes.object,
};
