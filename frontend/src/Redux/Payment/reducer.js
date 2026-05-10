import {PROCEED_PAYMENT_FAILURE, PROCEED_PAYMENT_REQUEST, PROCEED_PAYMENT_SUCCESS} from "./actionTypes";

const initialState = {
     loading: false,
     success: null,
     error: null,
};

const proceedPaymentReducer = (state = initialState, action) => {
     switch (action.type) {
          case PROCEED_PAYMENT_REQUEST:
               return {
                    ...state,
                    loading: true,
                    success: null,
                    error: null,
               };
          case PROCEED_PAYMENT_SUCCESS:
               return {
                    ...state,
                    loading: false,
                    success: action.payload,
                    error: null,
               };
          case PROCEED_PAYMENT_FAILURE:
               return {
                    ...state,
                    loading: false,
                    success: null,
                    error: action.payload,
               };
          default:
               return state;
     }
};

export default proceedPaymentReducer;
