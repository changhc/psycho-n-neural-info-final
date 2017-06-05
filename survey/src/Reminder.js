import React from 'react';
import style from './Common.css';

const Reminder = props => (
  <div>
    <h2>問卷說明</h2>
    <p>
      接下來您將會被導向一篇出自內容農場的文章。請您閱讀之後跟隨指示操作與回答問題。
      <strong>文章將會開啟新分頁，可能會有點久，請耐心等候。</strong>
    </p>
    <div
      className={style.button}
      onClick={() => {
        window.open(`https://temp-iylmodqufi.now.sh/${props.match.params.userId}`);
        window.location.replace(`/pre/${props.match.params.userId}`);
      }}
    >前往文章</div>
  </div>
);

export default Reminder;
