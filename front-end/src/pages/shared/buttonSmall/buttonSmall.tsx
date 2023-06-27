import React, { FC } from 'react';

import './style.css';

type Props = {
  text: string,
  onClick?: () => void;
  className?: string,
  value?: string
};

const ButtonSmall: FC<Props> = ({ text, onClick }) => {
  return (
    <a href="/#" className="btn btn-small" onClick={onClick}>
      {text}
    </a>
  );
};

export default ButtonSmall;
