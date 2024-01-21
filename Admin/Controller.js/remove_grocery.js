const db = require('../database/db')
exports.remove_grocery = async(req, res) =>{
    try {
        const itemId = req.params.itemId;
        if (!itemId) {
          return res.status(401).json({ message: "Please provide a valid item id" });
        }
      
        const checkItemQuery = 'SELECT * FROM grocery_items WHERE id = ?';
        const [existingItem] = await db.execute(checkItemQuery, [itemId]);
      
        if (!existingItem || existingItem.length === 0) {
          return res.status(404).json({ message: 'Item not found' });
        }
        await db.execute('DELETE FROM grocery_items WHERE id = ?', [itemId]);
        res.json({ status: 'success', message: 'Grocery item removed successfully' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
      }
}