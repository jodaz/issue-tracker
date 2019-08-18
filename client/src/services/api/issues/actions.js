import { SHOW_ALL } from './types';
import axios from 'axios';

export const showAll = (search) => dispatch => {
  axios
    .get(`api/issues/${search}`)
    .then(res => 
      dispatch({
        type: SHOW_ALL,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: SHOW_ALL,
        payload: null
      })
    );
};
