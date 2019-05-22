import * as React from 'react';
import {connect} from "react-redux";
import BookmarksItem from "../bookmarks-item/BookmarkItem";
import './BookmarksList.css'
import {bookmark} from "../../model/bookmark";
interface IProps {
    bookmarks: []
}
interface IState {
    searchText: string
}

class BookmarksList extends React.Component <IProps,IState>{

    state = {
        searchText: ''
    };

    public setStockList = () => {
        let {searchText} = this.state;
        return this.props.bookmarks.filter((item: bookmark) => {
            if(searchText!==''){
                if(searchText[0]==='#')
                {
                    console.log('#');
                   /* return (
                        item.title.toLowerCase().indexOf(this.state.searchText.toLowerCase())!==-1
                    )*/
                }
                else{
                    return (
                        item.title.toLowerCase().indexOf(this.state.searchText.toLowerCase())!==-1
                    )
                }
            }
            else{
                return (
                    true
                )
            }
        }).map((item: bookmark) => {
            console.log(item);
            return (
                <BookmarksItem
                    id = {item.id}
                    index = {item.id}
                    currentBookmark = {item}
                />
            );
        });
    }


    private searchChange = (e: any) => {
        this.setState({searchText: e.target.value});
    };


    public render() {
        return (
            <div className = "bookmarksList">
                <div className="search-box">
                    <input
                        type="text"
                        placeholder="Search bookmarks..."
                        onChange={this.searchChange}
                    />
                    {/*<button className="searchButton" onClick={this.searchClick}>
                        Search
                    </button>*/}
                </div>
                { this.setStockList() }
            </div>
        )
    };
}


const mapStateToProps = (state: any) => ({
    bookmarks: state.bookmarks.bookmarks,
});

export default connect(mapStateToProps)(BookmarksList);


