import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from '../store/rootReducer';
import thunk from 'redux-thunk';
import { verifyAuth } from '../../features/auth/authActions';
export default function store() {
	const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
	store.dispatch(verifyAuth());
	return store;
}
