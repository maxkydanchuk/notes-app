import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Index extends Component {
  render() {
    const { onDeleteNote } = this.props;

    return (
      <ul className="list-group mt-3">
        {this.props.notes.map((note) => {
          return (
            <li key={note.id} className="list-group-item"  style={{"wordWrap": 'break-word'}}>
              <Link to={`/${note.id}`}>{note.name}</Link>
              <button
                type="button"
                className="btn btn-outline-danger btn-sm float-right"
                onClick={() => onDeleteNote(note.id)}
              >
                <i className="fa fa-trash-o" />
              </button>
            </li>
          );
        })}
      </ul>
    );
  }
}
