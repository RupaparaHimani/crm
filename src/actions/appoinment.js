import config from "../config.js";
import axios from 'axios';
import Swal from 'sweetalert2';
export const FETCH_APPOINMENT_BEGIN   = 'FETCH_APPOINMENT_BEGIN';
export const FETCH_APPOINMENT_SUCCESS = 'FETCH_APPOINMENT_SUCCESS';
export const EDIT_APPOINMENT_SUCCESS = 'EDIT_APPOINMENT_SUCCESS';
export const FETCH_APPOINMENT_FAILURE = 'FETCH_APPOINMENT_FAILURE';
export const CREATE_APPOINMENT_SUCCESS = 'CREATE_APPOINMENT_SUCCESS';
export const UPDATE_APPOINMENT_SUCCESS = 'UPDATE_APPOINMENT_SUCCESS';
export const DELETE_APPOINMENT_SUCCESS = 'DELETE_APPOINMENT_SUCCESS';

export const fetchAppoinmentBegin = () => ({
  type: FETCH_APPOINMENT_BEGIN
});

export const fetchAppoinmentSuccess = (appoinments) => ({
  type: FETCH_APPOINMENT_SUCCESS,
  payload: { appoinments }
});

export const updateAppoinmentSuccess = (appoinment) => ({
  type: UPDATE_APPOINMENT_SUCCESS,
  payload: { appoinment }
});

export const createAppoinmentSuccess = (appoinment) => ({
  type: CREATE_APPOINMENT_SUCCESS,
  payload: { appoinment }
});

export const deleteAppoinmentSuccess = (appoinment_id) => ({
  type: DELETE_APPOINMENT_SUCCESS,
  payload: { appoinment_id }
});

export const editAppoinmentSuccess = (appoinment) => ({
  type: EDIT_APPOINMENT_SUCCESS,
  payload: { appoinment }
});

export const fetchAppoinmentFailure = error => ({
  type: FETCH_APPOINMENT_FAILURE,
  payload: { error }
});


export function fetchAppoinment() {
  return (dispatch) => {
    axios.get(config.baseURLApi+'get_appoinments')
        .then(function (response) {
          dispatch(fetchAppoinmentSuccess(response.data.data));
        })
        .catch(function (error) {
            dispatch(fetchAppoinmentFailure(error))
        })
    }
}

export function createAppoinment(data) {
  console.log(data);
  console.log(config.baseURLApi+"create_appoinment");
  return (dispatch) => {
  let self = this;
    axios.post(config.baseURLApi+'create_appoinment', {patient_id: data.user_id, doctor_id: data.doctor_id, date: data.date, time: data.time})
      .then(function (response) {
          Swal.fire({
              icon: 'success',
              type: 'success',
              text: 'New Appoinment added successfully!',
              showConfirmButton: true,
              timer: 3500
          });
          dispatch(createAppoinmentSuccess(response.data.appoinment));
          // window.location.assign('/');
      })
      .catch(function (error) {
          console.log(error);
          dispatch(fetchAppoinmentFailure(error));
      })
  }
}

export function updateAppoinment(data) {
  return (dispatch) => {
    axios.post( config.baseURLApi+"update_appoinment/", {id: data.id, patient_id: data.user_id, doctor_id: data.doctor_id, date: data.date, time: data.time})
    .then((response) => {
      console.log("After===update==", response);
      dispatch(updateAppoinmentSuccess(response.data.appoinment));
    })
    .catch((error) => {
      dispatch(fetchAppoinmentFailure(error))
    });
    }
}

export function getAppoinment(data) {
  return (dispatch) => {
    axios({
      method: 'get',
      url: config.baseURLApi+"get_appoinment/"+data.id,
      })
    .then((response) => {
      console.log(response);
      dispatch(editAppoinmentSuccess(response.data.data));
      return response.data.data;
    })
    .catch((error) => {
      dispatch(fetchAppoinmentFailure(error))
    });
    }
}

export function deleteAppoinment(data) {
  return (dispatch) => {
    axios({
      method: 'delete',
      url: config.baseURLApi+"delete_appoinment/"+data.id,
      })
    .then((response) => {
      dispatch(deleteAppoinmentSuccess(response.data.id));
      return response.data.data;
    })
    .catch((error) => {
      dispatch(fetchAppoinmentFailure(error))
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
