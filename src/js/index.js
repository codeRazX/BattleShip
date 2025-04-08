import '../styles.css';
import GameBoard from './GameBoard';
import UI from './UI';
import Player from './Player';

document.addEventListener('DOMContentLoaded',()=>{
  const $ = el => document.querySelector(el);
  const $$ = el => document.getElementById(el);

  const textTurn = $('.text-turn');
  const textMessage = $('.text-message');
  const containerDefault = $('.container-default');
  const containerBoard = $$('container-board');
  const containerShipsDrag = $('.ships');
  const shipsDragDom = Array.from(containerShipsDrag.querySelectorAll('[data-ship]'));
  const randomBTN = $$('random-btn');
  const flipBTN = $$('flip-btn');
  const playBTN = $$('play-btn');
  const restartBTN = $$('restart-btn');


  //Unique instance UI
  const userInterface = new UI();

  //Create Board Instance
  const boardPlayer = new GameBoard(10);
  const boardComputer = new GameBoard(10);

  //Create Players Intances
  // eslint-disable-next-line quotes
  const player = new Player("Player's",'player',boardPlayer,true);
  // eslint-disable-next-line quotes
  const computer = new Player("Computer's",'computer',boardComputer,false);

  //Create grids dom
  containerBoard.append(player.grid,computer.grid);

  //Place Ships Computer Board
  boardComputer.placeShips();

  //Get All blocks childrens Board Player
  const allBlocks = Array.from(player.grid.children);



  const startGame = ()=>{
    if(userInterface.gameStarted)return;

    if(!boardPlayer.ships.every(ship => ship.isPlaced)){
      userInterface.showError('You must place your ships to start the game!',containerDefault);
      return;
    }
    randomBTN.classList.add('disabled-btn');
    restartBTN.classList.remove('disabled-btn');

    const error = containerDefault.querySelector('.error');
    if(error) error.remove();

    setTimeout(()=>textTurn.textContent = player.turnOf(),500);
    userInterface.gameStarted = true;
    playBTN.classList.add('disabled-btn');
  };

  const computerAttack = ()=>{

    const maxRandom = player.remainingCells.length;
    const randomCell = Math.floor(Math.random() * maxRandom);
    const cell = player.remainingCells[randomCell];

    computer.attack(cell,player,textMessage,userInterface.flag());

    if(computer.winner){
      userInterface.gameOver = true;
      textTurn.textContent = '';
      return;
    };

    setTimeout(()=>{
      if(!userInterface.gameStarted)return;
      textTurn.textContent = player.turnOf();
      player.turn = true;

    },1000);

  };

  const handleAttack = (e)=>{
    if(!userInterface.gameStarted || userInterface.gameOver)return;
    if(!e.target.classList.contains('cell')) return;
    if(!player.turn)return;

    if(player.turn && !computer.turn){

      player.attack(e.target,computer,textMessage,userInterface.flag());

      if(player.winner){
        textTurn.textContent = '';
        userInterface.gameOver = true;
        return;
      };

      if(!userInterface.gameStarted)return;
      textTurn.textContent = computer.turnOf();
      computer.turn = true;
    }
    setTimeout(()=>{
      if(!player.turn && computer.turn)computerAttack();
    },1000);
  };

  //Register init events
  registerEvents();

  function registerEvents(){

    //Start drag
    shipsDragDom.forEach(ship => ship.addEventListener('dragstart',(e)=>userInterface.dragStart(e,boardPlayer.ships)));

    //Over drag
    player.grid.addEventListener('dragover',(e)=>userInterface.dragOver(e,allBlocks,boardPlayer,userInterface.angle));

    //Drag drop
    player.grid.addEventListener('drop',(e)=>userInterface.dragDrop(e,boardPlayer,userInterface.angle,player.grid));

    //Drag Leave
    player.grid.addEventListener('dragleave',userInterface.dragLeave);

    //End drag
    shipsDragDom.forEach(ship => ship.addEventListener('dragend',(e)=>userInterface.dragEnd(e,allBlocks,boardPlayer,containerShipsDrag)));

    //Flip ships
    flipBTN.addEventListener('click',()=>userInterface.flip(shipsDragDom));

    //Insert Ships Player Randomly
    randomBTN.addEventListener('click',()=> userInterface.paintRandomlyShips(boardPlayer,containerShipsDrag,player.grid));

    playBTN.addEventListener('click',startGame);

    computer.grid.addEventListener('click', handleAttack);

    restartBTN.addEventListener('click',()=> userInterface.resetGame(player,computer,boardPlayer,boardComputer,playBTN,randomBTN,restartBTN,containerShipsDrag,textMessage,shipsDragDom,textTurn));
  };

});

