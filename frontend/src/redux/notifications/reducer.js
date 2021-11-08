import { createReducer } from 'redux-act';

import initialState from './state';
import { addNotification, removeNotification } from './actions';
import { MAX_NOTIFICATIONS } from './constants';

const _addNotification = (state, notification) => ({
  ...state,
  displayedNotifications:
    state.displayedNotifications.length > MAX_NOTIFICATIONS
      ? [...state.displayedNotifications.slice(1), notification]
      : [...state.displayedNotifications, notification],
});

const _removeNotification = (state, id) => ({
  ...state,
  displayedNotifications: state.displayedNotifications.filter(
    (notification) => notification.id !== id,
  ),
});

const reducer = createReducer((on) => {
  on(addNotification, _addNotification);
  on(removeNotification, _removeNotification);
}, initialState);

export default reducer;
