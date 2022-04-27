const mysql = require ("mysql2");

    const db = mysql.createConnection({
          host: 'localhost',
          // MySQL username,
          user: 'root',
          // MySQL password
          password: 'root',
          database: 'organization'
        },
        console.log(`Connected to the organization database.`)
    );
        
module.exports = db;
