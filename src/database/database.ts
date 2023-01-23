import pg from "pg";

const { Pool } = pg;

const db = new Pool({
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: "copadomundo2306",
  database: "personal_library", // change database name

});

export default db;