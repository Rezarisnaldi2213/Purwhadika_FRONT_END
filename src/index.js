import React from 'react' ;
import ReactDom from 'react-dom' ;
import App from './App' ;
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter} from 'react-router-dom' ;

import {Provider} from 'react-redux' 
import {createStore, applyMiddleware} from 'redux'
import allReducer from './redux/reducer'
import ReduxThunk from 'redux-thunk'

const globalState = createStore(allReducer, applyMiddleware(ReduxThunk))

ReactDom.render (
    <Provider store={globalState}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root') 
    );
