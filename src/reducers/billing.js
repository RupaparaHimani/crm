import {
  FETCH_SERVICE_SUCCESS,
  FETCH_BILLING_SUCCESS,
  FETCH_ORDERED_BILLING_SUCCESS,
  FETCH_BILLING_FAILURE,
  CREATE_BILLING_SUCCESS,
  UPDATE_BILLING_SUCCESS,
  EDIT_BILLING_SUCCESS,
  GET_ALL_BILLING_SUCCESS,
  DELETE_BILLING_SUCCESS,
  FETCH_REMAINIG_BILL_PATIENT_LIST,
  GET_BILL_NUMBER
} from '../actions/billing';

const initialState = {
  billings: [],
  allBilling : [],
  ordered_billings: [],
  billing: null,
  temp: [],
  edit: false,
  allServices : [],
  remaining_bill_patients: [],
  bill_numbers: []
};

export default function billingReducer(state = initialState, action) {
  switch(action.type) {

    case FETCH_SERVICE_SUCCESS:
    return Object.assign({}, state, {
        allServices: action.payload.services,
    });

    case FETCH_BILLING_SUCCESS:
      return Object.assign({}, state, {
          billings: action.payload.billings,
      });

    case FETCH_REMAINIG_BILL_PATIENT_LIST:
      return Object.assign({}, state, {
          remaining_bill_patients: action.payload.remaining_bill_patients,
      });

    case GET_BILL_NUMBER:
      return Object.assign({}, state, {
          bill_numbers: action.payload.bill_numbers,
      });

    case FETCH_ORDERED_BILLING_SUCCESS:
      return Object.assign({}, state, {
          ordered_billings: action.payload.ordered_billings,
      });

    case CREATE_BILLING_SUCCESS:
      return Object.assign({}, state, {
          billings: [...state.billings, action.payload.billing]
      });

    case EDIT_BILLING_SUCCESS:
      return Object.assign({}, state, {
          billing: action.payload.billing,
          edit: true
      });

    case GET_ALL_BILLING_SUCCESS:
      return Object.assign({}, state, {
        allBilling: action.payload.billing,
        edit: true
    });

    case DELETE_BILLING_SUCCESS:
      return Object.assign({}, state, {
          billings: [...state.billings.filter(a=>a.id !==  parseInt(action.payload.billing_id))]
      });

    case UPDATE_BILLING_SUCCESS:
      var index = state.billings.findIndex(function(o){
           if (o.id === action.payload.billing.id){
             o.session_schedule = action.payload.billing.session_schedule
           }
      })
      return Object.assign({}, state, {
          billing: null,
          billings: state.billings
      });

    case FETCH_BILLING_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        billings: []
      };


    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}
