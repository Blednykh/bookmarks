import * as React from 'react';
import {connect} from "react-redux";
import './BookmarksList.css'
import BookmarksItem from "../bookmarks-item/BookmarkItem";
import {bookmark} from "../../model/bookmark";
import {tag} from "../../model/tag"

interface IProps {
    bookmarks: bookmark[]
}
interface IState {
    searchText: string
}

class BookmarksList extends React.Component <IProps, IState> {

    state = {
        searchText: ''
    };

    public setStockList = () => {

        let {searchText} = this.state;

        return this.props.bookmarks.filter((item: bookmark) => {
            if (searchText !== '') {
                if (searchText[0] === '#') {
                    return (
                        item.tags.some((tagsItem: tag) => {
                            return tagsItem.title.toLowerCase().indexOf(searchText.substring(1,).toLowerCase()) !== -1
                        })
                    )
                } else {
                    return item.title.toLowerCase().indexOf(searchText.toLowerCase()) !== -1
                }
            } else {
                return true
            }
        }).map((item: bookmark) => {

            let currentIndex: number = 0;

            this.props.bookmarks.forEach((bookmarksItem: bookmark, index: number) => {
                if (bookmarksItem.id === item.id) {
                    currentIndex = index;
                }
            });
            return (
                <BookmarksItem
                    key={item.id}
                    currentBookmark={item}
                    currentIndex={currentIndex}
                />
            );
        });
    };

    private searchChange = (e: any) => {
        this.setState({searchText: e.target.value});
    };


    public render() {
        return (
            <div className="bookmarksList">
                <div className="search-box">
                    <input
                        type="text"
                        placeholder="Search bookmarks..."
                        onChange={this.searchChange}
                    />
                </div>
                {this.setStockList()}
            </div>
        )
    };
}


const mapStateToProps = (state: any) => ({
    bookmarks: state.bookmarks.bookmarks,
});

export default connect(mapStateToProps)(BookmarksList);


