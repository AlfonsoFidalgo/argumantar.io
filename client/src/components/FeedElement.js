import React from 'react'

const FeedElement = (props) => {
    return (
        <div>
            {props.user} <br/>
            {props.body}
        </div>
    )
};

export default FeedElement;