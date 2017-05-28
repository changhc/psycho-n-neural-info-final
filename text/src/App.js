import React, { Component } from 'react';
import CommentContainer from './CommentContainer';
import InputAreaContainer from './InputAreaContainer';
import styles from './App.css';

const keyDown = (event) => {
  const e = event;
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    e.target.blur();
  }
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      author: 'Anonymous',
      comments: [],
    };
    this.renderComment = this.renderComment.bind(this);
    this.fetchComments = this.fetchComments.bind(this);
  }

  componentDidMount() {
    this.fetchComments();
  }

  fetchComments() {
    window.fetch('/api/comments', {
      method: 'GET',
      mode: 'cors',
      headers: { Accept: 'application/json' },
    }).then(res => res.json(),
    ).then((body) => {
      this.setState({ comments: body.child });
    }).catch((err) => {
      console.error(err);
    });
  }

  renderComment(commentObj) {
    return (
      <CommentContainer
        key={`${commentObj.timestamp}`}
        obj={commentObj}
        author={this.state.author}
        renderComment={this.renderComment}
        reload={this.fetchComments}
      />
    );
  }

  render() {
    return (
      <div>
        <div className={styles.header}>
          <h3 className={styles.title}>
            Say something about Ric&apos;s web programming seminar.
          </h3>
          <div className={styles.parallelBlock}>
            <div>Posting as</div>
            <div
              className={styles.author}
              contentEditable
              suppressContentEditableWarning
              onKeyDown={keyDown}
              onBlur={event => this.setState({ author: event.target.textContent })}
            >{this.state.author}</div>
          </div>
          <InputAreaContainer
            id={`${this.state.comments.length}`}
            parentId="root"
            author={this.state.author}
            reload={this.fetchComments}
          />
        </div>
        {this.state.comments.map(this.renderComment)}
      </div>
    );
  }
}

export default App;
