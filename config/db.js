const sqlite3 = require('sqlite3').verbose();
const knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: "./natyacharya_book_store.sqlite"
  },
  useNullAsDefault: true
});

module.exports = knex