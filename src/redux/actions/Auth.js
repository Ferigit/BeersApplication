// types of action
import {

  SET_BEER
} from "../actions/ActionTypes";

// actions

export const selectBeer = beer => {
  console.log('selectBeer action creator: ', beer)
  return {
    type: SET_BEER,
    payload: beer
  };
};
