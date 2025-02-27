import GameBoard from './GameBoard';
import '../styles.css';

const containerBoard = document.getElementById('container-board');

const createGrid = ()=>{

  const board= new GameBoard(10).board;
  const gameBoard = document.createElement('DIV');
  gameBoard.classList.add('board');
  for(let x = 0; x < board.length; x++){

    for(let y = 0; y < board.length; y++){

      const cell = document.createElement('DIV');
      cell.classList.add('cell');
      cell.dataset.x = x;
      cell.dataset.y = y;
      gameBoard.append(cell);
    }
  }

  return gameBoard;
};
function registerInit(){

  containerBoard.append(createGrid(),createGrid());
  createGrid();
}

document.addEventListener('DOMContentLoaded',registerInit);

