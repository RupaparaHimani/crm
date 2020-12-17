import {
  FETCH_APPOINMENT_BEGIN,
  FETCH_APPOINMENT_SUCCESS,
  FETCH_APPOINMENT_FAILURE,
  CREATE_APPOINMENT_SUCCESS,
  UPDATE_APPOINMENT_PDF_SUCCESS
} from '../actions/appoinment';

const initialState = {
  appoinments: [],
  paid_appoinments: [],
  temp: [],
};

export default function appoinmentReducer(state = initialState, action) {
  switch(action.type) {
    case FETCH_APPOINMENT_BEGIN:
    console.log("begin");
      // Mark the state as "loading" so we can show a spinner or something
      // Also, reset any errors. We're starting fresh.
      return {
        ...state,
        loading: true,
        error: null
      };

    case FETCH_APPOINMENT_SUCCESS:
      return Object.assign({}, state, {
          appoinments: action.payload.appoinments,
      });

    case CREATE_APPOINMENT_SUCCESS:
      return Object.assign({}, state, {
          appoinments: [...state.appoinments, action.payload.appoinment]
      });

    case UPDATE_APPOINMENT_PDF_SUCCESS:
        return Object.assign({}, state, {
            paid_appoinments: state.paid_appoinments.map(obj => action.payload.appoinment.find(o => o.id === obj.id) || obj)
        });

    case FETCH_APPOINMENT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        appoinments: []
      };

    
    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}
