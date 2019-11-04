import React, {Component} from 'react';

class AskQuestion extends Component {
    constructor(props) {
        super(props);

        this.state = {
            input: ""
        };
    }

    onChange(event) {
        this.setState({
            input: event.target.value
        })
    }

    onClick(event) {
        this.props.askQuestion(this.props.id, this.state.input);
    }

    render() {
        return (
            <React.Fragment>
                <div>
                    <h3>There are no stupid questions</h3>
                    <input onChange={(event) => this.onChange(event)}
                           type="text" placeholder="Fell free to ask yours"></input>
                </div>
                <button onClick={() => this.onClick()}>Send Question</button>
            </React.Fragment>
        )
    }
}

export default AskQuestion;