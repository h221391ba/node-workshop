let playerName = 'reverie';
let gender = 'Female';
let job = 'Wizard';
let money = 1000;

function addMoney() {
    money += 50;
}

function showMoney() {
    return money;
}


function showName() {
    return playerName;
}

function showJob() {
    return job;
}

module.exports = {
    showName,
    addMoney,
    showMoney
}

