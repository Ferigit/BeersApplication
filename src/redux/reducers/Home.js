import {
  SET_OPERATOR_ID,
  SET_TICKET_PAYMENT,
  SET_BILL_ID,
  SET_PAY_ID
} from "../actions/ActionTypes";

const INSTIAL_STATE = {
  operatorId: "",
  isPrePaid: false,
  chargePhone: "",
  ticketPaymentResponse: "",
  billId: "",
  payId: ""
};

export default (state = INSTIAL_STATE, action) => {
  switch (action.type) {
    case SET_OPERATOR_ID:
      console.log("opertatorId reducer: ", action);
      return {
        ...state,
        operatorId: action.operatorId,
        isPrePaid: action.isPrePaid,
        chargePhone: action.phone
      };
    case SET_TICKET_PAYMENT:
      console.log("SET_TICKET_PAYMENT response: ", action.payload);
      return { ...state, ticketPaymentResponse: action.payload };
    case SET_BILL_ID:
      console.log("SET_BILL_ID ", action.payload);
      return { ...state, billId: action.payload };
    case SET_PAY_ID:
      console.log("SET_PAY_ID ", action.payload);
      return { ...state, payId: action.payload };

    default:
      return state;
  }
};
