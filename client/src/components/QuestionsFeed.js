import React, {Component} from 'react';
import axios from 'axios';
import { Grid } from '@material-ui/core';
import FeedElement from './FeedElement';
import Spinner from './Spinner';


class QuestionsFeed extends Component {
    state = {
        questions: [],
        selectedQuestion: null,
        loading: true
    }
    
    componentDidMount (){
        axios.get('http://localhost:3001/questions')
        .then((response => {
            this.setState({questions: response.data, loading: false});
        }));
    }
    
    questionClicked = (id) => {
        this.state.questions.forEach(q => {
        if (q.id === id){
            this.setState({selectedQuestion: q});
        };
        });
    }

    render(){
        let feedEvents = (<Spinner />);
        if (!this.state.loading){
            feedEvents = this.state.questions.map(question => {
                return (
                        <Grid item xs={12} sm={12} key={question.question_id}>
                            <FeedElement
                            user={question.username}
                            questionId={question.question_id}
                            date={question.created_at}
                            title={question.question_title}
                            body={question.question_body}
                            arguments={question.num_arguments}
                            // eslint-disable-next-line eqeqeq
                            agreeRate={question.question_engagement == 0 ? 0 : question.agree_support / question.question_engagement}
                            // eslint-disable-next-line eqeqeq
                            disagreeRate={question.question_engagement == 0 ? 0 : (question.question_engagement - question.agree_support)/ question.question_engagement}
                            />
                        </Grid>
                )
            })
        };
        return (<Grid container spacing={2}>{feedEvents}</Grid>);
    }
}

export default QuestionsFeed;