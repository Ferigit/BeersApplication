import { SET_BEER } from "../actions/ActionTypes";

const INSTIAL_STATE = {
  selectedBeer: null
};

export default (state = INSTIAL_STATE, action) => {
  switch (action.type) {
    case SET_BEER:
      console.log("SET_BEER in reducer  ", action);
      return { ...state, selectedBeer: action.payload };
    default:
      return state;
  }
};
