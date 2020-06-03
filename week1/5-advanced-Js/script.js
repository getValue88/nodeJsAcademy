//coding challenge

(function () {

    //constructor function
    const Question = function (question, answers, correctAnswer) {
        this.question = question;
        this.answers = answers;
        this.correctAnswer = correctAnswer;
    };

    // display question    
    Question.prototype.makeQuestion = function () {
        console.log(this.question);

        this.answers.forEach((answer, i) => {
            console.log(`${i}: ${answer}`);
        });
    };

    //check answer and call score function then display current score
    Question.prototype.checkAnswer = function (answer, cb) {
        let score;

        if (answer === this.correctAnswer) {
            console.log('Correct');
            score = cb(true);
        } else {
            console.log('Incorrect');
            score = cb(false);
        }

        this.displayScore(score);
    };

    //display current score
    Question.prototype.displayScore = function(score){
        console.log('-------------------------------------------------------');
        console.log('Your score is: ' + score);
        console.log('-------------------------------------------------------');
    }



    const questions = [
        new Question('What is your mentor name?', ['Julio', 'Carlos', 'Miguel', 'Carolina'], 1),
        new Question('2 + 2?', [3, 5, 7, 4, 6], 3),
        new Question('Which of these is the Javascript google chrome engine?', ['V8', 'SpiderMonkey', 'JavaScriptCope'], 0)
    ];

    // function that receives a boolean (true for correct answer) and return the current score
    const score = manageScore();

    //pick a random question, ask user for answer then check answer and make another question or exit the execution
    function nextQuestion() {
        const randomIndex = Math.floor(Math.random() * questions.length);
        questions[randomIndex].makeQuestion();

        const answer = prompt('Introduce your answer');

        if (answer !== "exit") {
            questions[randomIndex].checkAnswer(parseInt(answer), score);
            nextQuestion();
        }
    }

    //closure that manage the score -> returns a function that keeps the score and increment it by one if the argument is true 
    function manageScore() {
        let score = 0;

        return function (correct) {
            if (correct) score++;
            return score;
        }
    }

    //start the game
    nextQuestion();
})();
