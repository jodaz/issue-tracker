import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';
import thunk from 'redux-thunk';
import issues from './services/api/reducer';

const rootReducer = combineReducers({
  issues
})

export default createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
