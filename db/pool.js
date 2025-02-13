const { Pool } = require("pg");
require("dotenv").config();

module.exports = new Pool({
  host: process.env.PGPRODHOST,
  user: process.env.PGPRODUSER,
  database: process.env.PGPRODDATABASE,
  password: process.env.PGPRODPASSWORD,
  port: process.env.PGPORT,
  ssl: "require",
});
