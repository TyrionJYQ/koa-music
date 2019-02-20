const musicDB = require('../db');

module.exports = {
  findMusicsByUid: id => musicDB.q('SELECT * FROM musics WHERE uid = ?', [id]),
  addMusicByMusicInfo: (...args) => musicDB.q('INSERT INTO musics (title, singer, time,file, filelrc, uid) VALUES (?, ?, ?, ?, ?, ?)', args)
}