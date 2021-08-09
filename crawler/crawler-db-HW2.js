const axios = require('axios');
const moment = require('moment');
const fs = require('fs/promises');
const file = 'stock.txt';
const mysql = require('mysql2/promise');
require('dotenv').config()

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

(async () => {
    const mysql = require('mysql2/promise');
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
    });
    try {
        let stockCode = await fs.readFile(file, 'utf8');
        const [queryStockCode] = await connection.execute(
            'SELECT * FROM stock WHERE stock_id = ?',
            [stockCode]
        );

        if (queryStockCode.length === 0) throw ('此股票代碼不在服務範圍內');
        let stockInfo = await axiosGetStockInfo(stockCode);
        stockInfo = stockInfo.data.data;
        if (stockInfo.length === 0) throw ('從證交所查到的資料有問題');
        let newStockInfo = parsedStockInfo(stockInfo, stockCode);
        
        const [insertResult] = await connection.query(
            'INSERT IGNORE INTO stock_price (stock_id, date, volume, amount, open_price, high_price, low_price, close_price, delta_price, transactions) VALUES ?',
            [newStockInfo],
        );

        console.info(insertResult);
    } catch (err) {
        console.log('-----------------------------');
        console.log(err);
    } finally {
        connection.end();
    }
})();