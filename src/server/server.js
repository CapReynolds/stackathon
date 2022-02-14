const express = require('express');
const app = express();
const path = require('path');
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const {addUser, removeUser, getUser, getAllUsers, updateUser, getUsersInRoom} = require("./users");
app.use(express.json())
app.use(express.static(__dirname + 'public'));
let clientPath = path.join(__dirname, 'public');
app.use(express.static(clientPath));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', '/index.html'));
});

const init = async() => {
    try {
        io.on('connection', (socket) => {
            //console.log('a user joined');
        
            socket.on('join', (data, callback)=>{
                const {name, room} = data;

                const {error, user} = addUser({id: socket.id, name: name, room: room});
                
                //error adding a new user
                if(error) 
                    return callback(error);

                user.isConnected = socket.connected;

                socket.emit('message', {user: 'admin', text: `welcome to room ${user.room}, ${user.name}`});
                socket.emit('player', {player: user});

                //admin message to to other sockets
                socket.broadcast.to(user.room).emit('message', {user: 'admin', text: `${user.name} has joined`});
                socket.join(user.room);
                
                //to update opponent when a new user joins
                let users = getUsersInRoom(room);
                if(users.length === 2) {
                    updateUser(socket.id,users);
                    const user_opp = getUser(user.opponent);
                    io.in(user.room).emit('turn.change2',user_opp);
                }
            });
            
            socket.on('sendMessage', (message, callback)=> {
                const user = getUser(socket.id);
                io.to(user.room).emit('message', {user: user.name, text: message});
                callback();
            })

            socket.on("move.made", (squareID) => {   
                const user = getUser(socket.id);

                if(user.opponent) {
                    const user_opp = getUser(user.opponent);

                    //perform checks for whose turn it is 
                    if(user.turn === true) {
                        io.in(user.room).emit('recieveMove', squareID, user, user_opp);
                        user.turn = false;
                        user_opp.turn = true;
                        
                        io.in(user.room).emit('turn.change2',user_opp);}
                    else
                        console.log("not their turn");
                }
                
            });
            
            socket.on('game.over', ()=> {
                const user = getUser(socket.id);
                const user_opp = getUser(user.opponent);
                user.turn = false;
                user_opp.turn = false;
                io.in(user.room).emit('display.winner', user.name);
            });

            socket.on('clear.board', ()=> {
                const user = getUser(socket.id);
                const user_opp = getUser(user.opponent);

                user.turn = false;
                user_opp.turn = true;

                io.in(user.room).emit('turn.change2',user_opp);
                io.in(user.room).emit('reset.board');
            });

            socket.on('draw', ()=> {
                const user = getUser(socket.id);
                io.in(user.room).emit('display.draw');
            });

            socket.on('leave', ()=>{
                const user = getUser(socket.id);
               
                if(user){
                    let roomUsers;
                    roomUsers = getUsersInRoom(user.room);
                    
                  
                    if(roomUsers.length >= 1){
                        socket.broadcast.to(user.room).emit('message', {user: 'admin', text: `${user.name} has left. Board has been cleared`});
                        socket.broadcast.to(user.room).emit('reset.board');
                        io.in(user.room).emit('say.bye');
                        const user_opp = getUser(user.opponent);
                        if(user_opp != undefined){
                            user_opp.turn = true;
                            user_opp.opponent = null;
                        }
                    }
                    removeUser(socket.id);
                }
            });

            //on browser page close
            socket.on('disconnect', ()=>{
                const user = getUser(socket.id);
                console.log(user.name, ' has left');
                if(user){
                    let roomUsers;
                    roomUsers = getUsersInRoom(user.room);
                    
                  
                    if(roomUsers.length >= 1){
                        socket.broadcast.to(user.room).emit('message', {user: 'admin', text: `${user.name} has left. Board has been cleared`});
                        socket.broadcast.to(user.room).emit('reset.board');
                        io.in(user.room).emit('say.bye');
                        const user_opp = getUser(user.opponent);
                        if(user_opp != undefined){
                            user_opp.turn = true;
                            user_opp.opponent = null;
                        }
                    }
                    removeUser(socket.id);
                }
            });
        });
        const port = process.env.PORT || 3000;

        server.listen(port, ()=>console.log(`listening on port ${port}`));
    }
    catch(ex) {
        console.log(ex);
    }
};

init();