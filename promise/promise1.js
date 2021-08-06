//作業一
// 模擬一個非同步工作
let doWork = function (job, timer, isOK) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let dt = new Date();
            if (isOK) {
                console.log(`完成工作: ${job} at ${dt.toISOString()}`);
            } else {
                console.log(`失敗了 ${job}`);
            }
        }, timer);
    });
};

let job1 = doWork("刷牙", 3000, true);
console.log(job1);

