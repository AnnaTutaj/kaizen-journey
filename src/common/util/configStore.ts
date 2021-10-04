import { applyMiddleware, createStore } from 'redux';
import { getFirebase } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/rootReducers';

export const configStore = () => {
  const middlewares = [thunk.withExtraArgument({ getFirebase, getFirestore })];
  const composedEnchancer = composeWithDevTools(applyMiddleware(...middlewares));

  const store = createStore(rootReducer, composedEnchancer);

  return store;
};
