import {
  FETCH_TESTS_BEGIN,
  FETCH_TESTS_SUCCESS,
  FETCH_TESTS_FAILURE,
  EDIT_TESTS_SUCCESS,
  FETCH_PAID_TESTS_SUCCESS,
  CREATE_PAID_TEST_SUCCESS,
  UPDATE_TEST_PDF_SUCCESS
} from '../actions/test';

const initialState = {
  tests: [],
  paid_tests: [],
  temp: [],
};

export default function testReducer(state = initialState, action) {
  switch(action.type) {
    case FETCH_TESTS_BEGIN:
    console.log("begin");
      // Mark the state as "loading" so we can show a spinner or something
      // Also, reset any errors. We're starting fresh.
      return {
        ...state,
        loading: true,
        error: null
      };

    case FETCH_TESTS_SUCCESS:
      return Object.assign({}, state, {
          tests: action.payload.tests,
      });

    case CREATE_PAID_TEST_SUCCESS:
      return Object.assign({}, state, {
          paid_tests: [...state.paid_tests, action.payload.paid_tests]
      });

    case UPDATE_TEST_PDF_SUCCESS:
        return Object.assign({}, state, {
            paid_tests: state.paid_tests.map(obj => action.payload.test.find(o => o.id === obj.id) || obj)
        });

    case FETCH_PAID_TESTS_SUCCESS:
      return Object.assign({}, state, {
          paid_tests: action.payload.paid_tests,
      });

    case FETCH_TESTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        tests: []
      };

    case EDIT_TESTS_SUCCESS:
      // All done: set loading "false".
      // Also, replace the tests with the ones from the server
      return {
        ...state,
        loading: false,
        test: action.payload.tests,
        ary_url: action.payload.ary
      };
    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}
