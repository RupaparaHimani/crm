import {
  FETCH_APPOINMENT_BEGIN,
  FETCH_APPOINMENT_SUCCESS,
  FETCH_APPOINMENT_FAILURE,
  CREATE_APPOINMENT_SUCCESS,
  UPDATE_APPOINMENT_SUCCESS,
  EDIT_APPOINMENT_SUCCESS,
  DELETE_APPOINMENT_SUCCESS
} from '../actions/appoinment';

const initialState = {
  appoinments: [],
  appoinment: null,
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

    case EDIT_APPOINMENT_SUCCESS:
      return Object.assign({}, state, {
          appoinment: action.payload.appoinment
      });

    case DELETE_APPOINMENT_SUCCESS:
      return Object.assign({}, state, {
          appoinments: [...state.appoinments.filter(a=>a.id !==  parseInt(action.payload.appoinment_id))]
      });

    case UPDATE_APPOINMENT_SUCCESS:
      var index = state.appoinments.findIndex(function(o){
           if (o.id === action.payload.appoinment.id){
             o.patientID = action.payload.appoinment.patientID
             o.doctorID = action.payload.appoinment.doctorID
             o.date = action.payload.appoinment.date
             o.time = action.payload.appoinment.time
           }
      })
      return Object.assign({}, state, {
          appoinment: null,
          appoinments: state.appoinments
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
