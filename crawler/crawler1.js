const axios = require('axios');
const moment = require('moment');
const fs = require("fs");
const file = 'stock.txt';

// console.log(moment().format('YYYYMMDD'));

fs.readFile(file, 'utf8', (err, stockCode) => {
    if (err) {
        console.log(err);
    } else {
        axios
            .get('https://www.twse.com.tw/exchangeReport/STOCK_DAY', {
                params: {
                    response: 'json',
                    date: moment().format('YYYYMMDD'),
                    stockNo: stockCode
                },
            })
            .then(res => {
                console.log(res.data.title);
            })
            .catch(err => {
                console.error(err);
            })
    }
})



