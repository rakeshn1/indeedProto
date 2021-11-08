import { createSelector } from 'reselect';

const _getNotifications = (state) => state.notifications;

export const getDisplayedNotifications = createSelector(
  _getNotifications,
  (notifications) => notifications.displayedNotifications,
);
