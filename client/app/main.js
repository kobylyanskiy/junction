//import 'babel-polyfill';
import ReactDOM from 'react-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import store from './store/configureStore';
import ApplicationRoutes from './router.js';

import './main.scss';

const history = createBrowserHistory();

ReactDOM.render(
    <Provider store={store}>
        <MuiThemeProvider>
            <ApplicationRoutes history={history}/>
        </MuiThemeProvider>
    </Provider>,
    document.getElementById('app')
);
