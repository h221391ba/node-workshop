//作業三
// 模擬一個非同步工作
function doWork (job, timer, isOK) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let dt = new Date();
            if (isOK) {
                resolve(`完成工作: ${job} at ${dt.toISOString()}`);
            } else {
                reject(`失敗了 ${job}`);
            }
        }, timer);
    });
};

let work = async ()=>{
    console.log(await doWork("刷牙", 3000, true),'\n',await doWork("吃飯", 3000, true),'\n',await doWork("洗澡", 3000, true));
}
work();


// job1
//     .then((result) => {
//         console.log('job1 finished', result);
//         return doWork('划手機', 5000, true);
//     })
//     .then((result) => {
//         console.log('job2 finished', result);
//         return doWork('玩遊戲', 8000, true);
//     })
//     .then((result) => {
//         console.log('job3 finished', result);
//     })
//     .catch((error) => {
//         console.log(error);
//     })
//     .finally(() => {
//         console.log('well done');
//     });

