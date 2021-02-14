import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './i18n';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {createStore,applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import rootState from '../src/redux/reducers/root'
import thunk from 'redux-thunk';
import { SnackbarProvider } from 'notistack';

import pre from './pre.gif'
 
 
let store = createStore(rootState,applyMiddleware(thunk))

ReactDOM.render(
  <Suspense fallback={<div style={{display:'flex',alignItems:'center',justifyContent:'center',position:'absolute',width:'100vw',height:'100vh'}}><img src={pre}/></div>}>
    <Provider store={store}>
    <SnackbarProvider maxSnack={3}>
       <App/>
    </SnackbarProvider>
   </Provider>
  </Suspense>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
