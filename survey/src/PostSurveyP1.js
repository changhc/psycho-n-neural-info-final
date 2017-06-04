import React, { Component } from 'react';
import style from './Common.css';

const remoteUrl = 'https://psy2017.herokuapp.com';

class PostSurveyP1 extends Component {
  constructor() {
    super();
    this.submit = this.submit.bind(this);
    this.radioClicked = this.radioClicked.bind(this);
  }

  radioClicked(event) {
    const e = event;
    this.setState({ remember: e.target.value });
  }

  submit() {
    if (!this.state.remember) {
      window.alert('請選擇答案！');
      return;
    }
    if (this.state.remember === 'f') {
      window.fetch(`${remoteUrl}/api/result`, {
        method: 'POST',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          userId: this.props.userId,
          remember: this.state.remember,
        }),
      }).then((res) => {
        if (res.status >= 300) {
          throw new Error();
        }
        window.location.replace('/thanks');
      }).catch(err => console.error(err));
    } else {
      this.props.report('remember', this.state.remember);
      this.props.history.replace(`${this.props.url}/2`);
    }
  }
  render() {
    return (
      <div>
        <div className={style.meta}>
          <div className={style.meta}>請問您是否記得剛才看到的廣告內容？</div>
          <div className={style.meta}>
            <div className={style.input}>
              <label htmlFor="t">是</label>
              <input type="radio" name="remember" id="t" value="t" onClick={e => this.radioClicked(e)} />
            </div>
            <div className={style.input}>
              <label htmlFor="f">否</label>
              <input type="radio" name="remember" id="f" value="f" onClick={e => this.radioClicked(e)} />
            </div>
          </div>
        </div>
        <div className={style.button} onClick={() => this.submit()}>下一頁</div>
      </div>
    );
  }
}

export default PostSurveyP1;
