/**
 * 模擬非同步的工作
 * @param {string} thing 要做的事
 * @param {number} timer 所需的時間
 * @param {function} cb callback function
 */
let doWork = function (thing, timer, cb) {
    setTimeout(() => {
        let dt = new Date();
        //callback 設計
        //cb(error, 要回復的資料)
        cb(null, `完成事情： ${thing} at ${dt.toISOString()}`);
    }, timer);
};

let dt = new Date();
console.log(`開始時間： ${dt.toISOString()}`);
//起床甦醒 -> 划手機 -> 玩遊戲 -> 刷牙洗臉 -> 吃午餐 -> 睡午覺 

// 解決: 接續做的工作
// ---> 動作如果要接續著做，只能把下一個動作放在上一個動作的 callback
//   --> callback hell

doWork('起床甦醒', '3000', (err, data) => {
    if (err) {
        console.log('錯誤', err);
        return;
    }
    console.log(data);

    doWork('划手機', '5000', (err, data) => {
        if (err) {
            console.log('錯誤', err);
            return;
        }
        console.log(data);

        doWork('玩遊戲', '8000', (err, data) => {
            if (err) {
                console.log('錯誤', err);
                return;
            }
            console.log(data);

            doWork('刷牙洗臉', '3000', (err, data) => {
                if (err) {
                    console.log('錯誤', err);
                    return;
                }
                console.log(data);
    
                doWork('吃午餐', '3000', (err, data) => {
                    if (err) {
                        console.log('錯誤', err);
                        return;
                    }
                    console.log(data);
        
                    doWork('睡午覺', '3000', (err, data) => {
                        if (err) {
                            console.log('錯誤', err);
                            return;
                        }
                        console.log(data);
                    });
                });
            });
        });
    });
});