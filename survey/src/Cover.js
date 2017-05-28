import React from 'react';
import { Link } from 'react-router-dom';
import style from './Common.css';

const Cover = () => (
  <div>
    <h1>心理與神經資訊學 期末專題問卷</h1>
    <p>
      您好，我們是這學期修習心理與神經資訊學的學生，正在進行<b>室內設計</b>相關的研究。問卷填寫時間約為三分鐘，希望您能撥空填寫。
    </p>
    <Link to="/readme" replace><div className={style.button}>下一頁</div></Link>
  </div>
);

export default Cover;
