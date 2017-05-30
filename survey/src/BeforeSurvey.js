import React from 'react';

import style from './Common.css';

const BeforeSurvey = (props) => {
  const remoteUrl = 'https://psy2017.herokuapp.com';
  const start = Date.now();
  const next = () => {
    window.fetch(`${remoteUrl}/api/result`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        userId: props.match.params.userId,
        readTime: Date.now() - start,
      }),
    }).then((res) => {
      if (res.status >= 300) {
        throw new Error();
      }
      window.location.replace(`/survey/${props.match.params.userId}`);
    }).catch(err => console.error(err));
  };

  return (
    <div>
      <p>
        讀完文章後，請按下方按鈕繼續。
      </p>
      <div
        className={style.button}
        onClick={() => next()}
      >我讀完了</div>
    </div>
  );
};

export default BeforeSurvey;
