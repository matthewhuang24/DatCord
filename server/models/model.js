const { Pool } = require('pg');

const myURI = "postgres://uwznjnia:feulyI8mrDSqgqAkO4g82boU6-qI95V3@kashin.db.elephantsql.com/uwznjnia";

const URI = process.env.PG_URI || myURI;

// connects URI to database
const pool = new Pool({
  connectionString: URI
});

module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  }
}; 