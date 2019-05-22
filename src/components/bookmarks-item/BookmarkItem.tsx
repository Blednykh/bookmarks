import * as React from 'react';
import './BookmarksItem.css';
import {connect} from "react-redux";
import {bookmark} from "../../model/bookmark";
import {
    deleteBookmark,
    editBookmarks
} from "../../store/actions/bookmarksActions";
import {deleteTag,addTag}  from "../../store/actions/tagsActions";
import {tag} from "../../model/tag";

interface IProps {
    bookmarks: bookmark[]
    deleteBookmark: any,
    editBookmarks: any,
    deleteTag: any,
    addTag: any,
    tags: tag[],
    currentBookmark: bookmark,
    currentIndex: number
}

interface IState {
    visibility: boolean,
    tag: string,
    index: number
}

class BookmarksItem extends React.Component <IProps, IState> {

    state = {
        visibility: false,
        tag: '',
        index: 0
    };


    private editBookmark = () => {
        this.setState({
            visibility: !this.state.visibility,
        });
    };

    private deleteBookmark = () => {

        const {currentBookmark, deleteBookmark, currentIndex} = this.props;

        currentBookmark.tags.forEach((curTag: tag) => {
            this.deleteTagClick(curTag)();
        });
        deleteBookmark(currentIndex);
    };

    private urlChange = (e: any) => {

        const {bookmarks, editBookmarks, currentIndex} = this.props;

        bookmarks[currentIndex].url = e.target.value;
        editBookmarks(bookmarks);
    };

    private titleChange = (e: any) => {

        const {bookmarks, editBookmarks, currentIndex} = this.props;

        bookmarks[currentIndex].title = e.target.value;
        editBookmarks(bookmarks);
    };

    private setTagList = () => {
        return this.props.currentBookmark.tags.map((item: tag) => {
            return (
                <div className="tagItem" style={{borderColor: item.color}} key={item.color}>
                    {item.title}
                    <button
                        className="deleteTagButton"
                        onClick={this.deleteTagClick(item)}
                    >x
                    </button>
                </div>
            );
        });
    };

    private deleteTagClick = (deletedTag: tag) => () => {

        const {bookmarks, currentBookmark, editBookmarks, deleteTag, currentIndex} = this.props;

        let currentTags: tag[] = currentBookmark.tags.filter((item: tag) => {
            return item.title !== deletedTag.title
        });

        bookmarks[currentIndex].tags = currentTags;

        let tagIndex: number = 0;

        if (this.props.tags.some((item: tag, index: number) => {
            tagIndex = index;
            return item.title === deletedTag.title
        })) {
            deleteTag(tagIndex);
        }

        editBookmarks(bookmarks);
    };

    private tagInputChange = (e: any) => {
        this.setState({
            tag: e.target.value,
        });
    };

    private setTagColor = () =>{

        const r: number = Math.floor(Math.random() * (256));
        const g: number = Math.floor(Math.random() * (256));
        const b: number = Math.floor(Math.random() * (256));

        return '#' + r.toString(16) + g.toString(16) + b.toString(16);
    };

    private addTagClick = () => {

        const {bookmarks, editBookmarks, addTag, currentIndex} = this.props;

        const {tag} = this.state;

        let currentTags: tag[] = this.props.currentBookmark.tags;

        if (!currentTags.some((item: tag) => {
            return item.title === tag
        })) {
            const newTag: tag = {
                title: tag,
                color: this.setTagColor(),
                count: 1
            };
            addTag([newTag]);
            currentTags.push(newTag);
        }

        this.setState({
            tag: ''
        });

        bookmarks[currentIndex].tags = currentTags;
        editBookmarks(bookmarks);
    };

    private goTo = () => {
        window.open(this.props.currentBookmark.url);
    };


    public render() {
        const {currentBookmark} = this.props;
        return (
            <div className="bookmarkInfo">
                <div className="bookmarkContent">
                    <div className="infoBar">
                        <div onClick={this.goTo}>
                            <div className="bookmarkTitle" title={currentBookmark.url}>
                                {currentBookmark.title}
                            </div>
                        </div>
                        <div className="bookmarkDate">
                            {currentBookmark.date.toString()}
                        </div>
                    </div>
                    <div className="buttonBar">
                        <button className="editButton" onClick={this.editBookmark}>edit</button>
                        <button className="deleteButton" onClick={this.deleteBookmark}>delete</button>
                    </div>
                </div>
                <div className="tagsBar">
                    <div className="addTags" style={{display: this.state.visibility ? 'inherit' : 'none'}}>
                        <input
                            className="tag-input"
                            type="text" placeholder="Add tag..."
                            onChange={this.tagInputChange}
                            value={this.state.tag}/>
                        <button className="addTagButton" onClick={this.addTagClick}>+</button>
                    </div>
                    {this.setTagList()}
                </div>
                <div className="editBookmark" style={{visibility: this.state.visibility ? 'visible' : 'hidden'}}>
                    <div className="editUrl">
                        <span>URL</span>
                        <input
                            className="url-edit-input"
                            type="text"
                            placeholder="Select URL your bookmarks"
                            value={currentBookmark.url}
                            onChange={this.urlChange}
                        />
                    </div>
                    <div className="editTitle">
                        <span>Title</span>
                        <input
                            className="title-edit-input"
                            type="text"
                            placeholder="Select title for your bookmarks"
                            value={currentBookmark.title}
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
    editBookmarks: editBookmarks,
    addTag: addTag,
    deleteTag: deleteTag
};

export default connect(mapStateToProps, mapActionsToProps)(BookmarksItem);


