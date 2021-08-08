const axios = require('axios');
const moment = require('moment');
const fs = require("fs");
const file = 'stock.txt';
const mysql = require('mysql');

require('dotenv').config()

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
});

connection.connect((err) => {
    if (err) console.error("資料庫連不上");
});

// 從檔案中取得股票代碼
let getStockCode = () => {
    return new Promise((res, rej) => {
        fs.readFile(file, 'utf8', (err, stockCode) => {
            (err) ? rej(err) : res(stockCode);
        })
    })
};

// 取得股票代碼在資料庫中的筆數
let queryStockCode = (stockCode) => {
    return new Promise((res, rej) => {
        connection.query(
            'SELECT * FROM stock WHERE stock_id = ?',
            [stockCode],
            (err, results) => {
                (err) ? rej(err) : res(results);
            });
    })
}

//取得股票資訊
let axiosGetStockInfo = (stockCode) => {
    return axios.get('https://www.twse.com.tw/exchangeReport/STOCK_DAY', {
        params: {
            response: 'json',
            date: moment().format('YYYYMMDD'),
            stockNo: stockCode
        }
    })
}

// 改寫資訊格式方便寫入資料庫
let parsedStockInfo = (stockInfo, stockCode) => {
    return stockInfo.map((item) => {
        item = item.map((value) => {
            return value.replace(/,/g, "");
        });
        item[0] = parseInt(item[0].replace(/\//g, ""), 10) + 19110000;
        item.unshift(stockCode);
        return item;
    })
}

// 將整理好的資料寫入資料庫
let insertStockData = (parsedData) => {
    return new Promise((res, rej) => {
        connection.query(
            'INSERT IGNORE INTO stock_price (stock_id, date, volume, amount, open_price, high_price, low_price, close_price, delta_price, transactions) VALUES ?',
            [parsedData],
            (err, results) => {
                (err) ? rej(err) : res(results);
            });
    })
}

(async () => {
    try {
        let stockCode = await getStockCode();
        let queryStockCodeResult = await queryStockCode(stockCode);
        if (queryStockCodeResult.length === 0) throw ('此股票代碼不在服務範圍內');
        let stockInfo = await axiosGetStockInfo(stockCode);
        stockInfo = stockInfo.data.data;
        if (stockInfo.length === 0) throw ('從證交所查到的資料有問題');
        let newStockInfo = parsedStockInfo(stockInfo, stockCode);
        let insertResult = await insertStockData(newStockInfo);
        console.info(insertResult);
    } catch (err) {
        console.log('-----------------------------');
        console.log(err);
    } finally {
        connection.end();
    }
})();