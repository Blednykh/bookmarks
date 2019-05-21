import * as React from 'react';
import './App.css';
import AddForm from "../add-form/AddForm";
import BookmarksList from "../bookmarks-list/BookmarksList";

class App extends React.Component {

  public render() {
    return (
        <div className="App">
          <AddForm/>
          <BookmarksList/>
        </div>
    );
  }
}


export default App;
