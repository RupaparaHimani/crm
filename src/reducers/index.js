import { combineReducers } from 'redux';
import auth from './auth';
import navigation from './navigation';
import alerts from './alerts';
import register from './register';
import blog from './blog';
import test from './test';
import appoinment from './appoinment';
import program from './program';

export default combineReducers({
  alerts,
  auth,
  navigation,
  register,
  blog,
  test,
  appoinment,
  program
});
