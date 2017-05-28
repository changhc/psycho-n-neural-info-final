import React, { Component } from 'react';
import style from './Common.css';

class Reminder extends Component {
  fetchUserId() {
    return window.fetch('http://localhost:5000/api/userId', {
      method: 'GET',
      mode: 'cors',
      headers: { Accept: 'application/json' },
    })
    .then(res => res.json());
  }

  next() {
    this.fetchUserId()
    .then((obj) => {
      window.location.href = `./survey/${obj.userId}`;
    })
    .catch((err) => {
      console.error(err);
    });
  }

  render() {
    return (
      <div>
        <h2>問卷說明</h2>
        <p>
          接下來您將會被導向一篇出自內容農場的文章。請您閱讀之後跟隨指示操作與回答問題。
        </p>
        <div className={style.button} onClick={() => this.next()}>前往文章</div>
      </div>
    );
  }
}

export default Reminder;
