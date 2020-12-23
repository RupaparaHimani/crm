import {
  FETCH_REFERRAL_BEGIN,
  FETCH_REFERRAL_SUCCESS,
  FETCH_REFERRAL_FAILURE,
  CREATE_REFERRAL_SUCCESS,
  UPDATE_REFERRAL_SUCCESS,
  EDIT_REFERRAL_SUCCESS,
  DELETE_REFERRAL_SUCCESS
} from '../actions/referral';

const initialState = {
  referrals: [],
  referral: null,
  temp: [],
  edit: false,
};

export default function referralReducer(state = initialState, action) {
  switch(action.type) {
    case FETCH_REFERRAL_BEGIN:
    console.log("begin");
      // Mark the state as "loading" so we can show a spinner or something
      // Also, reset any errors. We're starting fresh.
      return {
        ...state,
        loading: true,
        error: null
      };

    case FETCH_REFERRAL_SUCCESS:
      return Object.assign({}, state, {
          referrals: action.payload.referrals,
      });

    case CREATE_REFERRAL_SUCCESS:
      return Object.assign({}, state, {
          referrals: [...state.referrals, action.payload.referral]
      });

    case EDIT_REFERRAL_SUCCESS:
      return Object.assign({}, state, {
          referral: action.payload.referral,
          edit: true
      });

    case DELETE_REFERRAL_SUCCESS:
      return Object.assign({}, state, {
          referrals: [...state.referrals.filter(a=>a.id !==  parseInt(action.payload.referral_id))]
      });

    case UPDATE_REFERRAL_SUCCESS:
      var index = state.referrals.findIndex(function(o){
           if (o.id === action.payload.referral.id){
             o.referral = action.payload.referral.referral
             o.from = action.payload.referral.from
             o.refer_to_name = action.payload.referral.refer_to_name
             o.refer_to_number = action.payload.referral.refer_to_number
           }
      })
      return Object.assign({}, state, {
          referral: null,
          referrals: state.referrals
      });

    case FETCH_REFERRAL_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        referrals: []
      };


    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}
