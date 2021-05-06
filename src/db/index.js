const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize(
  process.env.PGDATABASE,
  process.env.PGUSER,
  process.env.PGPASSWORD,
  { port: process.env.PGPORT, host: process.env.PGHOST, dialect: "postgresql" }
);

const Article = require("../db/articles")(sequelize, DataTypes);
const Author = require("../db/authors")(sequelize, DataTypes);
const Category = require("../db/categories")(sequelize, DataTypes);
const Review = require("../db/reviews")(sequelize, DataTypes);

Article.belongsTo(Author);
Author.hasMany(Article);
Article.hasMany(Review);
Article.hasOne(Category);
Review.belongsTo(Article);

sequelize
  .authenticate()
  .then(() => console.log("Connection established"))
  .catch((e) => console.log(e));

module.exports = { sequelize, Article, Author, Category, Review };
