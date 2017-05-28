import React from 'react';
import PropTypes from 'prop-types';
import InputAreaContainer from './InputAreaContainer';
import styles from './Comment.css';

const Comment = props => (
  <div className={`${styles.comment} ${props.obj.parentId === 'root' ? '' : styles.childComment} ${props.collapsed ? styles.collapsed : ''}`}>
    <div className={styles.commentInner}>
      <div className={`${styles.inline} ${styles.upDown}`}>
        <i className={`${styles.fa} fa fa-arrow-up`} aria-hidden="true" />
        <i className={`${styles.fa} fa fa-arrow-down`} aria-hidden="true" />
      </div>
      <div className={styles.inline}>
        <div className={`${styles.parallelBlock} ${styles.header}`}>
          <div className={styles.parallelBlock}>
            <a className={`${styles.collapseButton} ${styles.aButton}`} onClick={() => props.collapseClick()}>{props.collapsed ? '[+]' : '[–]'}</a>
            <a className={`${styles.id} ${styles.aButton}`}>{props.obj.author}</a>
          </div>
          <div className={styles.parallelBlock}>
            <div className={styles.commentMeta}>1 point</div>
            <div
              className={styles.commentMeta}
              title={new Date(props.obj.timestamp).toLocaleString()}
            >{props.timeString}</div>
            <div className={`${styles.commentMeta} ${styles.childCount}`}>
              ({props.obj.child.length} child{props.obj.child.length > 1 ? 'ren' : ''})
            </div>
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.commentBody}>{props.obj.body}</div>
          <div className={`${styles.parallelBlock}`}>
            <a className={`${styles.textButton} ${styles.aButton}`} href={`/${props.obj.timestamp}`}>permalink</a>
            <a className={`${styles.textButton} ${styles.aButton}`}>embed</a>
            <a className={`${styles.textButton} ${styles.aButton}`}>save</a>
            <a className={`${styles.textButton} ${styles.aButton}`}>parent</a>
            <a className={`${styles.textButton} ${styles.aButton}`}>report</a>
            <a className={`${styles.textButton} ${styles.aButton} ${styles.gold}`} onClick={() => window.alert('Giving gold to ChangHC...')}>give gold</a>
            <a className={`${styles.textButton} ${styles.aButton}`} onClick={props.replyClick}>{props.display ? 'cancel' : 'reply'}</a>
          </div>
          {props.display
            ? <InputAreaContainer
              parentId={props.obj.id}
              author={props.author}
              reload={props.reload}
            />
            : null }
        </div>
      </div>
      <div className={styles.content}>
        {props.obj.child.map(props.renderComment)}
      </div>
    </div>
  </div>
);

const commentType = {
  id: PropTypes.string,
  timestamp: PropTypes.number,
  author: PropTypes.string,
  body: PropTypes.string,
};

commentType.child = PropTypes.arrayOf(PropTypes.shape(commentType)).isRequired;

Comment.propTypes = {
  renderComment: PropTypes.func.isRequired,
  obj: PropTypes.shape(commentType).isRequired,
  timeString: PropTypes.string.isRequired,
  replyClick: PropTypes.func.isRequired,
  display: PropTypes.bool.isRequired,
  reload: PropTypes.func.isRequired,
  author: PropTypes.string.isRequired,
  collapsed: PropTypes.bool.isRequired,
  collapseClick: PropTypes.func.isRequired,
};

export { Comment, commentType };
