import * as React from 'react';
import './AddForm.css';

class AddForm extends React.Component {

    public render() {
        return (
            <div>
                <input className="url-input" type="text" placeholder="Select URL your bookmarks"
                       onChange={this.inputChange}/>
                <button>+</button>
            </div>
        )
    }

    private inputChange = (e: any) => {
    }
}

export default AddForm;
