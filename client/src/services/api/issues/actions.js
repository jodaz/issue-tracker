import { SHOW_ALL } from './types';
import axios from 'axios';

export const showAll = () => dispatch => {
  axios.get('api/issues/issues/all')
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
      )
} 
