import { createAction } from 'redux-act';

import { ADD_NOTIFICATION, REMOVE_NOTIFICATION } from './action-types';

export const addNotification = createAction(ADD_NOTIFICATION);
export const removeNotification = createAction(REMOVE_NOTIFICATION);

let _id = 0;

export const showNotification = (notification) => (dispatch) =>
  dispatch(addNotification({ id: ++_id, ...notification }));

export const hideNotification = (id) => (dispatch) => dispatch(removeNotification(id));
