const pool = require('../database/db'); 

exports.add_grocery = async(req,res)=>{
  const newItem = req.body;

  try {
    if(!newItem.name){
      return res.status(401).json({message: "Please add the name of the grocery"})
    }
    if(!newItem.price){
      return res.status(401).json({message: "Please add the price of the grocery"})
    }
    if(!newItem.quantity){
      return res.status(401).json({message: "Please add the quantity of the grocery"})
    }
    const connection = await pool.getConnection();
    const [result] = await connection.execute('INSERT INTO grocery_items (name, price, quantity) VALUES (?, ?, ?)', [newItem.name, newItem.price, newItem.quantity]);
    connection.release();
    res.json({ status: 'success', message: 'Grocery item added successfully', insertedId: result.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', message: 'Internal Server Error' });
  }
  
  

}