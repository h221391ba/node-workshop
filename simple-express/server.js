const express = require("express");
const connection = require('./utils/db.js');

// 利用 express 建立了一個 express application
let app = express();

app.use((req, res, next) => {
    let dt = new Date;
    // console.log(`middleware01${dt}`);
    next();
});

app.use((req, res, next) => {
    let dt = new Date;
    // console.log(`middleware02${dt}`);
    next();
});



// HTTP Method: get, post, put, patch, delete
app.get("/", function (request, response, next) {
    response.send("Hello");
});

app.get("/about", function (request, response, next) {
    response.send("about");
});

// 輸出json格式
app.get("/stock", async (req, res, next) => {
    let result = await connection.queryAsync('SELECT * FROM stock');
    res.json(result);
});


// 2330 2603 2618
// 攜帶變數
app.get("/stock/:stockCode", async (req, res, next) => {
    let result = await connection.queryAsync(
        'SELECT * FROM stock_price WHERE stock_id = ?',
        [req.params.stockCode]
    );
    (result.length == 0) ? res.redirect(404, '/stock') : res.json(result);
    
});

app.use((req, res, next) => {
    res.status(404).send('Sorry cant find that!');
});


app.listen(3000, function () {
    console.log("我們的 web server 啟動了～");
});