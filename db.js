const { Sequelize } = require('sequelize'); //Q: Why is this Sequelize capitalized?
//A: Because its a class reference not the instance
const path = require('path'); //a node native module

//Q: What are we creating down below?
//A: new database 
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.join(__dirname, 'db.sqlite'), //quick way to get the path for our db
});

//Q: Why are we exporting lowercase sequelize?
//A:We have to export the created database
module.exports = {sequelize};
