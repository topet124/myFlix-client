import { combineReducers } from "redux";

import {
  SET_FILTER,
  SET_MOVIES,
  SET_USER,
  UPDATE_USER,
} from "../actions/actions";

function visibilityFilter(state = "", action) {
  switch (action.type) {
    case SET_FILTER:
      return action.value;
    default:
      return state;
  }
}

function movies(state = [], action) {
  switch (action.type) {
    case SET_MOVIES:
      return action.value;
    default:
      return state;
  }
}

//reducer for user
function user(state = [], action) {
    switch (action.type) {
        case SET_USER:
            console.log('SET_USER is triggered');
            return action.value
        default:
            return state;
    }
}

//reducer for updateUser
function updateUser(state = [], action) {
    switch (action.type) {
        case UPDATE_USER:
            console.log('UPDATED_USER is triggered');
            return action.value
        default:
            return state;
    }
}

//combined reducer
const moviesApp = combineReducers({
    visibilityFilter,
    movies,
    user,
    updateUser
});

export default moviesApp;
