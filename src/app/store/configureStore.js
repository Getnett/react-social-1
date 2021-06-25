import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from '../store/rootReducer';
import thunk from 'redux-thunk';
export default function store() {
	return createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
}
