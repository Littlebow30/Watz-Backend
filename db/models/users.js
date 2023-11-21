const client = require('../client');
const bcrypt = require('bcrypt');
const SALT_COUNT = 10;

async function createUser ({username, password, firstName, lastName}) {
    const hashedPassword = await bcrypt.hash(password, SALT_COUNT);

    try {
        const {rows: [user]} = await client.query(`
        INSERT INTO users(username, password, firstName, lastName) VALUES($1, $2, $3, $4)
        ON CONFLICT (username) DO NOTHING
        RETURNING id, username `, [username, hashedPassword, firstName, lastName]);
        return user;
    } catch (error) {
        throw error;
    }
}

async function getUser({username, password}) {
    if (!username || !password) {
      return;
    }
  
    try {
      const user = await getUserByUsername(username);
      if(!user) return;
      const hashedPassword = user.password;
      const passwordsMatch = await bcrypt.compare(password, hashedPassword);
      if(!passwordsMatch) return;
      delete user.password;
      return user;
    } catch (error) {
      throw error;
    }
  }

  async function getUsers() {
    try {
        const { rows: users } = await client.query(`
            SELECT id, firstName, LastName, username, password FROM users
            `);
        
            return users;
        
    } catch(error) {
        throw error;
    }
}

  async function getUserById(userId) {
    // first get the user
    try {
      const {rows: [user]} = await client.query(`
        SELECT *
        FROM users
        WHERE id = $1;
      `, [userId]);
      // if it doesn't exist, return null
      if (!user) return null;
      // if it does:
      // delete the 'password' key from the returned object
      delete user.password; 
      return user;  
    } catch (error) {
      throw error;
    }
}

async function getUserByUsername(userName) {
    // first get the user
    try {
      const {rows} = await client.query(`
        SELECT *
        FROM users
        WHERE username = $1;
      `, [userName]);
      // if it doesn't exist, return null
      if (!rows || !rows.length) return null;
      // if it does:
      // delete the 'password' key from the returned object
      const [user] = rows;
      // delete user.password;
      return user;
    } catch (error) {
      console.error(error)
    }
  }
  module.exports = {
    createUser,
    getUser,
    getUserById,
    getUserByUsername,
    getUsers,
  }
  