import config from "../config.js";
import axios from 'axios';
import Swal from 'sweetalert2';
export const FETCH_TESTS_BEGIN   = 'FETCH_TESTS_BEGIN';
export const FETCH_TESTS_SUCCESS = 'FETCH_TESTS_SUCCESS';
export const EDIT_TESTS_SUCCESS = 'EDIT_TESTS_SUCCESS';
export const FETCH_TESTS_FAILURE = 'FETCH_TESTS_FAILURE';
export const FETCH_PAID_TESTS_SUCCESS = 'FETCH_PAID_TESTS_SUCCESS';
export const CREATE_PAID_TEST_SUCCESS = 'CREATE_PAID_TEST_SUCCESS';

export const fetchTestsBegin = () => ({
  type: FETCH_TESTS_BEGIN
});

export const fetchTestsSuccess = (tests, ary) => ({
  type: FETCH_TESTS_SUCCESS,
  payload: { tests, ary }
});

export const createPaidTestSuccess = (paid_tests) => ({
  type: CREATE_PAID_TEST_SUCCESS,
  payload: { paid_tests }
});

export const fetchPaidTestsSuccess = (paid_tests) => ({
  type: FETCH_PAID_TESTS_SUCCESS,
  payload: { paid_tests}
});

export const editTestsSuccess = (tests, ary) => ({
  type: EDIT_TESTS_SUCCESS,
  payload: { tests, ary }
});

export const fetchTestsFailure = error => ({
  type: FETCH_TESTS_FAILURE,
  payload: { error }
});

export function fetchTests() {
  return (dispatch) => {
    axios.get(config.baseURLApi+'get_tests')
        .then(function (response) {
          dispatch(fetchTestsSuccess(response.data.data));
        })
        .catch(function (error) {
            dispatch(fetchTestsFailure(error))
        })
    }
}
export function fetchPaidTests() {
  console.log("fetchPaidTests");
  return (dispatch) => {
    axios.get(config.baseURLApi+'get_paid_tests')
        .then(function (response) {
          console.log(response.data.data);
          dispatch(fetchPaidTestsSuccess(response.data.data));
        })
        .catch(function (error) {
            dispatch(fetchTestsFailure(error))
        })
    }
}

export function createTest(data) {
  console.log(data);
  console.log(config.baseURLApi+"create_test");
  return (dispatch) => {
          let self = this;
            axios.post(config.baseURLApi+'create_test', {user_Id: data.user_id, test_id: data.test_id})
                .then(function (response) {
                    Swal.fire({
                        icon: 'success',
                        type: 'success',
                        text: 'New Test added successfully!',
                        showConfirmButton: true,
                        timer: 3500
                    });
                    console.log("-----------000000",response);
                    dispatch(createPaidTestSuccess(response.data.test));
                    // window.location.assign('/');
                })
                .catch(function (error) {
                    console.log(error);
                    dispatch(fetchTestsFailure(error));
                })

  }
}

export function updateTest(data) {
  return (dispatch) => {
    axios.post( config.baseURLApi+"updateTest/", {id: data.id, title: data.title, description: data.description})
    .then((response) => {
      window.location.reload();
    })
    .catch((error) => {
      dispatch(fetchTestsFailure(error))
    });
    }
}

export function getTest(data) {
  return (dispatch) => {
    axios({
      method: 'get',
      url: config.baseURLApi+"get_test/"+data.id,
      })
    .then((response) => {
      const mimeType = 'image/*';
      const buffer = response.data.data.image;
      const b64 = new Buffer(buffer).toString('base64')
      var ary=`data:${mimeType};base64,${b64}`

      dispatch(editTestsSuccess(response.data.data, ary));
      return response.data.data;
    })
    .catch((error) => {
      dispatch(fetchTestsFailure(error))
    });
    }
}

export function deleteTest(data) {
  return (dispatch) => {
    axios({
      method: 'delete',
      url: config.baseURLApi+"delete_test/"+data.id,
      })
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => {
      dispatch(fetchTestsFailure(error))
    });
    }
}
// Handle HTTP errors since fetch won't.
function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}
