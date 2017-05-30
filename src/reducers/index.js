import { combineReducers } from 'redux';
import war from './war.js';

const warApp = combineReducers({ war });

export default warApp;