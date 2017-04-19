import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Store, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import App from './main/components/App';
import Memorize from './cards/components/Memorize';
import Customization from './cards/components/Customization';

import rootReducer from './main/reducer';

import { Router, Route, IndexRoute, browserHistory } from 'react-router';

const store: Store<any> = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path='/' component={App}>
                <IndexRoute component={Memorize} />
                <Route path='memorize' component={Memorize} />
                <Route path='customization' component={Customization} />
            </Route>
        </Router>
    </Provider>,
    document.getElementById('app')
);