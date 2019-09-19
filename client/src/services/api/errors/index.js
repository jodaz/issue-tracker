import { GET_ERRORS } from '../types';

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
    default: 
      return state;
  }
};
