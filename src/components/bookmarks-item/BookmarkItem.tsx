import * as React from 'react';
import './BookmarksItem.css';
import {connect} from "react-redux";
import {deleteBookmark, editBookmark, editBookmarks} from "../../store/actions/bookmarksActions";
import {CSSProperties} from "react";


interface IProps {
    id: number,
    index: number,
    bookmarks: any
    deleteBookmark: any,
    editBookmark: any,
    editBookmarks: any,
    tags: string[]
}
interface IState {
    visibility: boolean,
    tag: string
}




class BookmarksItem extends React.Component <IProps,IState> {
    state = {
        visibility: false,
        tag: ''
    };


    private editBookmark = () => {
        this.setState({
            visibility: !this.state.visibility,
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
        this.props.editBookmarks(newBookmarks);
    };

    private titleChange = (e: any) => {
        let newBookmarks = this.props.bookmarks;
        newBookmarks[this.props.index].title = e.target.value;
        this.props.editBookmarks(newBookmarks);
    };

    public setTagList = () => {
        return this.props.bookmarks[this.props.index].tags.map((item: string, index: number) => {
            return (
                <div className="tagItem">
                    {item}
                    <button className="deleteTagButton" onClick = {this.deleteTagClick(item)}>x</button>
                </div>
            );
        });
    };

    private deleteTagClick = (index: string) => ()=> {
        let newBookmarks = this.props.bookmarks;
        let currentTags: string[] = this.props.bookmarks[this.props.index].tags.filter((item:string)=>{return item!==index});

        newBookmarks[this.props.index].tags = currentTags;
        this.props.editBookmarks(newBookmarks);
    };

    private tagInputChange = (e: any) => {
        this.setState({
            tag: e.target.value,
        });
    };

    private addTagClick = () => {
        let newBookmarks = this.props.bookmarks;
        let currentTags: string[] = this.props.bookmarks[this.props.index].tags;

        if(!currentTags.some((item:string)=>{return item===this.state.tag})){
            currentTags.push(this.state.tag);
        }

        this.setState({
            tag: ''
        });

        newBookmarks[this.props.index].tags = currentTags;
        this.props.editBookmarks(newBookmarks);
    };

    public render() {
        return (
            <div className="bookmarkInfo">
                <div className="bookmarkContent">
                    <div className="infoBar">
                        <a href={this.props.bookmarks[this.props.index].url}>
                            <div className="bookmarkTitle" title={this.props.bookmarks[this.props.index].url}>
                                {this.props.bookmarks[this.props.index].title}
                            </div>
                        </a>
                        <div className="bookmarkDate">
                            {this.props.bookmarks[this.props.index].date.toString()}
                        </div>
                    </div>
                    <div className="buttonBar">
                        <button className="editButton" onClick={this.editBookmark}>edit</button>
                        <button className="deleteButton" onClick={this.deleteBookmark}>delete</button>
                    </div>
                </div>
                <div className="tagsBar">
                    <div className="addTags" style={{display: this.state.visibility?'inherit':'none'}}>
                        <input
                            className="tag-input"
                            type="text" placeholder="Add tag..."
                            onChange={this.tagInputChange}
                            value={this.state.tag}/>
                        <button className="addTagButton" onClick = {this.addTagClick}>+</button>
                    </div>
                    { this.setTagList() }
                </div>
                <div className="editBookmark" style={{visibility:  this.state.visibility?'visible':'hidden'}}>
                    <div className="editUrl">
                        <span>URL</span>
                        <input
                            className="url-edit-input"
                            type="text"
                            placeholder="Select URL your bookmarks"
                            value={this.props.bookmarks[this.props.index].url}
                            onChange={this.urlChange}
                        />
                    </div>
                    <div className="editTitle">
                        <span>Title</span>
                        <input
                            className="title-edit-input"
                            type="text"
                            placeholder="Select title for your bookmarks"
                            value={this.props.bookmarks[this.props.index].title}
                            onChange={this.titleChange}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state: any) => ({
    bookmarks: state.bookmarks.bookmarks,
    tags: state.tags
});

const mapActionsToProps = {
    deleteBookmark: deleteBookmark,
    editBookmark: editBookmark,
    editBookmarks: editBookmarks
};

export default connect(mapStateToProps,mapActionsToProps)(BookmarksItem);


