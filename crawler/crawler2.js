const axios = require('axios');
const moment = require('moment');
const fs = require("fs");
const file = 'stock.txt';

// console.log(moment().format('YYYYMMDD'));

new Promise((res, rej) => {
    fs.readFile(file, 'utf8', (err, stockCode) => {
        if (err) {
            rej(err);
        } else {
            res(stockCode);
        }
    })
})
    .then(result => {
        return axios.get('https://www.twse.com.tw/exchangeReport/STOCK_DAY', {
            params: {
                response: 'json',
                date: moment().format('YYYYMMDD'),
                stockNo: result
            }
        })

    })
    .then(result => {
        console.log(result.data.title);
    })
    .catch(err => {
        console.error(err);
    })




