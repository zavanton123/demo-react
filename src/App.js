import React from 'react'
import {BrowserRouter as Router, Redirect, Route, Switch,} from 'react-router-dom'

import {Navbar} from './app/Navbar'
import {PostsList} from "./features/posts/PostsList";
import {AddPostForm} from "./features/posts/AppPostForm";

function App() {
  return (
    <Router>
      <Navbar/>
      <div className="App">
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <>
                <AddPostForm />
                <PostsList/>
              </>
            )}
          />
          <Redirect to="/"/>
        </Switch>
      </div>
    </Router>
  );
}

export default App
