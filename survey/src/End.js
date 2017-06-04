import React from 'react';
import style from './Common.css';

const lotteryLink = 'https://docs.google.com/forms/d/e/1FAIpQLSdkVCMFIY_3lG-_s5AJGffaAJkkTA62h1ZkigF6BCT2uuqHgw/viewform';

const End = () => (
  <div>
    <h4>
      問卷已完成，感謝您耐心填寫！
    </h4>
    <div className={style.button} onClick={() => window.location.replace(lotteryLink)}>抽獎囉~</div>
  </div>
);

export default End;
