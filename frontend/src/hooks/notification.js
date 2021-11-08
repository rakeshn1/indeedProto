import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';

import { getDisplayedNotifications, hideNotification } from '../redux/notifications';

let _displayedNotifications = [];

const _displayNotification = (id) => {
  _displayedNotifications = [..._displayedNotifications, id];
};

const _removeNotification = (id) => {
  _displayedNotifications = _displayedNotifications.filter((key) => id !== key);
};

export const useNotifications = () => {
  const dispatch = useDispatch();
  const notifications = useSelector(getDisplayedNotifications);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const _closeSnackbar = useCallback(
    (id) => {
      // Remove this notification from Redux.
      dispatch(hideNotification(id));
      // Remove this notification from list of displayed notifications.
      _removeNotification(id);
      // Tell notistack to close the notification.
      closeSnackbar(id);
    },
    [dispatch, closeSnackbar],
  );

  useEffect(() => {
    notifications.forEach(({ id, message, level, options = {} }) => {
      // Do nothing if notification is already displayed.
      if (_displayedNotifications.includes(id)) {
        return;
      }

      // Display notification using Notifier.
      enqueueSnackbar(message, {
        key: id,
        variant: level,
        ...options,
        anchorOrigin: { vertical: 'bottom', horizontal: 'center' },
        onExited: () => {
          _closeSnackbar(id);
        },
      });

      // Keep track of Snackbars that we've displayed.
      _displayNotification(id);
    });
  }, [notifications, enqueueSnackbar, _closeSnackbar]);
};
