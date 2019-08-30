import { GET_ERRORS, CLEAR_ERRORS } from '../types';

const initialState = {
  errors: {},
  issue: {}
}

export default (state = initialState, action) => {
  switch(action.type) {
    case GET_ERRORS:
      return {
        errors: action.payload.errors,
        issue: action.payload.issue
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        errors: {},
        issue: {}
      }
    default: 
      return state;
  }
};
