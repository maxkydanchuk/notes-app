import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class Edit extends Component {
  constructor(props) {
    super(props);
    const id = Number(this.props.match.params.id);
    const note = this.props.notes.find((note) => {
      return note.id === id;
    });

    this.state = {
      id,
      name: note.name,
      content: note.content,
    };
  }

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
    this.props.onUpdateNote(this.state.id, this.state.name, this.state.content);
    this.props.history.push(`/${this.state.id}`);
  };

  render() {
    const { content, name } = this.state;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="mt-3 mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              placeholder="Enter name..."
              className="form-control"
              id="name"
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
              value={content}
              onChange={this.handleChangeContent}
            />
          </div>

          <button type="submit" className="btn btn-secondary">
            Update Note
          </button>
        </form>
      </div>
    );
  }
}

export default withRouter(Edit);
