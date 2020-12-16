import React from "react";
import axios from 'axios';
import Swal from 'sweetalert2';
import config from "../config.js"
import { Redirect } from "react-router"
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS';
export const CREATE_USER_FAILURE = 'CREATE_USER_FAILURE';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAILURE = 'UPDATE_USER_FAILURE';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';
export const DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS';
export const DELETE_USER_FAILURE = 'DELETE_USER_FAILURE';
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const FETCH_USER_FAILURE = 'FETCH_USER_FAILURE';
export const FETCH_OFFLINE_USERS_SUCCESS = 'FETCH_OFFLINE_USERS_SUCCESS';

export function receiveLogin() {
    return {
        type: LOGIN_SUCCESS
    };
}

function loginError(payload) {
    return {
        type: LOGIN_FAILURE,
        payload,
    };
}

export function createUserSuccess(user) {
    return {
        type: CREATE_USER_SUCCESS,
        payload: {user}
    };
}

export function updateUserSuccess(user) {
    return {
        type: UPDATE_USER_SUCCESS,
        payload: {user}
    };
}

export function fetchUsersSuccess(users) {
    return {
        type: FETCH_USERS_SUCCESS,
        payload: { users }
    };
}

export function fetchOfflineUsersSuccess(all_users) {
    return {
        type: FETCH_OFFLINE_USERS_SUCCESS,
        payload: { all_users }
    };
}

function createUserError(payload) {
    return {
        type: CREATE_USER_FAILURE,
        payload,
    };
}
export function getUserSuccess(user) {
    return {
        type: FETCH_USER_SUCCESS,
        payload: { user }
    };
}
export function deleteUserSuccess(user_id) {
    return {
        type: DELETE_USER_SUCCESS,
        payload: { user_id }
    };
}

function deleteUserFailer(payload) {
    return {
        type: DELETE_USER_FAILURE,
        payload,
    };
}

function getUserFailure(payload) {
    return {
        type: FETCH_USER_FAILURE,
        payload,
    };
}

function updateUserFailure(payload) {
    return {
        type: UPDATE_USER_FAILURE,
    };
}

function fetchUsersError(payload) {
    return {
        type: FETCH_USERS_FAILURE,
        payload,
    };
}

function requestLogout() {
    return {
        type: LOGOUT_REQUEST,
    };
}

export function receiveLogout() {
    return {
        type: LOGOUT_SUCCESS,
    };
}

// Logs the user out
export function logoutUser() {
    return (dispatch) => {
        dispatch(requestLogout());
        localStorage.removeItem('authenticated');
        dispatch(receiveLogout());
    };
}

export function loginUser(creds) {
    return (dispatch) => {

        // dispatch(receiveLogin());

        if (creds.email.length > 0 && creds.password.length > 0) {
          axios.post(config.baseURLApi+'login', {email: creds.email, password: creds.password})
              .then(function (response) {
                  if (response.data.message==='No user found') {
                      Swal.fire({
                          icon: 'success',
                          text: 'No user found',
                          showConfirmButton: true,
                          timer: 3500
                      });
                  }
                  else {
                    dispatch(receiveLogin());
                    localStorage.setItem('authenticated', true);
                    creds.history.push('/login');
                  }
              })
              .catch(function (error) {
                  // handle error
                  console.log(error);
                  dispatch(loginError(error));
              })
        } else {
            dispatch(loginError('Something was wrong. Try again'));
        }
    }
}

export function createUser(userData) {
    return (dispatch) => {
        if (userData.email.length > 0 && userData.password.length > 0) {
            let self = this;
              axios.post(config.baseURLApi+'sign-up', {email: userData.email, fname: userData.fname, lname: userData.lname, number: userData.number, password: userData.password, user_type: userData.user_type, type: userData.type, schedule : userData.schedule})
                  .then(function (response) {
                      Swal.fire({
                          icon: 'success',
                          type: 'success',
                          text: 'Registered successfully!',
                          showConfirmButton: true,
                          timer: 3500
                      });
                      console.log("-----------000000",response);
                      dispatch(createUserSuccess(response.data.user));
                      // window.location.assign('/');
                  })
                  .catch(function (error) {
                      console.log(error);
                      dispatch(createUserError(error));
                  })

        } else {
            dispatch(createUserError('Something was wrong. Try again'));
        }
    }
}

export function updateUser(userData) {
    return (dispatch) => {
      let self = this;
        axios.post(config.baseURLApi+'update', {id: userData.id, email: userData.email, fname: userData.fname, lname: userData.lname, number: userData.number, schedule : userData.schedule})
            .then(function (response) {
                Swal.fire({
                    icon: 'success',
                    type: 'success',
                    text: 'Update successfully!',
                    showConfirmButton: true,
                    timer: 3500
                });
                console.log("updat done");
                console.log(response.data.user);
                dispatch(updateUserSuccess(response.data.user));
                // window.location.assign('/');
            })
            .catch(function (error) {
                console.log(error);
                dispatch(updateUserFailure(error));
            })
    }
}

export function fetchUsers(type) {
    return (dispatch) => {
      let self = this;
        axios.get(config.baseURLApi+`users?type=${type}`)
            .then(function (response) {
              console.log("fetch user response", response);
                dispatch(fetchUsersSuccess(response.data.users));
                // window.location.assign('/');
            })
            .catch(function (error) {
                console.log(error);
                dispatch(fetchUsersError(error));
            })
    }
}
export function fetchOfflineUsers() {
    return (dispatch) => {
      let self = this;
        axios.get(config.baseURLApi+`offline_list`)
            .then(function (response) {
              console.log("fetch user response", response);
                dispatch(fetchOfflineUsersSuccess(response.data.users));
                // window.location.assign('/');
            })
            .catch(function (error) {
                console.log(error);
                dispatch(fetchUsersError(error));
            })
    }
}

export function getUser(data) {
  return (dispatch) => {
    axios({
      method: 'get',
      url: config.baseURLApi+"user/"+data.id,
      })
    .then((response) => {
      dispatch(getUserSuccess(response.data.user));
    })
    .catch((error) => {
      dispatch(getUserFailure(error))
    });
    }
}

export function deleteUser(data) {
  return (dispatch) => {
    axios({
      method: 'delete',
      url: config.baseURLApi+"delete_user/"+data.id,
      })
    .then((response) => {
      dispatch(deleteUserSuccess(response.data.id));
    })
    .catch((error) => {
      dispatch(deleteUserFailer(error))
    });
    }
}
