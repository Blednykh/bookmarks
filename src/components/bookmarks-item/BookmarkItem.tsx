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
    currentBookmark: bookmark
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
       /* window.open(this.props.currentBookmark.url);*/
        this.setState({
            visibility: !this.state.visibility,
        });
    };

    private deleteBookmark = () => {
        this.props.bookmarks.forEach((item: bookmark, index: number) => {
            if (item.id === this.props.currentBookmark.id) {
                this.props.deleteBookmark({
                    index: index
                });
            }
        });
    };

    private urlChange = (e: any) => {

        let newBookmarks = this.props.bookmarks;

        newBookmarks.forEach((item: bookmark, index: number) => {
            if (item.id === this.props.currentBookmark.id) {
                newBookmarks[index].url = e.target.value;
            }
        });
        this.props.editBookmarks(newBookmarks);
    };

    private titleChange = (e: any) => {

        let newBookmarks = this.props.bookmarks;

        newBookmarks.forEach((item: bookmark, index: number) => {
            if (item.id === this.props.currentBookmark.id) {
                newBookmarks[index].title = e.target.value;
            }
        });
        this.props.editBookmarks(newBookmarks);
    };

    private setTagList = () => {
        return this.props.currentBookmark.tags.map((item: tag) => {
            return (
                <div className="tagItem"  style={{borderColor: item.color}}>
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
        console.log(deletedTag);
        let newBookmarks = this.props.bookmarks;
        let currentTags: tag[] = this.props.currentBookmark.tags.filter((item: tag) => {
            return item.title !== deletedTag.title
        });

        newBookmarks.forEach((item: bookmark, index: number) => {
            if (item.id === this.props.currentBookmark.id) {
                newBookmarks[index].tags = currentTags;
            }
        });

        let tagIndex: number = 0;

        if (this.props.tags.some((item: tag, index: number) => {
            console.log(item,tagIndex);
            tagIndex = index;
            return item.title === deletedTag.title
        })) {
            console.log(tagIndex);
           this.props.deleteTag(tagIndex);
        }



        this.props.editBookmarks(newBookmarks);
    };

    private tagInputChange = (e: any) => {
        this.setState({
            tag: e.target.value,
        });
    };

    private setTagColor = (title: string) =>{
        const r: number = Math.floor(Math.random() * (256));
        const g: number = Math.floor(Math.random() * (256));
        const b: number = Math.floor(Math.random() * (256));
        return '#' + r.toString(16) + g.toString(16) + b.toString(16);
    };

    private addTagClick = () => {
        let newBookmarks = this.props.bookmarks;
        let currentTags: tag[] = this.props.currentBookmark.tags;

        if (!currentTags.some((item: tag) => {
            return item.title === this.state.tag
        })) {
            const newTag: tag = {
                title: this.state.tag,
                color: this.setTagColor(this.state.tag),
                count: 1
            };
            this.props.addTag([newTag]);
            currentTags.push(newTag);
        }

        this.setState({
            tag: ''
        });

        newBookmarks.forEach((item: bookmark, index: number) => {
            if (item.id === this.props.currentBookmark.id) {
                newBookmarks[index].tags = currentTags;
            }
        });

        this.props.editBookmarks(newBookmarks);
    };


    public render() {
        const {currentBookmark} = this.props;
        return (
            <div className="bookmarkInfo">
                <div className="bookmarkContent">
                    <div className="infoBar">
                        <a href={currentBookmark.url}>
                            <div className="bookmarkTitle" title={currentBookmark.url}>
                                {currentBookmark.title}
                            </div>
                        </a>
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


