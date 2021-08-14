// const arr = [1,3,5,2];
// 請 依序 將對應的元素 i，丟進去 wait 函數，一秒後印出 1 second pass，
// 然後再過三秒後印出 3 seconds pass...
// 直到全部結束後印出 done，全部印完時長約為 10 秒。

const arr = [1,3,5,2];
let test = (value) => {
    return new Promise((res) => {
        setTimeout(() => {
            dt = new Date;
            res(`${value}:${dt.toISOString()}`);
        }, value * 1000)
    })
}

(async () => {
    for (let i = 0; i < arr.length; i++) {
        let result = await test(arr[i]);
        console.log(result);
    }
})();

