import { SHOW_ALL, DELETE_ISSUE, ADD_ISSUE } from '../types';

const initialState = {
  issue: {},
  issues: []
}

export default (state = initialState, action) => {
  switch(action.type) {
    case SHOW_ALL:
      return {
        ...state,
        issues: action.payload
      }
    case DELETE_ISSUE:
      return {
        ...state,
        issues: state.issues.filter(issue => issue._id !== action.payload)
      }
    case ADD_ISSUE:
      return {
        ...state,
        issue: action.payload
      }
    default:
      return state;
  }
}
