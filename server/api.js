const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

/**** Configuration ****/
const port = (process.env.PORT || 8080);
const app = express();
app.use(cors());
app.use(bodyParser.json()); // Parse JSON from the request body
app.use(morgan('combined')); // Log all requests to the console
app.use(express.static('../client/build')); // Only needed when running build in production mode

/**** Test data ****/
const data = [
    {
        id: 1,
        text: "How do I return the response from an Observable in Angular 2?",
        answers: [
            {id: 1, text: "Observables are lazy so you have to subscribe to get the value.", votes: 5},
            {id: 2, text: "You can use asyncPipe", votes: -2},
            {id: 3, text: "The reason that it's undefined is that you are making an asynchronous operation", votes: 3}
        ]
    },
    {
        id: 2,
        text: "I have another question. What is..?",
        answers: [
            {id: 1, text: "Answer 1", votes: 2},
            {id: 2, text: "Answer 2", votes: 3},
            {id: 3, text: "Answer 3", votes: 0}
        ]
    },
    {
        id: 3,
        text: "What IS this??",
        answers: [
            {id: 1, text: "Answer 1", votes: 0},
            {id: 2, text: "Answer 2", votes: 1}
        ]
    }
];


/**** Database ****/
const questionDB = require('./QA_DB')(mongoose);

/****Routes ****/
app.get('/api/questions', (request, response) => {
    questionDB.getQuestions().then(questions => response.json(questions));
});


app.get('/api/questions/:id', (request, response) => {
    let id = request.params.id;
    questionDB.getQuestion(id).then(question => response.json(question));
});

/**** Post new question ****/
app.post('/api/questions', (request, response) => {
    let question = {
        text : request.body.text,
        answers : [
        ]
        };
    //Create a new question
    questionDB.createQuestion(question).then(newQuestion => response.json(newQuestion));
    // response.json({ msg: "Question added", newQuestion: newQuestion});
});

///Post new answer for a specific question id
app.post('/api/questions/:id/answers', (request, response) => {
    console.log(request.params);
    questionDB.addAnswer(request.params.id, request.body.text)
        .then(updateQuestion => response.json(updateQuestion));
});

app.put('/api/questions/:id/answers/:aid', (request, response) => {
    questionDB.upVoteAnswer(request.params.id, request.params.aid)
        .then(updateAnswer => response.json(updateAnswer));
});

app.put('/api/questions/:id/answers/:aid', (request, response) => {
    questionDB.downvoteAnswer(request.params.id, request.params.aid)
        .then(updateAnswer => response.json(updateAnswer));
});


app.get('*', (request, response) =>
    response.sendFile(path.resolve('..', 'client', 'build', 'index.html'))
);


/**** Start ****/
const url = (process.env.MONGO_URL || 'mongodb://localhost/question_db');
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(async () => {
        await app.listen(port); // Start the API
        console.log(`Question API running on port ${port}!`)
    })
    .catch(error => console.error(error));