class GameBoard{
  constructor(size){
    this.size = size;
    this.board = this.createBoard(this.size);
  }

  createBoard = (size)=>{
    const board = [];
    for(let i = 0; i < size; i++){
      board[i] = new Array(size).fill(0);
    }
    return board;
  };

}


export default GameBoard;