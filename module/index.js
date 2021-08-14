let player = require('./Player');

console.log(`Player name : ${player.showName()}`);

let earn = () => {
    return new Promise((res, rej) => {
        setTimeout(() => {
            player.addMoney();
            res(player.showMoney());
        }, 1000)
    })
}

async function doWork() {
    console.log("Let's work!!");
    for (let i = 0; i < 5; i++) {
        let result = await earn();
        console.log(`Money : ${result}`);
    }
}

doWork();