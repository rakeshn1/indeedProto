import { combineReducers } from 'redux';

import { notificationsReducer as notifications } from './notifications';

const rootReducer = combineReducers({
  notifications,
});

export default rootReducer;
