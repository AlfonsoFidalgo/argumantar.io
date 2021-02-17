import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';
import FeedElement from './FeedElement';
import Spinner from './Spinner';
import * as actions from '../store/actions';

class QuestionsFeed extends Component {
    componentDidMount (){
        console.log('FROM QuestionsFeed: ', this.props);
        this.props.onQuestionsLoad();
    }

    render(){
        let feedEvents = (<Spinner />);
        if (this.props.questions){
            feedEvents = this.props.questions.map(question => {
                const numVotes = question.agree_votes + question.disagree_votes;
                let agreeRate;
                let disagreeRate;
                if (numVotes > 0){
                    agreeRate = parseInt(question.agree_votes) / (parseInt(question.agree_votes) + parseInt(question.disagree_votes));
                    disagreeRate = parseInt(question.disagree_votes) / (parseInt(question.agree_votes) + parseInt(question.disagree_votes))
                } else {
                    agreeRate = 0;
                    disagreeRate = 0;
                }
                return (
                        <Grid item xs={12} sm={12} key={question.question_id}>
                            <FeedElement
                            user={question.username}
                            questionId={question.question_id}
                            date={question.created_at}
                            title={question.question_title}
                            body={question.question_body}
                            arguments={question.num_arguments}
                            agreeRate={agreeRate}
                            disagreeRate={disagreeRate}
                            />
                        </Grid>
                )
            })
        };
        return (<Grid container spacing={2}>{feedEvents}</Grid>);
    }
}

const mapStateToProps = state => {
    return {
        questions: state.questions.questions
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onQuestionsLoad: () => dispatch(actions.fetchQuestions())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionsFeed);