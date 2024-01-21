const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'sql12.freesqldatabase.com', // Use the service name as the hostname
  user: 'sql12678383',
  password: '83eqCAmZTp',
  database: 'sql12678383',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = pool;
