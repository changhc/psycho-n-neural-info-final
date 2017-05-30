import React from 'react';
import PropTypes from 'prop-types';
import style from './Common.css';
import p2style from './SurveyP2.css';

const remoteUrl = 'https://psy2017.herokuapp.com';

const SurveyP2 = props => (
  <div>
    <h4>接下來，我們希望了解您對於藝術品作為室內裝飾的喜好程度。請依照對以下七樣物品的偏好程度進行排序。點選下方候選區的圖片即可排序，若要更改某排名的選項，請直接點選該選項以重選。</h4>
    <div>
      {props.order.map((id, index) => (
        <div className={p2style.item} key={`${index * 2}`} onClick={() => props.set(index, id)}>
          <div className={p2style.image} id={index}>
            <img src={id === -1 ? null : `${remoteUrl}${props.image[id]}`} alt="" className={id === -1 ? p2style.hidden : null} />
          </div>
          <div className={`${p2style.index} ${id === -1 ? '' : p2style.filled}`}>排名 {index + 1}</div>
        </div>
      ))}
    </div>
    <div className={p2style.imageArea}>
      {props.image.map((item, index) => (
        <div className={p2style.item} key={`${index * 2}`} onClick={() => props.set(-1, index)}>
          <div className={p2style.image} id={index}>
            <img src={props.selected[index] ? null : `${remoteUrl}${item}`} alt="" className={props.selected[index] ? p2style.hidden : null} />
          </div>
        </div>
      ))}
    </div>
    <div className={style.button} onClick={() => props.next()}>下一頁</div>
  </div>
);

SurveyP2.propTypes = {
  next: PropTypes.func.isRequired,
  set: PropTypes.func.isRequired,
  order: PropTypes.arrayOf(PropTypes.number).isRequired,
  image: PropTypes.arrayOf(PropTypes.string).isRequired,
  selected: PropTypes.arrayOf(PropTypes.bool).isRequired,
};

export default SurveyP2;
