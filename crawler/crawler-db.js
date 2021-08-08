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
    if (err) {
      console.error("資料庫連不上");
    }
  });

  // 不關閉連線，認為程式一直在執行
  connection.end();