import axios from 'axios';

import { LOGIN_SUCCESS, LOGIN_FAIL } from './types';

export const login = (email, password) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post(
      'https://poolpro360.com/api/auth',
      body,
      config
    );

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    console.log(err);

    dispatch({
      type: LOGIN_FAIL
    });
  }
};
