import React from 'react';
import PropTypes from 'prop-types';
import style from './Ad.css';

const Sidebar = props => (
  <div className={style.sidebar}>
    <img src={props.adUrl} alt="" />
  </div>
);

Sidebar.propTypes = {
  adUrl: PropTypes.string.isRequired,
};

export default Sidebar;
