import React, {
  memo,
  useCallback,
  // useContext,
  useRef,
} from 'react';
import {
  // SnackbarKey,
  SnackbarProvider,
} from 'notistack';
// import { ThemeContext } from 'styled-components';
import { FaExclamationCircle } from 'react-icons/fa';

import { MAX_NOTIFICATIONS } from '../../redux/notifications/constants';
import CloseButton from './close-button';
// import useStyles from './styles';

const _iconVariant = {
  info: <FaExclamationCircle className="MuiSvgIcon-root" />,
};

const NotificationProvider = ({ children }) => {
  // const theme = useContext(ThemeContext);
  // const snackbarStyles = useStyles({ theme });
  const _providerRef = useRef(null);

  const _handleCloseAction = useCallback(
    (key) => <CloseButton id={key} onClose={_providerRef.current?.closeSnackbar} />,
    [],
  );

  return (
    <SnackbarProvider
      ref={_providerRef}
      maxSnack={MAX_NOTIFICATIONS}
      // classes={snackbarStyles}
      iconVariant={_iconVariant}
      action={_handleCloseAction}
    >
      {children}
    </SnackbarProvider>
  );
};

export default memo(NotificationProvider);
