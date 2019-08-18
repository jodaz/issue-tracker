import { SHOW_ALL } from './types';

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
    default:
      return state;
  }
}
