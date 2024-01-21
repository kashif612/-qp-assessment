const db = require('./db');

async function table() {
  const connection = await db.getConnection();
  await connection.execute(`
    CREATE TABLE IF NOT EXISTS grocery_items (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      price DECIMAL(10, 2) NOT NULL,
      quantity INT NOT NULL
    )
  `);
  await connection.execute(`
    CREATE TABLE IF NOT EXISTS bookings (
      id INT AUTO_INCREMENT PRIMARY KEY,
      item_id INT NOT NULL,
      quantity INT NOT NULL,
      FOREIGN KEY (item_id) REFERENCES grocery_items(id)
    )
  `);
  connection.release();
}

module.exports = table;
