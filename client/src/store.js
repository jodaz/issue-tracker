import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';
import thunk from 'redux-thunk';
import { issueReducer } from './services/api/issues';
import errorsReducer from './services/api/errors';

const rootReducer = combineReducers({
  issue: issueReducer,
  errors: errorsReducer
});

export default createStore(
  rootReducer,
  {},
  composeWithDevTools(applyMiddleware(thunk))
);
