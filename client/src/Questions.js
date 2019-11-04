import React, {Component} from 'react';
import {Link} from "@reach/router";
import AskQuestion from "./AskQuestion";

class Questions extends Component {

    render() {
        let questionList = <li>tom</li>
        if (this.props.data) {
            questionList = this.props.data.map(question =>
                <li key={question.id}>
                    <Link to={`/question/${question._id}`}>{question.text}</Link>
                </li>
            );
        }

        return (
            <React.Fragment>
                <div>
                    <h1>Questions</h1>
                    <ul>
                        {questionList}
                    </ul>
                    <AskQuestion askQuestion={(id, text) => this.props.askQuestion(id, text)}/>
                </div>
            </React.Fragment>
        );
    }
}

export default Questions;