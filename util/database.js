/* const Sequelize = require('sequelize');

const sequelize = new Sequelize('testingsample', 'root', 'San@1302', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize; */

const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const mongoConnect = (callback) => {
       MongoClient.connect('mongodb+srv://new_user_13:nHBQJFWuW9YYRU6U@cluster0-zzeqv.mongodb.net/test?retryWrites=true&w=majority')
       .then(client => {
           console.log(client);
           console.log('Connected');
       })
       .catch(err => {
           console.log(err);
       });
}

module.exports = mongoConnect;