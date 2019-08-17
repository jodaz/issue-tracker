import { SHOW_ALL } from './types';

export default (state = [], action) => {
  switch(action.type) {
    case SHOW_ALL:
      return [
        ...state,
        ...action.payload
      ]
    default:
      return state;
  }
}
