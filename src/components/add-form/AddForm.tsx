import * as React from 'react';
import './AddForm.css';
import {connect} from "react-redux";
import {addBookmark} from "../../store/actions/bookmarksActions";
import {addTag} from "../../store/actions/tagsActions"
import {bookmark} from "../../model/bookmark";
import BookmarksItem from "../bookmarks-item/BookmarkItem";



interface IProps {
    addBookmark: any,
    addTag: any,
    tags: string[]
}
interface IState {
    url: string,
    title: string,
    tag: string,
    currentTags: string[]
}

class AddForm extends React.Component <IProps,IState> {

    state={
        tag: '',
        url: '',
        title: '',
        currentTags: []
    };

    public setTagList = () => {
        return this.state.currentTags.map((item: string, index: number) => {
            return (
                <div className="tagItem">
                    {item}
                    <button className="deleteTagButton" onClick = {this.deleteTagClick(index)}>x</button>
                </div>
            );
        });
    }


    public render() {
        return (
            <div className = "addBookmarks">
                <div className="addUrl">
                    <span>URL</span>
                    <input className="url-input" type="text" placeholder="Select URL your bookmarks" value={this.state.url}
                           onChange={this.urlInputChange}/>
                </div>
                <div className="addTitle">
                    <span>Title</span>
                    <input className="title-input" type="text" placeholder="Select title for your bookmarks" value={this.state.title}
                           onChange={this.titleInputChange}/>
                </div>
                <div className="tagsBar">
                    <div className="addTags">
                        <input className="tag-input" type="text" placeholder="Add tag..." onChange={this.tagInputChange} value={this.state.tag}/>
                        <button className="addTagButton" onClick = {this.addTagClick}>+</button>
                    </div>
                    { this.setTagList() }
                    <button className="addButton" onClick = {this.handleClick}>Add bookmark</button>
                </div>

            </div>
        )
    }

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

    private addTagClick = () => {
        let currentTags: string[] = this.state.currentTags;
        if(!currentTags.some((item:string)=>{return item===this.state.tag})){
            currentTags.push(this.state.tag);
        }

        this.setState({
            currentTags,
            tag: ''
        });
    };

    private deleteTagClick = (index: number) => ()=> {
        let currentTags: string[] = this.state.currentTags;

        currentTags.splice(index,1);

        this.setState({
            currentTags
        });
    };

    private handleClick = () => {
        this.props.addBookmark({
            url: this.state.url,
            title: this.state.title,
            tags: this.state.currentTags,
            date: new Date()
        });
        this.props.addTag(this.state.currentTags);
        this.setState({
            url: '',
            title: '',
            tag: '',
            currentTags: []
        });
    };

}

const mapStateToProps = (state: any) => ({
    tags: state.tags
});



const mapActionsToProps = {
    addBookmark: addBookmark,
    addTag: addTag
};
export default connect(mapStateToProps,mapActionsToProps)(AddForm);


