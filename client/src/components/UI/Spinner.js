import React from 'react';
import './Spinner.css';
import { ReactComponent as Loader } from '../../assets/img/oval.svg';
const Spinner = () => {
  return (
    <div className="svg">
    <Loader className="loader" />
    </div>
  );
};

export default Spinner;
