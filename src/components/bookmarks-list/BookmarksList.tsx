import * as React from 'react';
import {connect} from "react-redux";
import BookmarksItem from "../bookmarks-item/BookmarkItem";
import './BookmarksList.css'
interface IProps {
    bookmarks: []
}
interface IState {

}

class BookmarksList extends React.Component <IProps,IState>{




    public setStockList = () => {
        return this.props.bookmarks.map((item: {}, index: number) => {
            return (
                <BookmarksItem id = {index}
                               index = {index}
                />
            );
        });
    }

    private searchClick = () => {

    };

    private searchChange = () => {

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


