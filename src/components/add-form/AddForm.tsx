import * as React from 'react';
import './AddForm.css';
import {connect} from "react-redux";
import {addBookmark} from "../../store/actions/bookmarksActions";

interface IProps {
    addBookmark: any,
    bookmarks: []
}
interface IState {
    url: string,
    description: string
}

class AddForm extends React.Component <IProps,IState> {

    public render() {
        return (
            <div className = "addBookmarks">
                <div className="addUrl">
                    <span>URL</span>
                    <input className="url-input" type="text" placeholder="Select URL your bookmarks"
                           onChange={this.urlInputChange}/>
                </div>
                <div className="addTitle">
                    <span>Title</span>
                    <input className="description-input" type="text" placeholder="Select description for your bookmarks"
                           onChange={this.descriptionInputChange}/>
                </div>
                <div className="addTags">
                </div>
                <button className="addButton" onClick = {this.handleClick}>+</button>
            </div>
        )
    }

    private urlInputChange = (e: any) => {
        this.setState({
            url: e.target.value,
        });
    };

    private descriptionInputChange = (e: any) => {
        this.setState({
            description: e.target.value,
        });
    };

    private handleClick = () => {
        this.props.addBookmark({
            url: this.state.url,
            description: this.state.description
        });
    };

}

const mapStateToProps = (state: any) => ({
    bookmarks: state,
});



const mapActionsToProps = {
    addBookmark: addBookmark
};
export default connect(mapStateToProps,mapActionsToProps)(AddForm);


