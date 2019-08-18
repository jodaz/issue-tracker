import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';
import thunk from 'redux-thunk';
import { issueReducer } from './services/api/issues';

const rootReducer = combineReducers({
  issue: issueReducer
})

export default createStore(
  rootReducer,
  {},
  composeWithDevTools(applyMiddleware(thunk))
);
