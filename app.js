const path = require('path')
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const feedRoutes = require('./Routes/feed');
const homeRoutes = require('./Routes/home');
const dataEntryRoutes = require('./Routes/dataEntry');
const Message = require('./models/messages');

const mongoose = require('mongoose');
// const mongoConnect = require('./util/database');

const Student = require('./models/student');
const Teacher = require('./models/teacher');
const Classroom = require('./models/classroom')

app.set('view engine', 'ejs');
app.set('views', 'Views');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use((req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET,POST,DELETE,PUT,PATCH,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers','Content-Type,Authorization');
    next();
})

 app.use('/feed',feedRoutes);
 app.use('/',homeRoutes);
 app.use(dataEntryRoutes);


/* sequelize.sync()
.then(result => {
    app.listen(8080);
}) */

/* mongoConnect(client => {
     console.log(client);   
     app.listen(8080);
}) */

mongoose.connect('mongodb+srv://new_user_13:bOTBg8Qax5cTD9in@cluster0-zzeqv.mongodb.net/class')
.then(result => {
    const server = app.listen(8080);
    const io = require('./socket').init(server);
    var clients = new Object() ;
    io.on('connection',socket => {
        //console.log('Client Connected');

        socket.on('StudentOnline', data => {
           // console.log(socket.id + '  sa' +  data.userName);
            clients[data.userName] = socket.id;
            console.log(data.userName);
            Message.find()
            .where('studentRoll').equals(data.userName)
            .exec(function (err,docs) {
                if(err)
                console.log(err);

                else{
                    if(!docs)
                    {
                        // 
                    }

                    else{
                         // console.log('hello');  
                       // io.to(clients[data.userName]).emit('PastMessages', { docs : docs });
                       io.to(clients[data.userName]).emit('MessangerList', { docs : docs });
                    }

                }
            })
        })

         socket.on('TeacherOnline', data => {
             // console.log(socket.id + '  sa' +  data.userName);
             clients[data.userName] = socket.id;
             console.log(data.userName);
             Message.find()
                 .where('teacherRoll').equals(data.userName)
                 .exec(function (err, docs) {
                     if (err)
                         console.log(err);

                     else {
                         if (!docs) {
                             // 
                         } else {
                             // console.log('hello');  
                             io.to(clients[data.userName]).emit('MessangerList', { docs: docs });
                         }

                     }
                 })
         })
        
        socket.on('msgFromStudent',data => {

            Message.findOne()
            .where('studentRoll').equals(data.msgData.from)
            .where('teacherRoll').equals(data.msgData.to)
            .exec(function(err,doc) {
                if(err)
                console.log(err);

                else{
                    
                    if(!doc)
                    {
                        const message = new Message({
                            studentRoll : data.msgData.from,
                            teacherRoll : data.msgData.to
                        });

                        message.messages.push({
                            name : data.msgData.name,
                            roll : data.msgData.from,
                            message : data.msgData.msg
                        })
                           io.to(clients[data.msgData.to]).emit('message', {
                               msg: data.msgData.msg,
                               name: data.msgData.name,
                               roll: data.msgData.from,
                               doc: message,
                                OldOrNew : 'new'
                           });
                           io.to(clients[data.msgData.from]).emit('message', {
                                msg: data.msgData.msg,
                                name: data.msgData.name,
                                roll : data.msgData.from,
                                doc: message,
                                OldOrNew : 'new'
                           });
                        message.save();
                    }

                   else {
                         doc.messages.push({
                             name: data.msgData.name,
                             roll: data.msgData.from,
                             message: data.msgData.msg
                         })
                          
                          io.to(clients[data.msgData.to]).emit('message', {
                              msg: data.msgData.msg,
                              name: data.msgData.name,
                              roll: data.msgData.from,
                               doc: doc,
                              OldOrNew: 'old'
                          });
                          io.to(clients[data.msgData.from]).emit('message', {
                               msg: data.msgData.msg,
                               name: data.msgData.name,
                               roll : data.msgData.from,
                              doc: doc,
                              OldOrNew: 'old'
                          });
                          
                         doc.save();
                   }  

                }
            })


         
        })

         socket.on('msgFromTeacher', data => {

             Message.findOne()
                 .where('studentRoll').equals(data.msgData.to)
                 .where('teacherRoll').equals(data.msgData.from)
                 .exec(function (err, doc) {
                     if (err)
                         console.log(err);

                     else {

                         if (!doc) {
                             const message = new Message({
                                 studentRoll: data.msgData.to,
                                 teacherRoll: data.msgData.from
                             });

                             message.messages.push({
                                 name: data.msgData.name,
                                 roll: data.msgData.from,
                                 message: data.msgData.msg
                             })
                            
                              io.to(clients[data.msgData.to]).emit('message', {
                                msg: data.msgData.msg,
                                name: data.msgData.name,
                                roll : data.msgData.from,
                                doc : message,
                                OldOrNew : 'new'
                            });

                            io.to(clients[data.msgData.from]).emit('message', {
                                msg: data.msgData.msg,
                                name: data.msgData.name,
                                roll: data.msgData.from,
                                 doc : message,
                                OldOrNew : 'new'
                            });
                             message.save();
                         } 
                         
                         else {
                             doc.messages.push({
                                 name: data.msgData.name,
                                 roll: data.msgData.from,
                                 message: data.msgData.msg
                             })

                             io.to(clients[data.msgData.to]).emit('message', {
                                 msg: data.msgData.msg,
                                name: data.msgData.name,
                                roll : data.msgData.from, 
                                doc : doc,
                                OldOrNew : 'old'
                            });

                            io.to(clients[data.msgData.from]).emit('message', {
                                msg: data.msgData.msg,
                                name: data.msgData.name,
                                roll: data.msgData.from,
                                 doc : doc,
                                OldOrNew : 'old'
                            });

                             doc.save();
                         }

                     }
                 })


            

         })
       // io.emit('message',{msg : 'hey guys'});

    })
    
    console.log('Connected');
})
.catch(err => console.log(err));