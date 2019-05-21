import * as React from 'react';
import './BookmarksItem.css';
import {connect} from "react-redux";


interface IProps {
    id: number,
    index: number,
    bookmarks: any
}
interface IState {

}

class BookmarksItem extends React.Component <IProps,IState> {

    public render() {
        return (
            <div>
                {this.props.bookmarks[this.props.index].description}
            </div>
        )
    }
}

const mapStateToProps = (state: any) => ({
    bookmarks: state.bookmarks,
});


export default connect(mapStateToProps)(BookmarksItem);


