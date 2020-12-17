import config from "../config.js";
import axios from 'axios';
import Swal from 'sweetalert2';
export const FETCH_APPOINMENT_BEGIN   = 'FETCH_APPOINMENT_BEGIN';
export const FETCH_APPOINMENT_SUCCESS = 'FETCH_APPOINMENT_SUCCESS';
export const EDIT_APPOINMENT_SUCCESS = 'EDIT_APPOINMENT_SUCCESS';
export const FETCH_APPOINMENT_FAILURE = 'FETCH_APPOINMENT_FAILURE';
export const CREATE_APPOINMENT_SUCCESS = 'CREATE_APPOINMENT_SUCCESS';
export const UPDATE_APPOINMENT_PDF_SUCCESS = 'UPDATE_APPOINMENT_PDF_SUCCESS';

export const fetchAppoinmentBegin = () => ({
  type: FETCH_APPOINMENT_BEGIN
});

export const fetchAppoinmentSuccess = (appoinments) => ({
  type: FETCH_APPOINMENT_SUCCESS,
  payload: { appoinments }
});

export const updateAppoinmentPdfSuccess = (appoinment) => ({
  type: UPDATE_APPOINMENT_PDF_SUCCESS,
  payload: { appoinment }
});

export const createAppoinmentSuccess = (appoinment) => ({
  type: CREATE_APPOINMENT_SUCCESS,
  payload: { appoinment }
});

export const editAppoinmentSuccess = (appoinments, ary) => ({
  type: EDIT_APPOINMENT_SUCCESS,
  payload: { appoinments, ary }
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
    axios.post(config.baseURLApi+'create_appoinment', {user_id: data.user_id, doctor_id: data.doctor_id, date: data.date, time: data.time})
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
    axios.post( config.baseURLApi+"updateAppoinment/", {id: data.id, title: data.title, description: data.description})
    .then((response) => {
      window.location.reload();
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
      const mimeType = 'image/*';
      const buffer = response.data.data.image;
      const b64 = new Buffer(buffer).toString('base64')
      var ary=`data:${mimeType};base64,${b64}`

      dispatch(editAppoinmentSuccess(response.data.data, ary));
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

export function updateAppoinmentPdf(data) {
  return (dispatch) => {
    axios.post(config.baseURLApi+'update_pdf', {user_id: data.user_id, pdf_blob: data.blob, order_id: data.order_id})
      .then(function (response) {
        console.log("respose from action", response);
        dispatch(updateAppoinmentPdfSuccess(response.data.appoinment))
      })
    .catch((error) => {
      dispatch(fetchAppoinmentFailure(error))
    });
    }
}
