import * as React from 'react';
import {connect} from "react-redux";
import BookmarksItem from "../bookmarks-item/BookmarkItem";

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


    public render() {
        return (
            <div>
                bookmarks:
                { this.setStockList() }
            </div>
        )
    };
}


const mapStateToProps = (state: any) => ({
    bookmarks: state.bookmarks,
});

export default connect(mapStateToProps)(BookmarksList);


