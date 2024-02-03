
const dbConfig = require("../config/db.config");
const Sequelize = require("sequelize");
const { applyExtraSetup } = require('./extra-setup');
const database = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  },
  define: {
    charset: 'utf8mb4',
    collate: 'utf8mb4_unicode_ci'
  }
});

const db = {};
db.Sequelize = Sequelize;
db.databaseConf = database;
db.PolicyHolder = require("./PolicyHolder.model")(database, Sequelize);
db.IntroductionRelationship = require("./IntroductionRelationship.model")(database, Sequelize);

applyExtraSetup(database);

module.exports = db;


