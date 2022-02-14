import React, { useState, useEffect, useRef } from "react";
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import io from 'socket.io-client';


import './styles/Chat.css';

import Game from './Game';
import Chat from './Chat';
import PlayAgain from './PlayAgain';
import DisplayMessage from './DisplayMessage';
import {calculateWinner, calculateDraw} from '../../server/gameLogic';

let socket;

const App = (props) => {
    
    //react hooks
    const [name, setName] = useState('');
    const [room, setRoom] = useState(1);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const messagesEndRef = useRef(null);

    const [player, setPlayer] = useState({});
    const [dis, setDis] = useState('Awaiting Opponent');

    const [square, setSquare] = useState('');
    const [squares, setSquares] = useState([]);
    const [gameGrid, setGameGrid] = useState({
        game_grid: [],
        game_over: false,
        winner: '',
        reset: false
    });

    const [error2, setError2] = useState('');

    let counter = 0;

    //combine componentDidUpdate, componentDidMount
    useEffect(()=>{
        socket = io();
        const {name, room} = props.user;

        setName(name);
        setRoom(room);

        let gamesqs = [];
        let bttns;

        for(let i = 0; i <= 8; i++) {
            bttns = document.getElementById(i);
            gamesqs.push(bttns);
        }
        
        setGameGrid({...gameGrid, game_grid: gamesqs});

        socket.emit('join', {name, room}, (error)=>{
            if(error){
                    setError2(error);
            }
        });

        return ()=>{
            socket.emit('leave');
            socket.off();
        }
    },[props]);

    useEffect(()=>{
        socket.on('message', (message)=>{
            setMessages([...messages, message]);
        })
    },[messages]);

    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages]);

    useEffect(() => {

        socket.on('recieveMove', (sqID, usr, opp) => {
            let bttn = document.getElementById(sqID);
           
            bttn.style.fontSize = "x-large";
            bttn.innerText = usr.letter;
            bttn.dataset.clicked = "true";
            counter++;
            
            //check winner
            if(calculateWinner(gameGrid)){
                setGameGrid({...gameGrid, game_over: true, winner: usr.name}); 
            }
            else if(calculateDraw(counter)){
                setGameGrid({...gameGrid, game_over: true});
            }
            
        }), [gameGrid];

        socket.on('turn.change2', (usr) => {
            setDis(`${usr.name}'s turn`);
        });

        socket.on('display.winner', (usr) => {
            setDis(`${usr} WINS!!`);
        });

        socket.on('reset.board', () => {
            let gamesqs = [];
            let bttn;
            for(let i = 0; i <= 8; i++) {
                bttn = document.getElementById(i);
                bttn.innerText = '';
                bttn.dataset.clicked = "false";
                bttn.style.backgroundColor = "";
                gamesqs.push(bttn);
            }
        
            counter = 0;
            setGameGrid({...gameGrid, game_over: false, winner: '', game_grid: gamesqs, reset: true});
            
            
        },);

        if(gameGrid.game_over === true ) {
            if(gameGrid.winner)
                socket.emit('game.over', gameGrid.winner);
            else
                socket.emit('draw');
        }

    }, [gameGrid]);

    useEffect(()=>{
        socket.on('player', (usr)=>{
          setPlayer(usr.player);
        });

        socket.on('say.bye', () => {
            setDis(`Awaiting Opponent`);
        })

    },[squares]);

    const sendMessage = (event) =>{
        event.preventDefault();
        if(message){
            socket.emit('sendMessage', message, ()=> setMessage(''));
        }
    }

    const callSendMove = (square) =>{
        let bttn = document.getElementById(square.id);
        
        if(bttn.dataset.clicked === "false") {
            socket.emit("move.made", square.id);
        }

    };

    const ResetGrid = () => {
        if(gameGrid.reset === false)
            socket.emit("clear.board", square.id);
        else
            setGameGrid({...gameGrid, reset: false});
    };

    const isGameOver = gameGrid.game_over;
    if(error2) {
        alert(error2);
        return(
            <Redirect to='/Home' />
        )
    }
    else{
        return (
            <div>
                <div className = "gameMessage">
                    <DisplayMessage player={player} dis={dis} />
                </div>
                <div className="app">
                    <div className = "chatt">
                        <Chat sendMessage={sendMessage} message={message} messages={messages} messagesEndRef={messagesEndRef} setMessage={setMessage}/>
                    </div>
                <div className = "game">
                    <Game isGameOver={isGameOver} setSquare={setSquare} player={player} callSendMove={callSendMove}/>
                </div>
                <PlayAgain gameGrid={gameGrid} ResetGrid={ResetGrid}/> 
            </div>
          </div>
        );
    }
    
}
 
const mapStateToProps = (state) => state;
  
export default connect(mapStateToProps, null)(App);
