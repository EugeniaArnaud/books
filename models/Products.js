const async = require('hbs/lib/async');
const pool = require('../db');

const getProduct = async() =>{
    try{
        const query = 'select * from products';
        const row = await pool.query(query); 
        return row

    }catch(err){
        console.log(err);
    }
}

const oneProduct = async(id)=>{
    try{
      const query = 'Select * From products where id= ?'
      const row = await pool.query(query,[id])
      return row;
    }catch(err){
      console.log('error en el metodo oneproduct---->'+ err);
    }

}

const deleteProduct = async (id)=>{
try {
  const query = 'delete  from products where id = ?'
  const row = await pool.query(query,[id])
  return row
} catch (error) {
  console.log('error en el metodo deleteProduct---->'+ error);
}

}

const modifyProduct = async(data,id)=>{
  try{
    const query = "update products set ? where id = ?"

    const row = await pool.query(query,[data,id])
    return row;
  }catch(err){
    console.log('error en modifyProduct' + err)
  }
}



const addProduct = async (data) => {
    try {
      const query = "insert into products set ?";
      const row = await pool.query(query, [data]);
      return row;
    } catch (error) {
      console.log('error del addProduct------>'+ error);
    }
  };
module.exports = {getProduct, addProduct,oneProduct, deleteProduct,modifyProduct};