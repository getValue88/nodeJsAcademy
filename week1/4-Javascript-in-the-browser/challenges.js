/*
YOUR 3 CHALLENGES
Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/


//commented code if for challenge 1
let scores, activePlayer, roundScore, dicesDOM, activeGame;/*,lastDice ;*/

startGame();

//roll button
document.querySelector('.btn-roll').addEventListener('click', function () {
    if (activeGame) {
        // random values between 1 and 6
        const diceOne = Math.round(Math.random() * 5) + 1;
        const diceTwo = Math.round(Math.random() * 5) + 1;

/*         if (dice === 6 && lastDice === 6) {
            scores[activePlayer] = 0;
            document.getElementById('score-' + activePlayer).textContent = 0;
            endRound();

        } else */ if (diceOne !== 1 && diceTwo !== 1) { //if both random values are different to 1
            //show both dices
            displayElementsArray(dicesDOM, 'block');

            //set image src for dices
            dicesDOM[0].src = 'dice-' + diceOne + '.png';
            dicesDOM[1].src = 'dice-' + diceTwo + '.png';

            //set round score and update UI
            roundScore += diceOne + diceTwo;
            document.getElementById('current-' + activePlayer).textContent = roundScore;

        } else {
            endRound();
        }
        // lastDice = dice;
    }
});

//hold button
document.querySelector('.btn-hold').addEventListener('click', function () {
    if (activeGame) {
        //set global score and update the UI
        scores[activePlayer] += roundScore;
        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];

        // get final Score input from UI. If is NaN or < 0, the default final score will be 100
        const finalScoreDOMvalue = document.querySelector('.final-score').value;
        const finalScore = isNaN(finalScoreDOMvalue) || finalScoreDOMvalue <= 0 ? 100 : finalScoreDOMvalue;

        //check for winner
        if (scores[activePlayer] >= finalScore) {
            //update winner player element in the UI
            document.getElementById('name-' + activePlayer).textContent = 'Winner';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');

            //hide both dices
            displayElementsArray(dicesDOM, 'none');

            //set game status to ended
            activeGame = false;

        } else {
            endRound();
        }
    }
});

//new game button
document.querySelector('.btn-new').addEventListener('click', startGame);



//functions
function endRound() {
    //hide dices
    displayElementsArray(dicesDOM, 'none');

    //update round score and UI
    roundScore = 0;
    document.getElementById('current-' + activePlayer).textContent = 0;

    //toggle active player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;

    //toggle active class to both players in UI
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
}

function startGame() {
    //variable initialization
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    dicesDOM = document.querySelectorAll('.dice');
    activeGame = true;
    // lastDice = 0;

    //hide dices
    displayElementsArray(dicesDOM, 'none');

    //reset UI to initial status
        //global scores
    document.getElementById('score-0').textContent = 0;
    document.getElementById('score-1').textContent = 0;

        //round scores
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;

        //players name
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';

        //player panel classes
    document.querySelector('.player-0-panel').classList.remove('active', 'winner');
    document.querySelector('.player-1-panel').classList.remove('active', 'winner');
    document.querySelector('.player-0-panel').classList.add('active');
}

//takes an array of html elements and a string ('block','none','inline','inline-block'...)
//then sets display css property to all elements of the input array
function displayElementsArray(arrDOMelements, displayValue) {
    arrDOMelements.forEach(el => {
        el.style.display = displayValue;
    });
}