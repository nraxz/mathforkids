const resultMoveElements = document.querySelectorAll('.result-move');
const userMoveElement = document.querySelector('.user-result-element');
const computerMoveElement = document.querySelector('.computer-result-element');
const gameStatusElement = document.querySelector('.game-status-element');
const moveElements = document.querySelectorAll('.move');
const rockMoveElement = document.querySelectorAll('.rock-move');
const paperMoveElement = document.querySelectorAll('.paper-move');
const scissorsMoveElement = document.querySelectorAll('.scissors-move');
const winningsElement = document.querySelector('.winnings-history-element');
const tiesElement = document.querySelector('.ties-history-element');
const lossesElement = document.querySelector('.losses-history-element');
const resetBtn = document.querySelector('.reset-btn');

const resultsObject = JSON.parse(localStorage.getItem('results')) || {
  winnings: 0,
  ties: 0,
  losses: 0,
};
updateResultsHistory();

// Used to select computer move
let randomNumber;

moveElements.forEach(element => {
  element.addEventListener('click', () => {
    playGame(element);
  });
});

resetBtn.addEventListener('click', () => {
  resetGame();
})

function playGame(userSelect) {
  randomNumber = Math.random();
  const computerMove = renderComputerMove();

  const userMove = userSelect.dataset.userMove;
  const userMoveIcon = getMoveIconClassName(userMove);
  const computerMoveIcon = getMoveIconClassName(computerMove);


  userMoveElement.innerHTML = `
  <i class="fa-regular ${userMoveIcon} result-move-icon"></i>
  `;
  computerMoveElement.innerHTML = `
  <i class="fa-regular ${computerMoveIcon} result-move-icon"></i>
  `;

  gameStatusElement.innerHTML = makeResult(userMove);
  
  updateResultsObject(userMove);
}

function renderComputerMove() {
  if (randomNumber < 1/3) {
    return 'rock';
  } else if (randomNumber < 2/3) {
    return 'paper';
  }

  return 'scissors';
}

function getMoveIconClassName(move) {
  if (move === 'rock') {
    return 'fa-hand-back-fist';
  } else if (move === 'paper') {
    return 'fa-hand';
  } else if (move === 'scissors') {
    return 'fa-hand-scissors';
  }
}

function makeResult(userMove) {
  const computerMove = renderComputerMove();
  if (userMove === computerMove) {
    return 'Tie.';
  }

  if((userMove === 'rock' && computerMove === 'scissors') 
  || (userMove === 'paper' && computerMove === 'rock') 
  || (userMove === 'scissors' && computerMove === 'paper')) {
    return 'You won.';
  }

  return 'Computer won.'
}

function updateResultsObject(userMove) {
  const result = makeResult(userMove);

  if (result === 'Tie.') {
    resultsObject.ties++;
  } else if (result === 'You won.') {
    resultsObject.winnings++;
  } else if (result === 'Computer won.') {
    resultsObject.losses++;
  }

  updateResultsHistory();
  localStorage.setItem('results', JSON.stringify(resultsObject));
}

function updateResultsHistory() {
  winningsElement.innerHTML = resultsObject.winnings;
  tiesElement.innerHTML = resultsObject.ties;
  lossesElement.innerHTML = resultsObject.losses;
}

function resetGame() {
  for (let key in resultsObject) {
    resultsObject[key] = 0;
  }

  updateResultsHistory();
  localStorage.setItem('results', JSON.stringify(resultsObject));

  resultMoveElements.forEach(el => {
    el.innerHTML = `
    <i class="fa-regular fa-hand-back-fist result-move-icon"></i>`;
  });

  gameStatusElement.innerHTML = `Let's Play!`
}

