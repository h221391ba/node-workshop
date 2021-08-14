let build = (data) => {
    return new Promise((res, rej) => {
        data.map((item) => {
            console.log('A');
            console.log('B');
            res(item);
        });
    });
};

let arr = [1, 2, 3];
console.log(arr.length);  //3

let newArr = arr.map((item) => {
    return item * 2;
});

console.log(arr);  //[1, 2, 3]
console.log(newArr);  //[2, 4, 6]