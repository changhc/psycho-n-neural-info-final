import React from 'react';
import PropTypes from 'prop-types';
import styles from './InputArea.css';

const InputArea = (props) => {
  let textarea = null;
  return (
    <div className={styles.inputArea}>
      <div>
        <textarea
          rows="5"
          cols="60"
          placeholder="Your comments..."
          ref={(element) => { textarea = element; }}
          onChange={event => props.bodyChanged(event.target.value, 'body')}
        />
      </div>
      <button
        className={styles.button}
        onClick={() => { textarea.value = ''; props.submit(); }}
      >Submit</button>
    </div>
  );
};

InputArea.propTypes = {
  submit: PropTypes.func.isRequired,
  bodyChanged: PropTypes.func.isRequired,
};

export default InputArea;
