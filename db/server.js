const mysql = require ("mysql2");

    const connection = mysql.createConnection({
          host: 'localhost',
          // MySQL username,
          user: 'root',
          // MySQL password
          password: 'root',
          database: 'organization'
        });
        console.log(`Connected to the organization database.`)


module.exports = connection;
