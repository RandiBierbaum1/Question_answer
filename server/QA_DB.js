class QA_DB {
    constructor(mongoose) {
        // This is the schema we need to store questions in MongoDB
        const questionSchema = new mongoose.Schema({
            text: String,
            answers: [
                {text: String, votes: Number}
            ]
        });

        // This model is used in the methods of this class to access questions
        this.questionModel = mongoose.model('question', questionSchema);
    }

    async getQuestions(){
        try {
            return await this.questionModel.find({});
        }
        catch (error) {
            console.error("getQuestions:", error.message);
            return {};
        }
    }

    async getQuestion(id) {
        try {
            return await this.questionModel.findById(id);
        } catch (error) {
            console.error("getQuestion:", error.message);
            return {};
        }
    }

    async createQuestion(newQuestion) {
        let question = new this.questionModel(newQuestion);
        return question.save();
    }

    async addAnswer(questionId, answer) {
        const question = await this.getQuestion(questionId);
        question.answers.push({text: answer, votes: 0});
        return question.save();
    }

    async upVoteAnswer(questionId, answerId) {
        const question = await this.getQuestions(questionId)
        const answer = question.answers.id(answerId);
        answer.votes++;
        return question.save();
    }

    async downvoteAnswer(questionId, aid) {
        const question = await this.getQuestion(questionId)
        const answer = question.answers.id(aid);
        answer.votes =-1;
        return question.save();
    }
}

// We export the object used to access the questions in the database
module.exports = mongoose => new QA_DB(mongoose);