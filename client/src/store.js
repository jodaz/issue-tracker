import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';
import thunk from 'redux-thunk';
import { issueReducer } from './services/api/issues';
import errorsReducer from './services/api/errors';
import { modalReducer } from './services/api/modal';

const rootReducer = combineReducers({
  modal: modalReducer,
  issue: issueReducer,
  errors: errorsReducer
});

export default createStore(
  rootReducer,
  {},
  composeWithDevTools(applyMiddleware(thunk))
);
