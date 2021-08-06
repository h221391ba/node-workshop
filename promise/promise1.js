//作業二
// 模擬一個非同步工作
let doWork = function (job, timer, isOK) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let dt = new Date();
            if (isOK) {
                console.log(`完成工作: ${job} at ${dt.toISOString()}`);
                resolve();
            } else {
                console.log(`失敗了 ${job}`);
                reject();
            }
        }, timer);
    });
};

let job1 = doWork("刷牙", 3000, true);
// console.log(job1);

job1
    .then((result) => {
        console.log('job1 finished');
        return doWork('划手機', 5000, true);
    })
    .then((result) => {
        console.log('job2 finished');
        return doWork('玩遊戲', 8000, true);
    })
    .catch((error) => {
        console.log(error);
    })
    .finally(() => {
        console.log('well done');
    });

