const pool = require('../db');
const md5 = require('md5');



const getUser = async(user,pass)=>{
    
    const query = 'SELECT * FROM users WHERE user_name = ?  AND user_pass = ?';
    const row = await pool.query(query,[user,md5(pass)]);
    return row[0]

}
module.exports = getUser;