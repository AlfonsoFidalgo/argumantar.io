import React from 'react';
import { connect } from 'react-redux';
import { List, Typography, ListItem, ListItemText } from '@material-ui/core';
import Spinner from './Spinner';
import Comment from './Comment';

const Comments = (props) => {
    let comments = (<Spinner />);
    if (props.comments){
        const relevantComments = props.comments.filter((c) => c.argument_id === props.argumentId);
        comments = relevantComments.map(comment => {
            console.log(comment)
            return (
                <Comment
                    commentId={comment.id}
                    commentBody={comment.body}
                    date={comment.created_at}
                />
            )
        });
        if (comments.length === 0){
            comments = <Typography color='textSecondary'>There are no comments yet.</Typography>
        }
    }
    return (
        <List>
            {comments}
        </List>
    )
}

const mapStateToProps = state => {
    return {
        comments: state.comments.comments
    };
};

export default connect(mapStateToProps)(Comments);