import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';
import thunk from 'redux-thunk';
import { issuesReducer } from './services/api/issues';

const rootReducer = combineReducers({
  issues: issuesReducer
})

export default createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
