import config from "../config.js";
import axios from 'axios';
import Swal from 'sweetalert2';
export const FETCH_REFERRAL_BEGIN   = 'FETCH_REFERRAL_BEGIN';
export const FETCH_REFERRAL_SUCCESS = 'FETCH_REFERRAL_SUCCESS';
export const EDIT_REFERRAL_SUCCESS = 'EDIT_REFERRAL_SUCCESS';
export const FETCH_REFERRAL_FAILURE = 'FETCH_REFERRAL_FAILURE';
export const CREATE_REFERRAL_SUCCESS = 'CREATE_REFERRAL_SUCCESS';
export const UPDATE_REFERRAL_SUCCESS = 'UPDATE_REFERRAL_SUCCESS';
export const DELETE_REFERRAL_SUCCESS = 'DELETE_REFERRAL_SUCCESS';

export const fetchReferralBegin = () => ({
  type: FETCH_REFERRAL_BEGIN
});

export const fetchReferralSuccess = (referrals) => ({
  type: FETCH_REFERRAL_SUCCESS,
  payload: { referrals }
});

export const updateReferralSuccess = (referral) => ({
  type: UPDATE_REFERRAL_SUCCESS,
  payload: { referral }
});

export const createReferralSuccess = (referral) => ({
  type: CREATE_REFERRAL_SUCCESS,
  payload: { referral }
});

export const deleteReferralSuccess = (referral_id) => ({
  type: DELETE_REFERRAL_SUCCESS,
  payload: { referral_id }
});

export const editReferralSuccess = (referral) => ({
  type: EDIT_REFERRAL_SUCCESS,
  payload: { referral }
});

export const fetchReferralFailure = error => ({
  type: FETCH_REFERRAL_FAILURE,
  payload: { error }
});


export function fetchReferral() {
  return (dispatch) => {
    axios.get(config.baseURLApi+'get_referrals')
        .then(function (response) {
          dispatch(fetchReferralSuccess(response.data.data));
        })
        .catch(function (error) {
            dispatch(fetchReferralFailure(error))
        })
    }
}

export function createReferral(data) {
  console.log(data);
  console.log(config.baseURLApi+"create_referral");
  return (dispatch) => {
  let self = this;
    axios.post(config.baseURLApi+'create_referral', {referral: data.referral, from: data.from, refer_to_name: data.refer_to_name, refer_to_number: data.refer_to_number})
      .then(function (response) {
          Swal.fire({
              icon: 'success',
              type: 'success',
              text: 'New Referral added successfully!',
              showConfirmButton: true,
              timer: 3500
          });
          dispatch(createReferralSuccess(response.data.referral));
          // window.location.assign('/');
      })
      .catch(function (error) {
          console.log(error);
          dispatch(fetchReferralFailure(error));
      })
  }
}

export function updateReferral(data) {
  return (dispatch) => {
    axios.post( config.baseURLApi+"update_referral", {id: data.id, referral: data.referral, from: data.from, refer_to_name: data.refer_to_name, refer_to_number: data.refer_to_number})
    .then((response) => {
      console.log("After===update==", response);
      Swal.fire({
        icon: 'success',
        type: 'success',
        text: 'Update successfully!',
        showConfirmButton: true,
        timer: 3500
    });
      dispatch(updateReferralSuccess(response.data.referral));
      dispatch(fetchReferral(response.data.referral));
    })
    .catch((error) => {
      dispatch(fetchReferralFailure(error))
    });
    }
}

export function getReferral(data) {
  return (dispatch) => {
    axios({
      method: 'get',
      url: config.baseURLApi+"get_referral/"+data.id,
      })
    .then((response) => {
      console.log(response);
      dispatch(editReferralSuccess(response.data.referral));
      return response.data.data;
    })
    .catch((error) => {
      dispatch(fetchReferralFailure(error))
    });
    }
}

export function deleteReferral(data) {
  return (dispatch) => {
    axios({
      method: 'delete',
      url: config.baseURLApi+"delete_referral/"+data.id,
      })
    .then((response) => {
      dispatch(deleteReferralSuccess(response.data.id));
      return response.data.data;
    })
    .catch((error) => {
      dispatch(fetchReferralFailure(error))
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
