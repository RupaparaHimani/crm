import {
  FETCH_PROGRAM_SUCCESS,
  FETCH_ORDERED_PROGRAM_SUCCESS,
  FETCH_PROGRAM_FAILURE,
  CREATE_PROGRAM_SUCCESS,
  UPDATE_PROGRAM_SUCCESS,
  EDIT_PROGRAM_SUCCESS,
  GET_ALL_PROGRAM_SUCCESS,
  DELETE_PROGRAM_SUCCESS
} from '../actions/program';

const initialState = {
  programs: [],
  allProgram : [],
  ordered_programs: [],
  program: null,
  temp: [],
  edit: false,
};

export default function programReducer(state = initialState, action) {
  switch(action.type) {
    case FETCH_PROGRAM_SUCCESS:
      return Object.assign({}, state, {
          programs: action.payload.programs,
      });

    case FETCH_ORDERED_PROGRAM_SUCCESS:
      return Object.assign({}, state, {
          ordered_programs: action.payload.ordered_programs,
      });

    case CREATE_PROGRAM_SUCCESS:
      return Object.assign({}, state, {
          programs: [...state.programs, action.payload.program]
      });

    case EDIT_PROGRAM_SUCCESS:
      return Object.assign({}, state, {
          program: action.payload.program,
          edit: true
      });

    case GET_ALL_PROGRAM_SUCCESS:
      return Object.assign({}, state, {
        allProgram: action.payload.program,
        edit: true
    });

    case DELETE_PROGRAM_SUCCESS:
      return Object.assign({}, state, {
          programs: [...state.programs.filter(a=>a.id !==  parseInt(action.payload.program_id))]
      });

    case UPDATE_PROGRAM_SUCCESS:
      var index = state.programs.findIndex(function(o){
           if (o.id === action.payload.program.id){
             o.session_schedule = action.payload.program.session_schedule
           }
      })
      return Object.assign({}, state, {
          program: null,
          programs: state.programs
      });

    case FETCH_PROGRAM_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        programs: []
      };


    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}
