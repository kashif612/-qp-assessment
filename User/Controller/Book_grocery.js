const db = require('../database/db')
exports.book_grocery = async(req, res)=>{
    try {
        const itemsList = req.body.items;
    
        for (const item of itemsList) {
          const [row] = await db.execute('SELECT quantity FROM grocery_items WHERE id = ?', [item.id]);
          if(row.length == 0){
            res.status(401).json({message: "Item not found"})
          }
          const availableQuantity = row[0].quantity;
    
          if (availableQuantity < item.quantity) {
            return res.status(400).json({ status: 'error', message: `Insufficient inventory for item with ID ${item.id}` });
          }
          const updatedQuantity = availableQuantity - item.quantity;
          await db.execute('UPDATE grocery_items SET quantity = ? WHERE id = ?', [updatedQuantity, item.id]);
        }
    
        for (const item of itemsList) {
          await db.execute('INSERT INTO bookings (item_id, quantity) VALUES (?, ?)', [item.id, item.quantity]);
        }
    
        res.json({ status: 'success', message: 'Booking successful' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
      }
}