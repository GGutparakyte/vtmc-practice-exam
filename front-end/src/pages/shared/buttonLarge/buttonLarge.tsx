import React, { FC } from 'react';

import './style.scss';

type Props = {
  onClick?: () => void;
  className?: string,
  value?: string
  type?: string;
  disabled?: boolean
  children?: string | null;
};

const ButtonLarge: FC<Props> = ({ onClick, children, disabled }) => {
  return (
    <a 
      href="/#" 
      className="btn btn-large" 
      onClick={onClick}
      >
      {children}
    </a>
  );
};

export default ButtonLarge;
