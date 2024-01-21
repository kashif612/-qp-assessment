const db = require('../database/db')

exports.Available_grocery = async(req, res)=>{
    try {
        const [rows] = await db.execute('SELECT id, name, price, quantity FROM grocery_items');
        const availableItems = rows.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          available_quantity: item.quantity,
        }));
        res.json({ status: 'success', data: availableItems });
      } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
      }
}