import { SHOW_ALL, DELETE_ISSUE } from './types';
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

export const deleteIssue = (project, issueID) => dispatch => {
  axios({
    method: 'DELETE',
    url: `api/issues/${project}`,
    data: {
      id: issueID
    }
  })
  .then(res => 
    dispatch({
      type: DELETE_ISSUE,
      payload: res.data.success
    })
  )
  .catch(err => console.log(err));
};
