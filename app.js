const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const feedRoutes = require('./Routes/feed');
const sequelize = require('./util/database');
const Student = require('./models/student');
const Teacher = require('./models/Teacher');
const Classroom = require('./models/classroom')
app.use(bodyParser.json());
app.use((req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET,POST,DELETE,PUT,PATCH');
    res.setHeader('Access-Control-Allow-Headers','Content-Type','Authorization');
    next();
})
app.use('/feed',feedRoutes);

sequelize.sync()
.then(result => {
    app.listen(8080);
})
