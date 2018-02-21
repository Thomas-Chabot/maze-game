function getDirs(){ var d = [ ]; var c = [1, 2, 3, 4]; for (var i = 0; i < 4; i++) { var n = Math.floor(Math.random()*(c.length)); d[i] = c[n]; c.splice(n, 1);} return d; }
function generateMaze(maze, col, row) {
	if (!maze[col] || !maze[col][row] || maze[col][row] != 1) return;
	maze[col][row] = 0;
	var dirs = getDirs();
	var last = [col, row];
	for (var i = 0 ; i < dirs.length; i++){
		if (dirs[i] == 1)
			if (maze[col+2] && maze[col+2][row] == 1){
				maze[col+1][row] = 0;
				last = generateMaze(maze, col + 2, row);
			} else continue;
		else if (dirs[i] == 2)
			if (maze[col-2] && maze[col-2][row] == 1){
				maze[col-1][row] = 0;
				last = generateMaze(maze, col - 2, row);
			} else continue;
		else if (dirs[i] == 3)
			if (maze[col][row+2] == 1){
				maze[col][row+1] = 0;
				last = generateMaze(maze, col, row+2);
			} else continue;
		else if (dirs[i] == 4)
			if (maze[col][row-2] == 1){
				maze[col][row-1] = 0;
				last = generateMaze(maze, col, row-2);
			} else continue;
	}
	return last;
}
function mazeGen(numCols, numRows){
	var maze = [ ];
	for (var c = 0; c < numCols; c++){
		maze[c] = [ ];
		for (var r = 0; r < numRows; r++)
			maze[c][r] = 1;
	}
	end = generateMaze(maze,1,1);
	c = end[0];
	r = end[1];
	maze[c][r] = 2;
	return maze;
}
function outputMaze(maze, player) {
	var s = "";
	for (var c = 0; c < maze.length; c++) {
		for (var r = 0; r < maze[c].length; r++){
			if (c == player.c && r == player.r)
				s = s + " M ";
			else if (maze[c][r] == 0)
				s = s + "   ";
			else if (maze[c][r] == 2)
				s = s + " X ";
			else if (maze[c][r] == 3)
				s = s + " O ";
			else
				s = s + " ■ ";
		}
		s = s + "\n";
	}
	console.log (s);
	//console.clear();
	//console.mazeLog(s);
	mazeOut.log(s);
}
function moved(maze, player){
	outputMaze(maze, player);
	if (maze[player.c][player.r] == 2){
		maze[player.c][player.r] = 4; // mark as an 'already won' spot, don't win again
		console.log("You won!");
		gameWin();
	}
}
// Up: 38
// Down: 40
// Left: 37
// Right: 39
function attemptWalk(maze, player, key) {
	var n = player;
	var key = key.keyCode;
	if (key == 40)
		if (maze[player.c+1] && maze[player.c+1][player.r] != 1){
			n.c += 1;
		}else{}
	else if (key == 39)
		if (maze[player.c][player.r+1] != 1){
			n.r += 1;
		}else{}
	else if (key == 38)
		if (maze[player.c - 1] && maze[player.c-1][player.r] != 1) {
			n.c -= 1;
		} else{}
	else if (key == 37)
		if (maze[player.c][player.r - 1] != 1){
			n.r -= 1;
		}else{}
	moved(maze, n);
	return n;
}
function gameWin(){
	console.clear();
	setTimeout(gameStart,1000);
}
function gameStart(){
	var maze = mazeGen(41, 41);
	var player = {
		c: 1,
		r: 1
	}
	outputMaze(maze, player);
	document.onkeydown=function(key){ player = attemptWalk(maze, player, key);}
}
gameStart();
