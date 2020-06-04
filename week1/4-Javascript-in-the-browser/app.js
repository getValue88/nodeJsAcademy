/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

let scores, activePlayer, roundScore, diceDOM, runningGame;

startGame();

//roll button
document.querySelector('.btn-roll').addEventListener('click', function () {
    if (runningGame) {
        const dice = Math.round(Math.random() * 5) + 1;

        if (dice !== 1) {
            //update ui
            diceDOM.style.display = 'block';
            diceDOM.src = 'dice-' + dice + '.png';

            //update round score
            roundScore += dice;
            document.getElementById('current-' + activePlayer).textContent = roundScore;

        } else {
            endRound();
        }
    }
});

//hold button
document.querySelector('.btn-hold').addEventListener('click', function () {
    if(runningGame){
        //update global score
        scores[activePlayer] += roundScore;
        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
    
        //check if there is a winner
        if (scores[activePlayer] >= 100) {
            // update ui
            document.getElementById('name-' + activePlayer).textContent = 'Winner';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
    
            diceDOM.style.display = 'none';

            //set game status to ended
            runningGame = false;
    
        } else {
            endRound();
        }
    }
});


//new game button
document.querySelector('.btn-new').addEventListener('click', startGame);



//functions
function endRound() {
    //hide the dice
    diceDOM.style.display = 'none';

    //reset roundscore and ui
    roundScore = 0;
    document.getElementById('current-' + activePlayer).textContent = 0;

    //togle active player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;

    //toggle active class to both players in the ui
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
}

function startGame() {
    //variables initialization
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    diceDOM = document.querySelector('.dice');
    activeGame = true;

    //reset ui to initial status
        //hide the dice
    diceDOM.style.display = 'none';

        //global scores
    document.getElementById('score-0').textContent = 0;
    document.getElementById('score-1').textContent = 0;

        //round scores
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;

        //players name
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';

        //reset winner and active classes
    document.querySelector('.player-0-panel').classList.remove('active', 'winner');
    document.querySelector('.player-1-panel').classList.remove('active', 'winner');
    document.querySelector('.player-0-panel').classList.add('active');
}