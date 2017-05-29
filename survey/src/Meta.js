import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import style from './Common.css';

const keyDown = (event) => {
  const e = event;
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    e.target.blur();
  }
};

const remoteUrl = 'https://psy2017.herokuapp.com';

class Meta extends Component {

  constructor() {
    super();
    this.state = {
      userId: '',
      sex: '',
      age: 0,
      major: '',
    };

    this.fetchUserId = this.fetchUserId.bind(this);
    this.slotChanged = this.slotChanged.bind(this);
    this.radioClicked = this.radioClicked.bind(this);
    this.submit = this.submit.bind(this);
  }

  componentDidMount() {
    this.fetchUserId();
  }

  fetchUserId() {
    window.fetch(`${remoteUrl}/api/userId`, {
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        token: 'psy2017psy',
        init: true,
      }),
    }).then(res => res.json())
    .then((body) => {
      this.setState({ userId: body.userId });
    })
    .catch((err) => {
      console.error(err);
    });
  }

  slotChanged(event, slot) {
    const e = event;
    if (slot === 'age') {
      if (parseInt(e.target.textContent, 10).toString() !== e.target.textContent) {
        window.alert('請輸入正確的年齡');
      }
      this.setState({ age: e.target.textContent });
    } else if (slot === 'major') {
      this.setState({ major: e.target.textContent });
    }
  }

  radioClicked(event) {
    const e = event;
    this.setState({ sex: e.target.value });
  }

  submit() {
    if (!this.state.age || !this.state.sex) {
      window.alert('請填妥資料！');
      return;
    }
    window.fetch(`${remoteUrl}/api/result`, {
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        userId: this.state.userId,
        sex: this.state.sex,
        age: this.state.age,
        major: this.state.major,
        init: true,
      }),
    }).then((res) => {
      if (res.status >= 300) {
        throw new Error();
      }
      window.location.replace(`/readme/${this.state.userId}`);
    }).catch(err => console.error(err));
  }

  render() {
    return (
      <div>
        <h3>首先，請您先填寫基本資料</h3>
        <div className={style.meta}>
          <div className={style.metaChild}>性別：</div>
          <div className={style.metaChild}>
            <div className={style.input}>
              <label htmlFor="m">男</label>
              <input type="radio" name="sex" id="m" value="m" onClick={e => this.radioClicked(e)} />
            </div>
            <div className={style.input}>
              <label htmlFor="f">女</label>
              <input type="radio" name="sex" id="f" value="f" onClick={e => this.radioClicked(e)} />
            </div>
          </div>
        </div>
        <div className={style.meta}>
          <div className={style.metaChild}>年齡：</div>
          <div className={`${style.metaChild} ${style.editable}`} contentEditable suppressContentEditableWarning onBlur={e => this.slotChanged(e, 'age')} onKeyDown={e => keyDown(e)} />
        </div>
        <div className={style.meta}>
          <div className={style.metaChild}>系級：(若無則填無)</div>
          <div className={`${style.metaChild} ${style.editable}`} contentEditable suppressContentEditableWarning onBlur={e => this.slotChanged(e, 'major')} onKeyDown={e => keyDown(e)} />
        </div>
        <div className={style.button} onClick={this.submit}>下一頁</div>
      </div>
    );
  }
}

export default Meta;
