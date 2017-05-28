import React from 'react';
import PropTypes from 'prop-types';
import style from './Ad.css';

const Popup = props => (
  <div className={style.popup}>
    <div className={style.innerBox}>
      <img src={props.adUrl} alt="" className={style.img} />
      <div className={style.button} onClick={() => props.close()}>
        <img src={props.xUrl} alt="" className={style.x} />
      </div>
    </div>
  </div>
);

Popup.propTypes = {
  adUrl: PropTypes.string.isRequired,
  xUrl: PropTypes.string.isRequired,
  close: PropTypes.func.isRequired,
};

export default Popup;
