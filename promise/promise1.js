//作業三
// 模擬一個非同步工作
function doWork(job, timer, isOK) {
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

let work = async () => {
    console.log(
        await doWork("刷牙", 3000, true), '\n',
        await doWork("吃飯", 3000, true), '\n',
        await doWork("洗澡", 3000, true)
    );
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

function resolveAfter2Seconds(x) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(x);
      }, 2000);
    });
  }
  
  
  async function add1(x) {
    const a = await resolveAfter2Seconds(20);
    const b = await resolveAfter2Seconds(30);
    return x + a + b;
  }
  
  add1(10).then(v => {
    console.log(v);  // prints 60 after 4 seconds.
  });
  
  
  async function add2(x) {
    const p_a = resolveAfter2Seconds(20);
    const p_b = resolveAfter2Seconds(30);
    return x + await p_a + await p_b;
  }
  
  add2(10).then(v => {
    console.log(v);  // prints 60 after 2 seconds.
  });
