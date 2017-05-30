import React from 'react';
import style from './Common.css';

const PostSurveyP3 = props => (
  <div>
    <div className={style.meta}>
      <div className={style.meta}>請問這是否有影響您排序的決定？</div>
      <div className={style.meta}>
        <div className={style.input}>
          <label htmlFor="forward">是，有刻意往前排</label>
          <input type="radio" name="order" id="forward" value={1} onClick={e => props.radioClicked(e)} />
        </div>
        <div className={style.input}>
          <label htmlFor="no">沒有影響</label>
          <input type="radio" name="order" id="no" value={0} onClick={e => props.radioClicked(e)} />
        </div>
        <div className={style.input}>
          <label htmlFor="backward">是，有刻意往後排</label>
          <input type="radio" name="order" id="back" value={-1} onClick={e => props.radioClicked(e)} />
        </div>
      </div>
    </div>
    <div className={style.button} onClick={() => props.submit()}>下一頁</div>
  </div>
);

export default PostSurveyP3;
