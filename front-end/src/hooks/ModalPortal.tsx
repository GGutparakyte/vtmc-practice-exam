import * as React from 'react';
import * as ReactDOM from 'react-dom';

const ModalPortal = ({
  children,
  close,
  additionalProps,
}: {
  children: React.ReactChild;
  close: () => void;
  disableEscapeKey?: boolean;
  additionalProps?: Record<any, any>;
}) => {
  return ReactDOM.createPortal(
    React.cloneElement(children as React.ReactElement, {
      ...additionalProps,
      close,
    }),
    document.body,
  );
};

export default ModalPortal;
