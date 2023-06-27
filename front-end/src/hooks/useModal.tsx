import React from 'react';

import ModalPortal from './ModalPortal';

type Props = {
  onCancel?: () => void;
};

type Result<T> = [({ children }: { children: React.ReactChild }) => JSX.Element, (addProps?: T) => void, () => void];

// component is written with function instead of arrow function because TypeScript does not understand abstraction.
function useModal<T extends Record<any, any> | undefined>({ onCancel = () => {} }: Props): Result<T> {
  const [isOpen, setIsOpen] = React.useState(false);
  const [additionalProps, setAdditionalProps] = React.useState<T>();

  const handleCloseModal = () => {
    setIsOpen(false);
    if (onCancel) {
      onCancel();
    }
  };

  const handleOpenModal = (addProps?: T) => {
    if (addProps) {
      setAdditionalProps(addProps);
    }

    setIsOpen(true);
  };

  const Modal = ({ children }: { children: React.ReactChild }): JSX.Element => (
        <>
            {isOpen && (
                <ModalPortal additionalProps={additionalProps} close={handleCloseModal}>
                    {children}
                </ModalPortal>
            )}
        </>
  );

  return [
    Modal,
    handleOpenModal,
    () => {
      setIsOpen(false);
    },
  ];
}

export default useModal;
