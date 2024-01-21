const db = require('../database/db')
exports.manage_inventory = async(req, res)=>{
  try {
    const itemId = req.params.itemId;
    const { price, quantity } = req.body;

    if(!itemId){
      res.status(401).json({message: "Please provide a valid item id"})
    }
    const checkItemQuery = 'SELECT * FROM grocery_items WHERE id = ?';
    const [existingItem] = await db.execute(checkItemQuery, [itemId]);

    if (!existingItem || existingItem.length == 0) {
      return res.status(404).json({ message: 'Item not found' });
    }

    const updateFields = [];
    const updateValues = [];

    if (price) {
      updateFields.push('price = ?');
      updateValues.push(price);
    }

    if (quantity) {
      updateFields.push('quantity = ?');
      updateValues.push(quantity);
    }

    const updateQuery = `UPDATE grocery_items SET ${updateFields.join(', ')} WHERE id = ?`;
    const updateParams = [...updateValues, itemId];

    await db.execute(updateQuery, updateParams);

    res.json({ status: 'success', message: 'Item updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', message: 'Internal Server Error' });
  }

}