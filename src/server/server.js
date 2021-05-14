const express = require('express');
const app = express();
const path = require('path');
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const {addUser, removeUser, getUser, getUsersInRoom} = require("./users");
const { callbackify } = require('util');
app.use(express.json())
app.use(express.static(__dirname + 'public'));
let clientPath = path.join(__dirname, 'public');
app.use(express.static(clientPath));
//console.dir(__dirname);
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', '/index.html'));
});
// io.on('connection', (socket) => {
//     console.log('a user joined');
//     socket.emit('serverToClient', "Hello There");
// });

//let rooms = 0;
// io.on('connection', (socket) => {
//     console.log('a user joined');
//     //socket.emit('serverToClient', "Hello There");

//     socket.on('join', (data)=>{
//         console.log(`name: ${data.name} room: ${data.room}`);
//         //console.log('in join',);
//     });

//     socket.on('chat message', (msg) => {
//         console.log('message: ' + msg); 
//         //io.emit('chat message', msg);
//     });

//     socket.on('disconnect', ()=>{
//         console.log('user disconnected');
//     })
// });
const init = async() => {
    try {
        io.on('connection', (socket) => {
            console.log('a user joined');
            //socket.emit('serverToClient', "Hello There");
        
            socket.on('join', (data, callback)=>{
                console.log(data, 'data');
                const {name, room} = data;
                console.log(`name: ${name} room: ${room}`);

                const {error, user} = addUser({id: socket.id, name: name, room: room});
                //console.log('in join',);
                if(error) return callback(error);

                //socket.join(user.room);
                console.log(user, 'user from server');

                socket.emit('message', {user: 'admin', text: `Welcome to the room ${user.name}`});
                //send to other sockets
                socket.broadcast.to(user.room).emit('message', {user: 'admin', text: `${user.name} has joined`});
                socket.join(user.room);

                callback();
            });
            
            socket.on('sendMessage', (message, callback)=> {
                const user = getUser(socket.id);
                console.log('in the message on server', message);
                io.to(user.room).emit('message', {user: user.name, text: message});

                callback();
            })

            socket.on('chat message', (msg) => {
                console.log('message: ' + msg); 
                //io.emit('chat message', msg);
            });
        
            socket.on('disconnect', ()=>{
                console.log('user disconnected');
            })
        });
        const port = process.env.PORT || 3000;

        server.listen(port, ()=>console.log(`listening on port ${port}`));
    }
    catch(ex) {
        console.log(ex);
    }
};

init();