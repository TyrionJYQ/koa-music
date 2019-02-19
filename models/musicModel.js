const musicDB = require('../db');

module.exports = {
  findMusicsByUid: id => musicDB.q('SELECT * FROM musics WHERE uid = ?', [id])
}