
class Player{

  constructor(player,id,gameBoard, turn){
    this.player = player;
    this.id = id;
    this.turn = turn;
    this.gameBoard = gameBoard;
    this.grid = this.createGrid();
    this.ships = this.gameBoard.ships;
    this.winner = false;
    this.remainingCells = [...this.grid.children];
  }


  clearGrid = ()=>{
    this.remainingCells = [...this.grid.children];
    this.remainingCells.forEach(cell =>{
      if(cell.classList.contains('splash-cell')){
        cell.classList.remove('splash-cell');
      }

      if(this.id !== 'player'){
        if(!cell.classList.contains('cell-enemy')){
          cell.classList.add('cell-enemy');
        }
      }

      if(cell.firstChild){
        cell.removeChild(cell.firstChild);
      }
    });


  };
  createGrid = ()=>{

    const size = this.gameBoard.board.length;
    const board = document.createElement('DIV');
    board.id = this.id;
    board.classList.add('board');

    for(let i = 0; i < size; i++){

      for(let j = 0; j < size; j++){

        const cell = document.createElement('DIV');
        cell.classList.add('cell');
        if(this.id !== 'player') cell.classList.add('cell-enemy');
        cell.dataset.y= i;
        cell.dataset.x = j;
        board.appendChild(cell);
      }
    }
    return board;
  };

  attack = (cell,player,textMessage,flag)=>{

    const cellHit = player.remainingCells.findIndex(block => block.dataset.x === cell.dataset.x && block.dataset.y === cell.dataset.y);

    if(cellHit === -1)return;


    const block = player.remainingCells[cellHit];
    const y = block.dataset.y;
    const x = block.dataset.x;
    const resultsAttack = player.gameBoard.receiveAttack(y,x);

    if(typeof resultsAttack === 'object'){

      if(this.id === 'player'){
        block.classList.remove('cell-enemy');
        block.classList.add(`ship-${resultsAttack.symbol}`);
      }
      block.appendChild(flag);
      textMessage.textContent = `${this.player}: ${resultsAttack.message}`;
    }
    else{
      textMessage.textContent = `${this.player}: ${resultsAttack}`;
      block.classList.add('splash-cell');
    }


    player.remainingCells.splice(cellHit,1);
    if(this.isLoose()){
      player.winner = true;
      textMessage.textContent = player.resultsWinner();
      return;
    }

    this.turn = false;
  };


  turnOf = ()=> this.player + ' turn';

  isLoose = ()=> this.ships.every(ship => ship.sunk);

  resultsWinner = ()=> this.player + ' Wins!';
}


export default Player;