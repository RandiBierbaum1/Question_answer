import React, {Component} from 'react';
import { Router } from "@reach/router";

import Question from "./Question";
import Questions from "./Questions";

class App extends Component {

    API_URL = process.env.REACT_APP_API_URL;

  constructor(props) {
    super(props);

    this.state = {
      data: []
    };
  }

  componentDidMount() {
     this.getData();
  }

//using async and await
async getData() {
      let url = `${this.API_URL}/questions`; // URL of the API.
      const response = await fetch(url);
      const json = await response.json();
      this.setState({data: json});
}

  //get the question from inside the compoment
  //have to turn the string (id) into a number using Number,
  getQuestion(id) {
    return this.state.data.find(question => question._id === id);
  }

    /*POST NEW QUESTION */
  askQuestion(id, text) {
    const url = `${this.API_URL}/questions`;
    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        text: text
      }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
        .then(response => response.json())
        .then(json => {
          this.getData();
        });
  }


  /*POST NEW ANSWER */
  postAnswer(id, text) {
    const url = `${this.API_URL}/questions/`+id+'/answers';
    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        text: text,
      }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
        .then(response => response.json())
        .then(json => {
          console.log("New Answer added");
          this.getData();
        });
  }

  render() {
    return (
        <React.Fragment>
            <h1>Seek and you shall find the answer</h1>
          <Router>
            <Questions path="/" data={this.state.data}
                       askQuestion ={(id, text) => this.askQuestion(id, text)}>
            </Questions>
            <Question path="/question/:id"
                      loadQuestion={(id) => this.getQuestion(id)}
                      postAnswer={(id, text) => this.postAnswer(id, text)}
                      />
          </Router>
        </React.Fragment>
    );
  }
}

export default App;
