const users = [];
const addUser = ({id, name, room}) => {
    name = name.trim().toLowerCase();
    //room = room.trim().toLowerCase();
    let player = '';
    const existingUser = users.find((user) => user.room === room && user.name === name);

    if(existingUser){
        return {
            error: 'Username already exists'
        }
    }

    if(users.length === 0){
        player = 'X';
    }
    else if(users.length === 1){
        player = 'O';
    }
    else {
        player = 'bystander';
    }

    const user = {id, name, room, player};
    users.push(user);
    return {user}
}

const removeUser = (id)=>{
    const index = users.findIndex((user) => user.id === id);

    if(index !== -1){
        return users.splice(index, 1)[0];
    }
}
const getUser = (id) => {
    return users.find((user) => user.id === id);
}

const getUsersInRoom = (room) => {
    users.filter((user) => user.room === room);
}

module.exports = {
    addUser,
    removeUser,
    getUser,
    getUsersInRoom
}