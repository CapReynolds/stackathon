const users = [];
const letters = ['O', 'X'];
const addUser = ({id, name, room}) => {
    if(name != undefined)
        name = name.trim().toLowerCase();

    let player = '';
    let letter;
    let turn = false;
    let isConnected = null;
    let opponent = 0;
    const existingUser = users.find((user) => user.room === room && user.name === name);

    if(existingUser){
        return {
            error: 'Username already exists'
        }
    }

    let room_users = getUsersInRoom(room);

    //if a room user is awaiting an opponent
    if(room_users.length < 2){
        if(room_users.length === 0){
            player = 1;
            letter= 'X';
            turn = true;
            opponent;
            isConnected;
        }
        else if(room_users.length === 1){
            if(room_users[0].player ===1) {
                player = 2;
                letter= 'O';
                turn = false;
                opponent = room_users[0].id;
                isConnected;
            }
            else {
                room_users[0].player === 1;
                room_users[0].turn === true;
                player = 2;
                letter= 'X';
                turn = false;
                opponent = room_users[0].id;
                isConnected;
            }
        }
    }
    else {
        return {
            error: 'The selected room is full, please select another room'
        }
    }

    const user = {id, name, room, player, letter, turn, opponent, isConnected};
    users.push(user);
    return {user}
}

const removeUser = (id)=>{
    const index = users.findIndex((user) => user.id === id);
    const user = getUser(id);
    letters.push(user.letter);
    if(index !== -1){
        return users.splice(index, 1)[0];
    }
}
const getUser = (id) => {
    return users.find((user) => user.id === id);
}

const getUsersInRoom = (room) => {
    return users.filter((user) => user.room === room);
}

const getAllUsers = () => {
    return users;
}

const updateUser = (id, usr_array) => {
    if(usr_array[0].player === 1){
        usr_array[0].opponent = id;

    }
    else{
        usr_array[0].opponent = id;
    }
}

module.exports = {
    addUser,
    removeUser,
    getUser,
    getAllUsers,
    updateUser,
    getUsersInRoom

}