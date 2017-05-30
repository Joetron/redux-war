import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import warApp from './reducers';
import './index.css';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

const store = createStore(warApp);

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);

registerServiceWorker();
