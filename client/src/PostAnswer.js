import React, {Component} from 'react';

class PostAnswer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            input: "",
            votes: 0
        };
    }

    onChange(event) {
        this.setState({
            input: event.target.value
        })
    }

    onClick(event) {
        this.props.postAnswer(this.props.id, this.state.input);
    }

    render() {
        return (
            <React.Fragment>
                <div>
                    <h3> If you know the answer to the question, you can post it here</h3>
                    <input onChange={event => this.onChange(event)}
                    type="text" placeholder="Write your answer here"></input>
                </div>
                <button onClick={() => this.onClick()} >Send Answer</button>
            </React.Fragment>
        )
    }
}

export default PostAnswer;