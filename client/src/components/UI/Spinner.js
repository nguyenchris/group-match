import React from 'react';
import './Spinner.css';
import { ReactComponent as Loader } from '../../assets/img/oval.svg';
const Spinner = () => {
  return (
    // <div className="svg">
    <React.Fragment>
      <Loader className="loader" />
    </React.Fragment>
    // </div>
  );
};

export default Spinner;
