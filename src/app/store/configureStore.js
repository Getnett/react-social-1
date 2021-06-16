import { createStore } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension';
import rootReducer from '../store/rootReducer';

export default function store() {
	return createStore(rootReducer, devToolsEnhancer());
}
