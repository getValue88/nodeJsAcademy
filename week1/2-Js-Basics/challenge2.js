//coding challenge 2
console.log('\nCODING CHALLENGE 2');


function calcTeamAvgScore(score1, score2, score3) {
    return (score1 + score2 + score3) / 3;
}

const johnTeamAverage = calcTeamAvgScore(89, 120, 103),
    mikeTeamAverage = calcTeamAvgScore(116, 94, 123),
    maryTeamAverage = calcTeamAvgScore(97, 134, 105);

switch (true) {
    case johnTeamAverage > mikeTeamAverage && johnTeamAverage > maryTeamAverage:
        console.log('Winner: John\'s team with an average score of ' + johnTeamAverage + ' points.');
        break;
    case mikeTeamAverage > johnTeamAverage && mikeTeamAverage > maryTeamAverage:
        console.log('Winner: Mike\'s team with an average score of ' + mikeTeamAverage + ' points.');
        break;
    case maryTeamAverage > johnTeamAverage && maryTeamAverage > mikeTeamAverage:
        console.log('Winner: Mary\'s team with an average score of ' + maryTeamAverage + ' points.');
        break;
    default:
        console.log('Draw! Two or more teams have the same average score.');
}

