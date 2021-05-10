import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";

import "./View.css";

class View extends Component {
  constructor(props) {
    super(props);
    const id = Number(this.props.match.params.id);

    this.state = {
      id,
      author: "",
      text: "",
      showComment: false,
    };
  }

  handleChangeAuthor = (event) => {
    this.setState({
      author: event.target.value,
    });
  };

  handleChangeContent = (event) => {
    this.setState({
      text: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.onAddComment(this.state.id, this.state.author, this.state.text);
    this.setState({
      author: "",
      text: "",
    });
  };

  toggleShowComment = () => {
    this.setState((state) => {
      return {
        showComment: !state.showComment,
      };
    });
  };

  render() {
    const id = Number(this.props.match.params.id);
    const note = this.props.notes.find((note) => {
      return note.id === id;
    });

    const commentForm = this.state.showComment ? (
      <div>
        <ul className="comments mt-3 pl-0">
          {note.comments.map((comment) => {
            return (
              <li key={comment.id} className="comments-item">
                <div className="comment-item__author">
                  {comment.author}
                  <span className="comments-item__date">
                    {" "}
                    &mdash; {new Date().toLocaleDateString()}{" "}
                  </span>
                  <span
                    className="comments-item__delete float-right"
                    onClick={() => this.props.onDeleteComment(comment.id)}
                  >
                    &times;
                  </span>
                </div>
                <div className="comment-item__text">{comment.text}</div>
              </li>
            );
          })}
        </ul>
        <form onSubmit={this.handleSubmit}>
          <div className="mb-1">
            <input
              type="text"
              placeholder="Enter your name.."
              className="form-control w-50"
              required
              pattern="^[A-Z]\w*\s[A-Z]\w*"
              value={this.state.author}
              onChange={this.handleChangeAuthor}
            />
          </div>
          <div className="mb-1">
            <textarea
              type="text"
              placeholder="Comment..."
              className="form-control w-50"
              rows="2"
              required
              value={this.state.text}
              onChange={this.handleChangeContent}
            />
          </div>
          <button
            type="submit"
            className="btn btn-outline-secondary"
            data-toggle="button"
            aria-pressed="false"
          >
            {" "}
            Add Comment
          </button>
        </form>
      </div>
    ) : null;

    return (
      <div>
        <Link to={`/${note.id}/edit`}>
          <button type="button" className="btn btn-secondary mt-2">
            Edit
          </button>
        </Link>
        <div className="note mt-3">
          <h4 className="note__header">{note.name}</h4>
          <p className="note__content"> {note.content}</p>
        </div>
        <button
          type="button"
          className="btn btn-secondary btn-sm mt-3"
          onClick={this.toggleShowComment}
        >
          Comments
        </button>
        <br />
        {commentForm}
      </div>
    );
  }
}

export default withRouter(View);
