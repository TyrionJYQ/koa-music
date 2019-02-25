const musicDB = require('../db');

module.exports = {
  findMusicsByUid: id => musicDB.q('SELECT * FROM musics WHERE uid = ?', [id]),
  addMusicByMusicInfo: (...args) => musicDB.q('INSERT INTO musics (title, singer, time,file, filelrc, uid) VALUES (?, ?, ?, ?, ?, ?)', args),
  findMusicsByid: id => musicDB.q('SELECT * FROM musics WHERE id = ?', [id]),
  updateMusic: (...music) => musicDB.q('UPDATE musics set title =?, singer = ?, time = ?, file = ?, filelrc = ? WHERE id = ?', music),
  deleteMusic: id => musicDB.q('DELETE FROM musics WHERE id = ?', [id])
}