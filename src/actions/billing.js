import config from "../config.js";
import axios from 'axios';
import Swal from 'sweetalert2';
export const FETCH_SERVICE_SUCCESS = 'FETCH_SERVICE_SUCCESS';
export const FETCH_BILLING_SUCCESS = 'FETCH_BILLING_SUCCESS';
export const FETCH_ORDERED_BILLING_SUCCESS = 'FETCH_ORDERED_BILLING_SUCCESS';
export const EDIT_BILLING_SUCCESS = 'EDIT_BILLING_SUCCESS';
export const GET_ALL_BILLING_SUCCESS = 'GET_ALL_BILLING_SUCCESS';
export const FETCH_BILLING_FAILURE = 'FETCH_BILLING_FAILURE';
export const CREATE_BILLING_SUCCESS = 'CREATE_BILLING_SUCCESS';
export const UPDATE_BILLING_SUCCESS = 'UPDATE_BILLING_SUCCESS';
export const DELETE_BILLING_SUCCESS = 'DELETE_BILLING_SUCCESS';
export const FETCH_REMAINIG_BILL_PATIENT_LIST = 'FETCH_REMAINIG_BILL_PATIENT_LIST';
export const GET_BILL_NUMBER = 'GET_BILL_NUMBER';



export const fetchServiceSuccess = (services) => ({
  type: FETCH_SERVICE_SUCCESS,
  payload: { services }
});

export const fetchBillingSuccess = (billings) => ({
  type: FETCH_BILLING_SUCCESS,
  payload: { billings }
});

export const fetchRemainingBillPatientListSuccess = (remaining_bill_patients) => ({
  type: FETCH_REMAINIG_BILL_PATIENT_LIST,
  payload: { remaining_bill_patients }
});

export const getBillNumberSuccess = (bill_numbers) => ({
  type: GET_BILL_NUMBER,
  payload: { bill_numbers }
});

export const fetchOrderedBillingSuccess = (ordered_billings) => ({
  type: FETCH_ORDERED_BILLING_SUCCESS,
  payload: { ordered_billings }
});

export const updateBillingSuccess = (billing) => ({
  type: UPDATE_BILLING_SUCCESS,
  payload: { billing }
});

export const createBillingSuccess = (bill) => ({
  type: CREATE_BILLING_SUCCESS,
  payload: { bill }
});

export const deleteBillingSuccess = (billing_id) => ({
  type: DELETE_BILLING_SUCCESS,
  payload: { billing_id }
});

export const editBillingSuccess = (billing) => ({
  type: EDIT_BILLING_SUCCESS,
  payload: { billing }
});

export const getALlBillingSuccess = (billing) => ({
  type: GET_ALL_BILLING_SUCCESS,
  payload: { billing }
});

export const fetchBillingFailure = error => ({
  type: FETCH_BILLING_FAILURE,
  payload: { error }
});




export function fetchBilling() {
  return (dispatch) => {
    axios.get(config.baseURLApi+'get_billings')
        .then(function (response) {
          dispatch(fetchBillingSuccess(response.data.data));
        })
        .catch(function (error) {
            dispatch(fetchBillingFailure(error))
        })
    }
}

export function fetchRemainingBillPatientList() {
  return (dispatch) => {
    axios.get(config.baseURLApi+'remaining_bill_patient_list')
        .then(function (response) {
          dispatch(fetchRemainingBillPatientListSuccess(response.data.data));
        })
        .catch(function (error) {
            dispatch(fetchBillingFailure(error))
        })
    }
}

export function getBillNumber(data) {
  return (dispatch) => {
    axios.get(config.baseURLApi+'get_bill_number/'+data.id)
        .then(function (response) {
          dispatch(getBillNumberSuccess(response.data.data));
        })
        .catch(function (error) {
            dispatch(fetchBillingFailure(error))
        })
    }
}

export function fetchService() {
  return (dispatch) => {
    axios.get(config.baseURLApi+'getservices')
        .then(function (response) {
          dispatch(fetchServiceSuccess(response.data.data));
        })
        .catch(function (error) {
            dispatch(fetchBillingFailure(error))
        })
    }
}

export function fetchOrderedBilling() {
  return (dispatch) => {
    axios.get(config.baseURLApi+'get_bills')
        .then(function (response) {
          dispatch(fetchOrderedBillingSuccess(response.data.data));
        })
        .catch(function (error) {
            dispatch(fetchBillingFailure(error))
        })
    }
}


export function createBill(data) {
  console.log(data);
  console.log(config.baseURLApi+"generate_bill");
  return (dispatch) => {
  let self = this;
    axios.post(config.baseURLApi+'generate_bill', {id: data.id, amount: data.amount})
      .then(function (response) {
          Swal.fire({
              icon: 'success',
              type: 'success',
              text: 'New Billing added successfully!',
              showConfirmButton: true,
              timer: 3500
          });
          dispatch(createBillingSuccess(response));
          // window.location.assign('/');
      })
      .catch(function (error) {
          console.log(error);
          dispatch(fetchBillingFailure(error));
      })
  }
}

export function updateBilling(data) {
  return (dispatch) => {
    axios.post( config.baseURLApi+"update_billing", {id: data.id, session_schedule: data.schedule})
    .then((response) => {
      console.log("After===update==", response);
      Swal.fire({
        icon: 'success',
        type: 'success',
        text: 'Update successfully!',
        showConfirmButton: true,
        timer: 3500
    });
      dispatch(updateBillingSuccess(response.data.billing));
      dispatch(fetchBilling(response.data.billing));
    })
    .catch((error) => {
      dispatch(fetchBillingFailure(error))
    });
    }
}

export function getBilling(data) {
  return (dispatch) => {
    axios({
      method: 'get',
      url: config.baseURLApi+"get_billing/"+data.id,
      })
    .then((response) => {
      console.log(response);
      dispatch(editBillingSuccess(response.data.billing));
      return response.data.data;
    })
    .catch((error) => {
      dispatch(fetchBillingFailure(error))
    });
    }
}

export function getAllBillings(data) {
  return (dispatch) => {
    axios({
      method: 'get',
      url: config.baseURLApi+"getbillings"
      })
    .then((response) => {
      console.log(response);
      dispatch(getALlBillingSuccess(response.data.data));
      return response.data.data;
    })
    .catch((error) => {
      dispatch(fetchBillingFailure(error))
    });
    }
}

export function deleteBilling(data) {
  return (dispatch) => {
    axios({
      method: 'delete',
      url: config.baseURLApi+"delete_billing/"+data.id,
      })
    .then((response) => {
      dispatch(deleteBillingSuccess(response.data.id));
      return response.data.data;
    })
    .catch((error) => {
      dispatch(fetchBillingFailure(error))
    });
    }
}
