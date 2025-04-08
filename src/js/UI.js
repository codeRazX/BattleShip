class UI{
  constructor(){
    this._currentShip = null;
    this.markedCells = [];
    this.angle = 0;
    this.gameStarted = false;
    this.gameOver = false;
    this.refHitComputer = null;
  }
  get currentShip() {
    return this._currentShip;
  }

  set currentShip(ship) {
    this._currentShip = ship;
  }

  flip = (shipsDrags)=>{
    this.angle = this.angle === 90? 0 : 90;
    shipsDrags.forEach(ship => ship.style.transform = `rotate(${this.angle}deg)`);
  };


  flag = ()=>{
    const flag = document.createElement('SPAN');
    flag.classList.add('flag');
    return flag;
  };

  showError = (msg,container)=>{
    if(container.querySelector('.error'))return;
    const error = document.createElement('P');
    error.classList.add('error');
    error.textContent = msg;
    container.appendChild(error);
    setTimeout(()=>error.remove(),4000);
  };

  insertRandomlyShips = (board,grid)=>{
    const size = board.length;

    for(let i = 0; i < size; i++){
      for(let j = 0; j < size; j++){
        if(board[i][j] !== 0){
          const cell = grid.querySelector(`[data-y="${i}"][data-x="${j}"]`);
          cell.classList.add(`ship-${board[i][j]}`);
        }
      }
    }
  };


  clearBoard = (grid)=>{

    const blockShips = grid.querySelectorAll('[class*="ship-"]');

    const regex = /^ship-/;

    blockShips.forEach(cell =>{

      cell.classList.forEach(className =>{
        if(regex.test(className)){
          cell.classList.remove(className);
        }
      });

    });

  };

  paintRandomlyShips = (boardPlayer,containerShipsDrag,grid)=>{
    const someOnePlaced = boardPlayer.ships.some(ship => ship.isPlaced);

    if(someOnePlaced){
      boardPlayer.displaceShips();
      boardPlayer.resetBoard();
      this.clearBoard(grid);
    }

    boardPlayer.placeShips();
    this.insertRandomlyShips(boardPlayer.board,grid);

    if(!containerShipsDrag.classList.contains('anim-dissapear')){
      containerShipsDrag.classList.add('anim-disappear');
      setTimeout(()=>containerShipsDrag.style.display ='none',400);
    }

  };


  dragStart = (e, boardShips)=>{
    e.target.classList.add('dragging-original-el');
    this.currentShip = boardShips.find(ship => ship.symbol === e.target.dataset.ship);
    e.dataTransfer.setData('type-ship', e.target.dataset.ship);
  };

  dragOver = (e,allBlocks,boardPlayer,angle)=>{
    e.preventDefault();

    if(e.target.classList.contains('cell') && e.target.classList.length <= 1){
      const orientation = angle === 0? 'horizontal' : 'vertical';

      if(boardPlayer.checkPosition(this.currentShip,Number(e.target.dataset.x),Number(e.target.dataset.y),orientation)){
        const indexCell = allBlocks.findIndex(cell => cell === e.target);

        for(let i = 0; i < this.currentShip.length; i++){
          const offset = orientation === 'horizontal'? i : i * boardPlayer.board.length;
          allBlocks[indexCell + offset].classList.add('dragging-target');
          if (!this.markedCells.includes(allBlocks[indexCell + offset])) {
            this.markedCells.push(allBlocks[indexCell + offset]);
          }
        }

      }

    };
  };

  dragDrop = (e, boardPlayer, angle, grid)=>{
    e.preventDefault();
    if(boardPlayer.ships.every(ship => ship.isPlaced))return;
    if(!e.target.classList.contains('cell'))return;

    e.target.classList.remove('dragging-target');
    const y = parseInt(e.target.dataset.y);
    const x = parseInt(e.target.dataset.x);
    const orientation = angle === 0? 'horizontal' : 'vertical';
    const shipTransfer = e.dataTransfer.getData('type-ship');
    const ship = boardPlayer.ships.find(ship => ship.symbol === shipTransfer);


    if(boardPlayer.checkPosition(ship,x,y,orientation)){
      for(let i = 0; i < ship.length; i++){
        orientation === 'horizontal'?  boardPlayer.board[y][x+i] = ship.symbol :  boardPlayer.board[y + i][x] = ship.symbol;
      }
    }else return;

    this.insertRandomlyShips(boardPlayer.board, grid);
    document.querySelector(`[data-ship="${shipTransfer}"]`).style.display ='none';
    ship.isPlaced = true;

  };

  dragLeave = ()=>{

    if(this.markedCells.length <= 0)return;
    this.markedCells.forEach(block => block.classList.remove('dragging-target'));
  };

  dragEnd = (e,allBlocks,boardPlayer,containerShipsDrag)=>{
    e.target.classList.remove('dragging-original-el');
    allBlocks.forEach(block => {
      if(block.classList.contains('dragging-target')){
        block.classList.remove('dragging-target');
      }
    });

    if(boardPlayer.ships.every(ship => ship.isPlaced)){
      containerShipsDrag.classList.add('anim-disappear');
      setTimeout(()=>containerShipsDrag.style.display ='none',400);
    }
    this.markedCells = [];
    this.currentShip = null;
  };

  resetGame = (player,computer,boardPlayer,boardComputer,playBTN,randomBTN,restartBTN,containerDragShips,textMessage,previewShips,textTurn)=>{

    playBTN.classList.remove('disabled-btn');
    randomBTN.classList.remove('disabled-btn');
    boardComputer.displaceShips();
    boardPlayer.displaceShips();
    boardComputer.resetBoard();
    boardPlayer.resetBoard();
    player.clearGrid();
    computer.clearGrid();
    boardComputer.resetShipsHits();
    boardPlayer.resetShipsHits();
    this.clearBoard(player.grid);
    this.clearBoard(computer.grid);
    this.gameStarted = false;
    this.gameOver = false;
    textMessage.textContent = '';
    textTurn.textContent = '';
    containerDragShips.style.display = 'flex';
    containerDragShips.classList.remove('anim-disappear');
    computer.turn = false;
    player.turn = true;
    boardComputer.placeShips();
    restartBTN.classList.add('disabled-btn');
    this.angle = 0;
    previewShips.forEach(previewShip => {
      previewShip.style.display = 'block';
      previewShip.style.transform = `rotate(${this.angle}deg)`;
    });

  };
}

export default UI;
