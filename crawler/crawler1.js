const axios = require('axios');
const moment = require('moment');

console.log(moment().format('YYYYMMDD'));

axios.get('https://www.twse.com.tw/exchangeReport/STOCK_DAY', {
    params:{
        response: 'json',
        date: moment().format('YYYYMMDD'),
        stockNo: 2330
    },
})
    .then(res => {
        console.log(res.data);
    })
    .catch(err => {
        console.error(err);
    })