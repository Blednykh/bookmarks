import * as React from 'react';
import './AddForm.css';
import {connect} from "react-redux";
import {addBookmark, editBookmarks} from "../../store/actions/bookmarksActions";
import {addTag} from "../../store/actions/tagsActions"
import {bookmark} from "../../model/bookmark";
import {tag} from "../../model/tag"

interface IProps {
    editBookmarks: any,
    addBookmark: any,
    addTag: any,
    tags: tag[],
    bookmarks: bookmark[]
}

interface IState {
    url: string,
    title: string,
    tag: string,
    currentTags: tag[],
    id: number
}

class AddForm extends React.Component <IProps, IState> {

    state = {
        tag: '',
        url: '',
        title: '',
        currentTags: [],
        id: 0
    };

    componentWillMount = () => {

        let bookmarks = localStorage.getItem('bookmarks');

        let tags = localStorage.getItem('tags');

        let id = localStorage.getItem('id');

        if (bookmarks !== null && tags !== null && id !== null) {
            this.props.editBookmarks(JSON.parse(bookmarks));
            this.props.addTag(JSON.parse(tags));
            this.setState({id: JSON.parse(id)})
        }

    };

    componentDidUpdate = () => {
        localStorage.setItem('bookmarks', JSON.stringify(this.props.bookmarks));
        localStorage.setItem('tags', JSON.stringify(this.props.tags));
        localStorage.setItem('id', JSON.stringify(this.state.id));
    };

    private setTagList = () => {
        return this.state.currentTags.map((item: tag, index: number) => {
            return (
                <div className="tagItem" style={{borderColor: item.color}} key={index}>
                    {item.title}
                    <button className="deleteTagButton" onClick={this.deleteTagClick(index)}>x</button>
                </div>
            );
        });
    };

    private tagInputChange = (e: any) => {
        this.setState({
            tag: e.target.value,
        });
    };

    private urlInputChange = (e: any) => {
        this.setState({
            url: e.target.value,
        });
    };

    private titleInputChange = (e: any) => {
        this.setState({
            title: e.target.value,
        });
    };

    private setTagColor = (title: string) =>{

        let tagIndex: number = 0;

        if (!this.props.tags.some((item: tag, index: number) => {
            tagIndex = index;
            return item.title === title
        })) {
            const r: number = Math.floor(Math.random() * (256));
            const g: number = Math.floor(Math.random() * (256));
            const b: number = Math.floor(Math.random() * (256));
            return '#' + r.toString(16) + g.toString(16) + b.toString(16);
        }
        else{
            return this.props.tags[tagIndex].color;
        }

    };


    private addTagClick = () => {

        let currentTags: tag[] = this.state.currentTags;

        if (!currentTags.some((item: tag) => {
            return item.title === this.state.tag
        })) {
            const newTag: tag = {
                title: this.state.tag,
                color: this.setTagColor(this.state.tag),
                count: 1
            };
            currentTags.push(newTag);
        }

        this.setState({
            currentTags,
            tag: ''
        });
    };

    private deleteTagClick = (index: number) => () => {

        let currentTags: tag[] = this.state.currentTags;

        currentTags.splice(index, 1);
        this.setState({
            currentTags
        });
    };

    private handleClick = () => {

        const {id,url,title,currentTags} = this.state;

        this.props.addBookmark({
            id,
            url,
            title,
            tags: currentTags,
            date: new Date()
        });
        this.props.addTag(this.state.currentTags);
        this.setState({
            url: '',
            title: '',
            tag: '',
            currentTags: [],
            id: id + 1
        });
    };

    public render() {

        const {url,title,tag} = this.state;

        return (
            <div className="addBookmarks">
                <div className="addUrl">
                    <span>URL</span>
                    <input
                        className="url-input"
                        type="text"
                        placeholder="Select URL your bookmarks"
                        value={url}
                        onChange={this.urlInputChange}/>
                </div>
                <div className="addTitle">
                    <span>Title</span>
                    <input
                        className="title-input"
                        type="text"
                        placeholder="Select title for your bookmarks"
                        value={title}
                        onChange={this.titleInputChange}/>
                </div>
                <div className="tagsBar">
                    <div className="addTags">
                        <input
                            className="tag-input"
                            type="text"
                            placeholder="Add tag..."
                            onChange={this.tagInputChange}
                            value={tag}/>
                        <button className="addTagButton" onClick={this.addTagClick}>+</button>
                    </div>
                    {this.setTagList()}
                    <button className="addButton" onClick={this.handleClick}>Add bookmark</button>
                </div>

            </div>
        )
    }



}

const mapStateToProps = (state: any) => ({
    tags: state.tags,
    bookmarks: state.bookmarks.bookmarks
});

const mapActionsToProps = {
    addBookmark: addBookmark,
    editBookmarks: editBookmarks,
    addTag: addTag
};
export default connect(mapStateToProps, mapActionsToProps)(AddForm);


