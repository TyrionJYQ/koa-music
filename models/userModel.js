const userDB = require('../db');

module.exports = {
  findUserByUsername: username => userDB.q('select * from users where username = ?', [username]),
  addUser: userInfo => userDB.q('INSERT INTO users (username, password, email) VALUES(?,?,?)', userInfo)
}