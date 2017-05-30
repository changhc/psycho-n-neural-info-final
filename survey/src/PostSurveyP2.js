import React, { Component } from 'react';
import style from './Common.css';
import p2style from './SurveyP2.css';

const remoteUrl = 'https://psy2017.herokuapp.com';
class PostSurveyP2 extends Component {
  constructor() {
    super();
    this.submit = this.submit.bind(this);
    this.radioClicked = this.radioClicked.bind(this);
  }

  radioClicked(event) {
    const e = event;
    this.setState({ option: e.target.value });
  }

  submit() {
    if (this.state.option === undefined) {
      window.alert('請填妥資料！');
      return;
    }
    this.props.report('option', this.state.option);
    this.props.history.replace(`${this.props.url}/3`);
  }

  render() {
    return (
      <div>
        <p>請選出剛才看到的廣告內容：</p>
        <div className={p2style.imageArea}>
          {this.props.image.map((item, index) => (
            <div className={p2style.item} key={`${index * 2}`}>
              <div className={p2style.image} id={index}>
                <img src={`${remoteUrl}${item}`} alt="" />
                <input type="radio" name="option" value={index} onClick={e => this.radioClicked(e)} />
              </div>
            </div>
          ))}
          <div className={p2style.item} key={66}>
            <div className={p2style.image} id={-1}>
              以上皆非
              <input type="radio" name="option" value={-1} onClick={e => this.radioClicked(e)} />
            </div>
          </div>
        </div>
        <div className={style.button} onClick={() => this.submit()}>下一頁</div>
      </div>
    );
  }
}

export default PostSurveyP2;
