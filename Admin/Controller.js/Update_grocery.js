const db = require("../database/db")

exports.update_grocery = async(req, res) =>{
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
  
    const updatedItem = req.body;
  
    // Extract columns and values from the updatedItem object
    const columns = Object.keys(updatedItem).map(column => `${column} = ?`);
    const values = Object.values(updatedItem);
  
    // Construct the update query
    const updateQuery = `UPDATE grocery_items SET ${columns.join(', ')} WHERE id = ?`;
    const updateParams = [...values, itemId];
  
    // Execute the update query
    await db.execute(updateQuery, updateParams);
  
    res.json({ status: 'success', message: 'Grocery item updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', message: 'Internal Server Error' });
  }
  
}