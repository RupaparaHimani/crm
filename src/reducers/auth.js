import {
    EDIT_FALSE, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_SUCCESS, CREATE_USER_SUCCESS, CREATE_USER_FAILURE, FETCH_USERS_SUCCESS, FETCH_USERS_FAILURE, FETCH_USER_SUCCESS, FETCH_USER_FAILURE, UPDATE_USER_SUCCESS, UPDATE_USER_FAILURE, DELETE_USER_SUCCESS, DELETE_USER_FAILURE, FETCH_OFFLINE_USERS_SUCCESS, FETCH_DOCTORS_USERS_SUCCESS
} from '../actions/user';

const authenticated = localStorage.getItem('authenticated');
export default function auth(state = {
    users: [],
    offline_users: [],
    doctors : [],
    user: null,
    error: null,
    edit: false,
    isFetching: false,
    isAuthenticated: authenticated,
}, action) {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                isAuthenticated: true,
                errorMessage: '',
            });

        case LOGIN_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                isAuthenticated: false,
                errorMessage: action.payload,
            });

        case LOGOUT_SUCCESS:
            return Object.assign({}, state, {
                isAuthenticated: false,
            });

        case CREATE_USER_SUCCESS:
          console.log("create success", action.payload.user);
            return Object.assign({}, state, {
                users: [...state.users, action.payload.user]
            });

        case CREATE_USER_FAILURE:
            return Object.assign({}, state, {
            });

        case UPDATE_USER_SUCCESS:
          var index = state.users.findIndex(function(o){
               if (o.id === action.payload.user.id){
                 o.first_name = action.payload.user.first_name
                 o.last_name = action.payload.user.last_name
                 o.number = action.payload.user.number
                 o.email = action.payload.user.email
               }
          })
            return Object.assign({}, state, {
                user: null,
                users: state.users
            });
        case UPDATE_USER_FAILURE:
            return Object.assign({}, state, {
            });

        case FETCH_USERS_SUCCESS:
            return Object.assign({}, state, {
                users: action.payload.users,
            });

        case FETCH_OFFLINE_USERS_SUCCESS:
            return Object.assign({}, state, {
                offline_users: action.payload.all_users,
            });

        case FETCH_DOCTORS_USERS_SUCCESS:
            return Object.assign({}, state, {
                doctors: action.payload.doctors,
            });
            

        case FETCH_USERS_SUCCESS:
            return Object.assign({}, state, {
                });

        case FETCH_USER_SUCCESS:
            return Object.assign({}, state, {
                user: action.payload.user,
                edit: true
            });

        case FETCH_USER_FAILURE:
            return Object.assign({}, state, {
            });

        case DELETE_USER_SUCCESS:
          // var index = state.users.findIndex(function(o){
          //      return o.id === parseInt(action.payload.user_id)
          // })
          return Object.assign({}, state, {
            users: [...state.users.filter(a=>a.id !==  parseInt(action.payload.user_id))]
          });

        case DELETE_USER_FAILURE:
            return Object.assign({}, state, {
            });

        case EDIT_FALSE:
            return Object.assign({}, state, {
                edit: false
            });

        default:
            return state;
    }
}
