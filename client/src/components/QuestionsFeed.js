import React, {Component} from 'react'
import axios from 'axios';
import FeedElement from './FeedElement';

class QuestionsFeed extends Component {
    state = {
        questions: [],
        selectedQuestion: null
    }
    
    componentDidMount (){
        axios.get('http://localhost:3001/questions')
        .then((response => {
          this.setState({questions: response.data});
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
        let feedEvents = this.state.questions.map(question => {
            return <FeedElement
            key={question.question_id}
            user={question.username}
            questionId={question.question_id}
            date={question.created_at}
            body={question.question_body}
            arguments={question.num_arguments}
            // eslint-disable-next-line eqeqeq
            agreeRate={question.question_engagement == 0 ? 0 : question.agree_support / question.question_engagement}
            // eslint-disable-next-line eqeqeq
            disagreeRate={question.question_engagement == 0 ? 0 : (question.question_engagement - question.agree_support)/ question.question_engagement}
            />
        });
        return(
            <div>
                {feedEvents}
            </div>
        )
    }
}

export default QuestionsFeed;