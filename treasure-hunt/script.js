document.addEventListener('DOMContentLoaded', function () {
    const scoreDisplay = document.getElementById('score');
    const problemText = document.getElementById('problem-text');
    const buttonsContainer = document.getElementById('buttons-container');
    const alertContainer = document.getElementById('alert-container');
    const alertMessage = document.getElementById('alert-message');

    let score = 0;
    let problem;

    function generateMathProblem() {
        const num1 = Math.floor(Math.random() * 10) + 1;
        const num2 = Math.floor(Math.random() * 10) + 1;
        const correctAnswer = num1 + num2;

        let wrongAnswer1, wrongAnswer2;

        do {
            wrongAnswer1 = correctAnswer + Math.floor(Math.random() * 5) + 1;
        } while (wrongAnswer1 === correctAnswer);

        do {
            wrongAnswer2 = correctAnswer - Math.floor(Math.random() * 5) + 1;
        } while (wrongAnswer2 === correctAnswer || wrongAnswer2 === wrongAnswer1);

        return {
            problem: `${num1} + ${num2} = ?`,
            answers: [correctAnswer, wrongAnswer1, wrongAnswer2]
        };
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function displayNewProblem() {
        problem = generateMathProblem();
        problemText.textContent = problem.problem;

        const answerButtons = [problem.answers[0], problem.answers[1], problem.answers[2]];
        shuffleArray(answerButtons);

        buttonsContainer.innerHTML = '';
        answerButtons.forEach(answer => {
            const button = document.createElement('button');
            button.textContent = answer;
            button.classList.add('btn', 'btn-primary', 'btn-lg', 'mr-2', 'mb-2');
            button.addEventListener('click', () => checkAnswer(answer));
            buttonsContainer.appendChild(button);
        });
    }

    function checkAnswer(selectedAnswer) {
        if (selectedAnswer === problem.answers[0]) {
            score++;
            showAlert('success', 'Correct! You earned a point.');
        } else {
            score--;
            showAlert('danger', 'Incorrect! You lost a point.');
        }

        if (score < 0) {
            score = 0;
        }

        scoreDisplay.textContent = score;
        displayNewProblem();
    }

    function showAlert(type, message) {
        alertContainer.classList.remove('alert-success', 'alert-danger');
        alertContainer.classList.add(`alert-${type}`);
        alertMessage.textContent = message;
        alertContainer.style.display = 'block';
    }

    function startGame() {
        score = 0;
        scoreDisplay.textContent = score;
        displayNewProblem();
    }

    // Start the game
    startGame();
});
