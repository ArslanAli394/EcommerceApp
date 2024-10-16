import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import {BrowserRouter as Router} from 'react-router-dom';
import {store,persistor} from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';


ReactDOM.render(<Provider store={store}>
                <Router>
                <PersistGate persistor={persistor}>
                    <App />
                </PersistGate>
                </Router>
                </Provider>,
                document.getElementById('root'));
