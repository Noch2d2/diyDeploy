const environment = process.env.NODE_ENV || "development";
const config = require("../../knexfile")[environment];
const knex = require("knex")(config);
console.log("Using knex configuration for " + environment + " environment");
console.log(config);
module.exports = knex;
