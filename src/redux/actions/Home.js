import { SET_BILL_ID, SET_PAY_ID } from "../actions/ActionTypes";

export const setBillId = billId => {
  return {
    type: SET_BILL_ID,
    payload: billId
  };
};

export const setPayId = payId => {
  return {
    type: SET_PAY_ID,
    payload: payId
  };
};
