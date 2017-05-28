import React from 'react';
import PropTypes from 'prop-types';
import style from './SurveyP1Entry.css';

const SurveyP1Entry = props => (
  <div className={style.entry}>
    <div className={style.number}>
      {props.id === -1 ? '' : props.id + 1}
    </div>
    <div className={style.content}>
      <div className={`${style.inner} ${props.id === -1 ? style.horizontal : ''} `}>
        {props.content}
      </div>
    </div>
    <div className={style.selection}>
      <div className={style.inner}>
        { props.id === -1
            ? [...Array(7)].map((x, index) =>
              <div className={style.radioButton} key={`${index * 2}`}>{index}</div>)
            : [...Array(7)].map((x, index) =>
              <input type="radio" name={props.id} className={style.radioButton} key={`${index * 2}`} onClick={() => props.click(props.id, index)} />)
        }
      </div>
    </div>
  </div>
);

SurveyP1Entry.propTypes = {
  content: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};

export default SurveyP1Entry;
