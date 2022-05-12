const mysql = require ("mysql2");

    const server = mysql.createConnection({
          host: 'localhost',
          // MySQL username,
          user: 'root',
          // MySQL password
          password: 'root',
          database: 'organization'
        });
        console.log(`Connected`)


module.exports = server;
