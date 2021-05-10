import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Index from "./pages/Index";
import New from "./pages/New";
import View from "./pages/View";
import Edit from "./pages/Edit";
import Navbar from "./components/Navbar";

import "./App.css";

let id = 0;
let commentId = 0;

export default class App extends Component {
  state = {
    notes: [],
  };

  handleCreateNote = (name, content) => {
    this.setState(({ notes }) => {
      return {
        notes: [
          {
            id: ++id,
            name,
            content,
            comments: [],
          },
          ...notes,
        ],
      };
    });
  };

  handleCreateComment = (id, author, text) => {
    this.setState(({ notes }) => {
      return {
        notes: notes.map((note) => {
          if (note.id !== id) {
            return note;
          }
          const { comments } = note;
          return {
            ...note,
            comments: [
              {
                id: ++commentId,
                author,
                text,
              },
              ...comments,
            ],
          };
        }),
      };
    });
    console.log(commentId);
  };

  handleUpdateNote = (id, name, content) => {
    this.setState(({ notes }) => {
      return {
        notes: notes.map((note) => {
          if (note.id !== id) {
            return note;
          }
          const { comments } = note;
          return {
            id,
            name,
            content,
            comments,
          };
        }),
      };
    });
  };

  handleDeleteNote = (id) => {
    this.setState(({ notes }) => {
      return {
        notes: notes.filter((note) => note.id !== id),
      };
    });
  };

  handleDeleteComment = (commentId) => {
    this.setState(({ notes }) => {
      return {
        notes: notes.map((note) => {
          if (note.id !== id) {
            return note;
          }
          const { comments } = note;
          return {
            ...note,
            comments: comments.filter((comment) => comment.id !== commentId),
          };
        }),
      };
    });
  };

  render() {
    return (
      <Router>
        <div className="app">
          <Navbar />
          <Switch>
            <Route path="/new">
              <New onCreateNote={this.handleCreateNote} />
            </Route>
            <Route path="/:id/edit">
              <Edit
                notes={this.state.notes}
                onUpdateNote={this.handleUpdateNote}
              />
            </Route>
            <Route path="/:id">
              <View
                notes={this.state.notes}
                onAddComment={this.handleCreateComment}
                onDeleteComment={this.handleDeleteComment}
              />
            </Route>
            <Route path="/">
              <Index
                notes={this.state.notes}
                onDeleteNote={this.handleDeleteNote}
              />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}
