import React, {Component} from 'react';
import {Link} from "@reach/router";
import PostAnswer from "./PostAnswer";

class Question extends Component{
    constructor(props) {
        super(props);
    }


    addVote(id, aid) {
        const url ='http://localhost:8080/api/questions/'+id+'/answers/'+ aid;
        fetch(url, {
            method: 'PUT',
            body: JSON.stringify({
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(response => response.json())
            .then(json => {
                console.log("Vote up");
                this.getData();
            });
    }


    decreaseVote(id, aid) {
        const url ='http://localhost:8080/api/questions/'+id+'/answers/' + aid;
        fetch(url, {
            method: 'PUT',
            body: JSON.stringify({
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(response => response.json())
            .then(json => {
                console.log("Vote up");
                this.getData();
            });
    }

    render() {
        const id = this.props.id;
        const question = this.props.loadQuestion(id);

        const list = question.answers.map(ans =>
            <li key={ans._id}>
                Votes: {ans.votes}
                <button addVote={(id, aid) => this.addVote(id, aid)}>+</button>
                <button decreaseVote={(id, aid) => this.decreaseVote(id, aid)}>-</button>
                {ans.text}
            </li>)

        return (
            <React.Fragment>
                <h2>The question is: </h2>
                <h3>{question.text}</h3>
                <p>Answers:</p>
                <ul>
                    {question.answers.length === 0 ? <p>No Answers yet!</p> : list}
                </ul>
                <div>
                    {/* question.id = finde hvilket question answeret tilhøre */}
                    <PostAnswer postAnswer={(id, text) => this.props.postAnswer(question._id, text)}/>
                </div>
                <br/>
                <Link to="/">Go back</Link>
            </React.Fragment>
        )
    }
}

export default Question;