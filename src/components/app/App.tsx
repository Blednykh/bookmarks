import * as React from 'react';
import './App.css';
import AddForm from "../add-form/AddForm";

class App extends React.Component {

  public render() {
    return (
        <div className="App">
          BOOKMARKS
          <AddForm/>
        </div>
    );
  }
}


export default App;
