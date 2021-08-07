const axios = require('axios');
const moment = require('moment');
const fs = require("fs");
const file = 'stock.txt';

// console.log(moment().format('YYYYMMDD'));

let getStockCode = () => {
    return new Promise((res, rej) => {
        fs.readFile(file, 'utf8', (err, stockCode) => {
            if (err) {
                rej(err);
            } else {
                res(stockCode);
            }
        })
    })
}

let axiosGet = (stockCode) => {
    return axios.get('https://www.twse.com.tw/exchangeReport/STOCK_DAY', {
        params: {
            response: 'json',
            date: moment().format('YYYYMMDD'),
            stockNo: stockCode
        }
    })
}

let homework = async () => {
    try {
        let stockCode = await getStockCode();
        let result = await axiosGet(stockCode);
        console.log(result.data.title);
    } catch (err) { 
        console.log(err);
    }

}

homework();

