import React from 'react';
import style from './Common.css';

const End = () => (
  <div>
    <h4>
      問卷已完成，感謝您耐心填寫！
    </h4>
    <div className={style.button} onClick={() => window.alert('這個按鈕其實沒用。')}>離開</div>
  </div>
);

export default End;
