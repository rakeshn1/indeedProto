import React, { useCallback } from 'react';

import { CloseButtonIcon } from './close-button-styles';

const isFunction = (arg) => typeof arg === 'function';

const CloseButton = ({ id, onClose }) => {
  const _handleClick = useCallback(() => {
    if (onClose && isFunction(onClose)) {
      onClose(id);
    }
  }, [id, onClose]);

  return <CloseButtonIcon className="MuiSvgIcon-root" onClick={_handleClick} />;
};

export default CloseButton;
