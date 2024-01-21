const pool = require('../database/db'); 

exports.fetch_grocery = async(req, res) =>{

  try {
    const [rows] = await pool.execute('SELECT * FROM grocery_items');
    if(rows.length > 1 ){
      return res.status(404).json({message: "Please add some grocery"})
    }else{
      res.json({ status: 'success', data: rows });

    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', message: 'Internal Server Error' });
  }
  
}