import { SET_MODAL } from '../types';

export default (state = false, action) => {
  switch(action.type) {
    case SET_MODAL:
      return !state;
    default:
      return state;
  }
};
