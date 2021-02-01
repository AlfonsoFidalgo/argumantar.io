import React from 'react';

const Post = (props) => {
    console.log(props);
    return (
        <div>Post {props.match.params.id} page</div>
    );
};

export default Post;
