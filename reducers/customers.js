import { GET_ROUTE_LIST } from '../actions/types';

const initialState = {
  routeList: null
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_ROUTE_LIST:
      return {
        ...state,
        routeList: payload
      };
    default:
      return state;
  }
}
