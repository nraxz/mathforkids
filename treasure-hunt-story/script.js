document.addEventListener('DOMContentLoaded', function () {
    const scoreDisplay = document.getElementById('score');
    const progressBar = document.getElementById('progress-bar');
    const treasureIcon = document.getElementById('treasure-icon');
    const problemText = document.getElementById('problem-text');
    const buttonsContainer = document.getElementById('buttons-container');
    const alertContainer = document.getElementById('alert-container');
    const alertMessage = document.getElementById('alert-message');

    let score = 0;
    let problem;

    const questions = [
        "There are ${num1} apples on the table, and ${num2} more apples in the basket. How many apples do we have in total?",
        "Sally has ${num1} toys, and she gets ${num2} more as a gift. How many toys does Sally have now?",
        "Tommy has ${num1} red balloons and ${num2} blue balloons. How many balloons does he have in all?",
        "There are ${num1} butterflies in the garden, and ${num2} more join them. How many butterflies are there now?",
        "In a zoo, there are ${num1} giraffes, and ${num2} more arrive from another zoo. How many giraffes are there in total?",
        "Emily has ${num1} candies, and she gives ${num2} to her friend. How many candies does Emily have left?",
        "Jake has ${num1} marbles, and he loses ${num2} while playing. How many marbles does Jake have now?",
        "There are ${num1} ducks in the pond, and ${num2} more join them. How many ducks are swimming in the pond?",
        "A box has ${num1} chocolates, and ${num2} are eaten by Tim. How many chocolates are left in the box?",
        "Lisa has ${num1} stickers, and her friend gives her ${num2} more. How many stickers does Lisa have in total?"
    ];

    function getRandomQuestion() {
        return questions[Math.floor(Math.random() * questions.length)];
    }

    function replaceVariables(question, num1, num2) {
        return question.replace('${num1}', num1).replace('${num2}', num2);
    }

    function generateWordProblem() {
        const num1 = Math.floor(Math.random() * 10) + 1;
        const num2 = Math.floor(Math.random() * 10) + 1;
        const question = getRandomQuestion();

        return {
            problem: replaceVariables(question, num1, num2),
            answer: num1 + num2
        };
    }

    function shuffleArray(array) {
        array.sort(() => Math.random() - 0.5);
    }

    function updateProgressBar() {
        const progressValue = (score / 10) * 100;
        progressBar.style.width = `${progressValue}%`;

        if (score === 10) {
            treasureIcon.src = 'images/treasure-open.png';
        }
    }

    function displayNewProblem() {
        problem = generateWordProblem();
        problemText.textContent = problem.problem;
    
        let answerButtons;
        do {
            answerButtons = [problem.answer, problem.answer + Math.floor(Math.random() * 5) + 1, problem.answer - Math.floor(Math.random() * 5) + 1];
            shuffleArray(answerButtons);
        } while (new Set(answerButtons).size !== answerButtons.length);
    
        buttonsContainer.innerHTML = '';
        answerButtons.forEach(answer => {
            const button = document.createElement('button');
            button.textContent = answer;
            button.classList.add('btn', 'btn-primary', 'mr-2', 'mb-2');
            button.addEventListener('click', () => checkAnswer(answer));
            buttonsContainer.appendChild(button);
        });
    }

    function checkAnswer(selectedAnswer) {
        score += (selectedAnswer === problem.answer) ? 1 : -1;
        score = Math.max(0, score); // Ensure the score does not go below 0

        scoreDisplay.textContent = score;
        updateProgressBar();
        displayNewProblem();
    }

    function showAlert(type, message) {
        alertContainer.classList.remove('alert-success', 'alert-danger', 'alert-warning');
        alertContainer.classList.add(`alert-${type}`);
        alertMessage.textContent = message;
        alertContainer.style.display = 'block';
    }

    function startGame() {
        score = 0;
        scoreDisplay.textContent = score;
        updateProgressBar();
        displayNewProblem();
    }

    // Start the game
    startGame();
});
