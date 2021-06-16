import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import './app/layout/styles.css';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';

import createStore from './app/store/configureStore';
import App from './app/layout/App';
import ScrollToTop from './app/layout/scrollToTop';

const rootEl = document.getElementById('root');

const store = createStore();
function render() {
	ReactDOM.render(
		<Provider store={store}>
			<BrowserRouter>
				<ScrollToTop />
				<App />
			</BrowserRouter>
		</Provider>,
		rootEl
	);
}

if (module.hot) {
	module.hot.accept('./app/layout/App', function () {
		setTimeout(render);
	});
}

render();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
