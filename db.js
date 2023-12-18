async function connect(){

  if (global.connection){
    return global.connection.connect();
  }

  const { Pool } = require("pg");
  const pool = new Pool({
    connectionString: process.env.CONNECTION_STRING
  });

  const client = await pool.connect();
  const res = await client.query('SELECT NOW()');
  console.log(res.rows[0]);
  client.release();

  global.connection = pool;
  
  return pool.connect();
};

connect();

async function selectUsers(){
  const client = await connect();
  const res = await client.query("SELECT * FROM users");
  return res.rows;
};

async function selectUser(id){
  const client = await connect();
  const sql = "SELECT * FROM users WHERE ID=$1";
  const values = [id];
  const res = await client.query(sql, values);

  return res.rows;
};

async function createUser(user){
  const client = await connect();
  const sql = "INSERT INTO users(name, age, profession) VALUES ($1, $2, $3)";
  const values = [user.name, user.age, user.profession];
  const res = await client.query(sql, values);
};

async function deleteUser(id){
  const client = await connect();
  const sql = "DELETE FROM users WHERE ID=$1";
  const values = [id];
  const res = client.query(sql, values);
};

async function updateUser(user, id){
  const client = await connect();
  const sql = "UPDATE users SET name=$1, age=$2, profession=$3 WHERE ID=$4";
  const values = [user.name, user.age, user.profession, id];
  const res = client.query(sql, values);
};

module.exports = {
  selectUsers,
  selectUser,
  createUser,
  deleteUser,
  updateUser
};
