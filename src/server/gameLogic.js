const calculateWinner = (gameboard)=>{
	const {game_grid} = gameboard;

	const win_lines = [
		[0,1,2],
		[3,4,5],
		[6,7,8],
		[0,3,6],
		[1,4,7],
		[2,5,8],
		[0,4,8],
		[2,4,6],
	];

	 if(game_grid.length >= 1) {
		for (let i = 0; i < win_lines.length; i++) {
			const [a, b, c] = win_lines[i];
			if ((game_grid[a].innerText === 'X' || (game_grid[a].innerText === 'O')) && (game_grid[a].innerText === game_grid[b].innerText) && (game_grid[b].innerText === game_grid[c].innerText)) {
				game_grid[a].style.backgroundColor = "green";
				game_grid[b].style.backgroundColor = "green";
				game_grid[c].style.backgroundColor = "green";
				
				return true;
			}
		}
		
	}
	return false;	
}


const calculateDraw = (count)=>{
    if(count === 9)
      return true;
    else
      return false;
}

module.exports = {
    calculateWinner, calculateDraw
}