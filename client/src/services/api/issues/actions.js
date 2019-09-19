import { SHOW_ALL, DELETE_ISSUE, ADD_ISSUE, GET_ERRORS } from '../types';
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

export const addIssue = (project, issue) => dispatch => {
  axios
    .post(`/api/issues/${project}`, issue)
    .then( res => {
      dispatch({
        type: ADD_ISSUE,
        payload: res.data
      })
      dispatch(showAll('/issues/all'));
    })
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: {
        errors: err.response.data,
        issue: { project: project, ...issue }
      }
    }));
};
