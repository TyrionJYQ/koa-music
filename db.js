var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'koa_music'
});

// pool.getConnection(function (err, connection) {
//   if (err) throw err; // not connected!

//   // Use the connection
//   connection.query('SELECT * FROM users  WHERE 1 = ?', [1], function (error, results, fields) {
//     // When done with the connection, release it.
//     connection.release();

//     // Handle error after the release.
//     if (error) throw error;
//     console.log(results)
//     // Don't use the connection here, it has been returned to the pool.
//   });
// });

//封装数据库操作
function query(sql, dataArray) {
  return new Promise((res, rej) => {
    pool.getConnection((err, connection) => {
      if (err)  rej(err); 

      // Use the connection
      connection.query(sql, dataArray, (error, results, fields) => {
        console.log(sql, dataArray);
        // When done with the connection, release it.
        connection.release();
        // Handle error after the release.
        if (error) rej(error);
        console.log(results)
        res(results)
        // Don't use the connection here, it has been returned to the pool.
      });
    });
  }) 
  
}

module.exports = {
  query: query
}