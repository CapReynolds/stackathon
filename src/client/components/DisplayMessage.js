import React, { useState, useEffect } from "react";
import './styles/Start.css';

const DisplayMessage = (props) => {
    const {player, player_one_wins, player_two_wins} = props;
   
    const [turn_one, setTurnOne] = useState(false);
    const [turn_two, setTurnTwo] = useState(false);


    useEffect(() => {
        setTurnOne(player.ones_turn);
        setTurnTwo(player.twos_turn);

        // console.log(player.ones_turn, 'in the display player ones turn');
        // console.log(player.twos_turn, 'in the display player twos turn');
    });

    // if(player.player_one != '' && player.player_two != '')
        return (
            <div className = "displaymessage">
                <div className="grid-container2">
                    <div className={turn_one ? "score_turn" : "score"}>
                        <div>{player.player_one ? player.player_one : ''}</div>
                        <div>{player_one_wins}</div>
                    </div>
                    <div className={turn_two ? "score_turn" : "score"}>
                        <div>{player.player_two ? player.player_two : ''}</div>
                        <div>{player_two_wins}</div>
                    </div>  
                </div>
            </div>
        );
    //   else
    //     return (
    //         <div></div>
    //     )
}   

export default DisplayMessage;
