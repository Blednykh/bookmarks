import * as React from 'react';
import './BookmarksItem.css';
import {connect} from "react-redux";
import {deleteBookmark, editBookmark, editBookmarks} from "../../store/actions/bookmarksActions";


interface IProps {
    id: number,
    index: number,
    bookmarks: any
    deleteBookmark: any,
    editBookmark: any,
    editBookmarks: any
}
interface IState {
    inputDisabled: boolean,
}




class BookmarksItem extends React.Component <IProps,IState> {

    state = {
        inputDisabled: true
    };


    private editBookmark = () => {
        this.setState({
            inputDisabled: !this.state.inputDisabled,
        });
    };

    private deleteBookmark = () => {
        this.props.deleteBookmark({
            index: this.props.index
        });
    };

    private urlChange = (e: any) => {
        let newBookmarks = this.props.bookmarks;
        newBookmarks[this.props.index].url = e.target.value;
        newBookmarks[0].url = 'govno';
        this.props.editBookmarks(newBookmarks);
    };

    private titleChange = (e: any) => {
        let newBookmarks = this.props.bookmarks;
        newBookmarks[this.props.index].title = e.target.value;
        this.props.editBookmarks(newBookmarks);
    };

    public render() {
        return (
            <div className="bookmarkInfo">
                <div className="infoBar">
                    <a href={this.props.bookmarks[this.props.index].url}>
                        <div className="bookmarkTitle" title={this.props.bookmarks[this.props.index].url}>
                            {this.props.bookmarks[this.props.index].title}
                        </div>
                    </a>
                    <div className="bookmarkDate">
                        11/02/2019 22:30
                    </div>
                </div>
                <div className="buttonBar">
                    <button className="editButton" onClick={this.editBookmark}>edit</button>
                    <button className="deleteButton" onClick={this.deleteBookmark}>delete</button>
                </div>
            </div>


            /*<a href={this.props.bookmarks[this.props.index].url}>
                {console.log(this.props.bookmarks)}
                <input placeholder={this.props.bookmarks[this.props.index].description} disabled={this.state.inputDisabled} onChange={this.descriptionChange}/>
                <input placeholder={this.props.bookmarks[this.props.index].url} disabled={this.state.inputDisabled} onChange={this.urlChange}/>
                <button onClick={this.editBookmark}>edit</button>
                <button onClick={this.deleteBookmark}>delete</button>
            </a>*/
        )
    }
}

const mapStateToProps = (state: any) => ({
    bookmarks: state.bookmarks.bookmarks,
});

const mapActionsToProps = {
    deleteBookmark: deleteBookmark,
    editBookmark: editBookmark,
    editBookmarks: editBookmarks
};

export default connect(mapStateToProps,mapActionsToProps)(BookmarksItem);


