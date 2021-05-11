import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class New extends Component {
  state = {
    name: "",
    content: "",
  };

  handleChangeName = (event) => {
    this.setState({
      name: event.target.value,
    });
  };

  handleChangeContent = (event) => {
    this.setState({
      content: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.onCreateNote(this.state.name, this.state.content);
    this.props.history.push("/");
  };

  render() {
    const { name, content } = this.state;

    return (
      <div>
        <h2 className="mt-3">New Note</h2>
        <form onSubmit={this.handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              placeholder="Enter name..."
              className="form-control"
              id="name"
              required
              value={name}
              onChange={this.handleChangeName}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="content" className="form-label">
              Content
            </label>
            <textarea
              id="content"
              className="form-control"
              placeholder="Enter note..."
              required
              rows="4"
              value={content}
              onChange={this.handleChangeContent}
            />
          </div>

          <button type="submit" className="btn btn-secondary">
            Create Note
          </button>
        </form>
      </div>
    );
  }
}

export default withRouter(New);
