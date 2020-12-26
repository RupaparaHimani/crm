import config from "../config.js";
import axios from 'axios';
import Swal from 'sweetalert2';
export const FETCH_PROGRAM_SUCCESS = 'FETCH_PROGRAM_SUCCESS';
export const FETCH_ORDERED_PROGRAM_SUCCESS = 'FETCH_ORDERED_PROGRAM_SUCCESS';
export const EDIT_PROGRAM_SUCCESS = 'EDIT_PROGRAM_SUCCESS';
export const GET_ALL_PROGRAM_SUCCESS = 'GET_ALL_PROGRAM_SUCCESS';
export const FETCH_PROGRAM_FAILURE = 'FETCH_PROGRAM_FAILURE';
export const CREATE_PROGRAM_SUCCESS = 'CREATE_PROGRAM_SUCCESS';
export const UPDATE_PROGRAM_SUCCESS = 'UPDATE_PROGRAM_SUCCESS';
export const DELETE_PROGRAM_SUCCESS = 'DELETE_PROGRAM_SUCCESS';

export const fetchProgramSuccess = (programs) => ({
  type: FETCH_PROGRAM_SUCCESS,
  payload: { programs }
});

export const fetchOrderedProgramSuccess = (ordered_programs) => ({
  type: FETCH_ORDERED_PROGRAM_SUCCESS,
  payload: { ordered_programs }
});

export const updateProgramSuccess = (program) => ({
  type: UPDATE_PROGRAM_SUCCESS,
  payload: { program }
});

export const createProgramSuccess = (program) => ({
  type: CREATE_PROGRAM_SUCCESS,
  payload: { program }
});

export const deleteProgramSuccess = (program_id) => ({
  type: DELETE_PROGRAM_SUCCESS,
  payload: { program_id }
});

export const editProgramSuccess = (program) => ({
  type: EDIT_PROGRAM_SUCCESS,
  payload: { program }
});

export const getALlProgramSuccess = (program) => ({
  type: GET_ALL_PROGRAM_SUCCESS,
  payload: { program }
});

export const fetchProgramFailure = error => ({
  type: FETCH_PROGRAM_FAILURE,
  payload: { error }
});


export function fetchProgram() {
  return (dispatch) => {
    axios.get(config.baseURLApi+'get_programs')
        .then(function (response) {
          dispatch(fetchProgramSuccess(response.data.data));
        })
        .catch(function (error) {
            dispatch(fetchProgramFailure(error))
        })
    }
}

export function fetchOrderedProgram() {
  return (dispatch) => {
    axios.get(config.baseURLApi+'get_ordered_programs')
        .then(function (response) {
          dispatch(fetchOrderedProgramSuccess(response.data.data));
        })
        .catch(function (error) {
            dispatch(fetchProgramFailure(error))
        })
    }
}


export function createProgram(data) {
  console.log(data);
  console.log(config.baseURLApi+"create_program");
  return (dispatch) => {
  let self = this;
    axios.post(config.baseURLApi+'create_program', {user_id: data.patient_id, program_id: data.program_id, purpose: data.purpose})
      .then(function (response) {
          Swal.fire({
              icon: 'success',
              type: 'success',
              text: 'New Program added successfully!',
              showConfirmButton: true,
              timer: 3500
          });
          // dispatch(createProgramSuccess(response.data.program));
          dispatch(fetchOrderedProgram());
          // window.location.assign('/');
      })
      .catch(function (error) {
          console.log(error);
          dispatch(fetchProgramFailure(error));
      })
  }
}

export function updateProgram(data) {
  return (dispatch) => {
    axios.post( config.baseURLApi+"update_program", {id: data.id, session_schedule: data.schedule})
    .then((response) => {
      console.log("After===update==", response);
      Swal.fire({
        icon: 'success',
        type: 'success',
        text: 'Update successfully!',
        showConfirmButton: true,
        timer: 3500
    });
      // dispatch(updateProgramSuccess(response.data.program));
      dispatch(fetchProgram(response.data.program));
      dispatch(fetchOrderedProgram());
    })
    .catch((error) => {
      dispatch(fetchProgramFailure(error))
    });
    }
}

export function getProgram(data) {
  return (dispatch) => {
    axios({
      method: 'get',
      url: config.baseURLApi+"get_program/"+data.id,
      })
    .then((response) => {
      console.log(response);
      dispatch(editProgramSuccess(response.data.program));
      return response.data.data;
    })
    .catch((error) => {
      dispatch(fetchProgramFailure(error))
    });
    }
}

export function getAllPrograms(data) {
  return (dispatch) => {
    axios({
      method: 'get',
      url: config.baseURLApi+"getprograms"
      })
    .then((response) => {
      console.log(response);
      dispatch(getALlProgramSuccess(response.data.data));
      return response.data.data;
    })
    .catch((error) => {
      dispatch(fetchProgramFailure(error))
    });
    }
}

export function deleteProgram(data) {
  return (dispatch) => {
    axios({
      method: 'delete',
      url: config.baseURLApi+"delete_program/"+data.id,
      })
    .then((response) => {
      dispatch(deleteProgramSuccess(response.data.id));
      dispatch(fetchOrderedProgram());
      return response.data.data;
    })
    .catch((error) => {
      dispatch(fetchProgramFailure(error))
    });
    }
}
