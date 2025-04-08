import Ship from './Ship';

class GameBoard{
  constructor(size){
    this.size = size;
    this.board = this.createBoard(this.size);
    this.ships = this.createShips();
  }

  createShips = ()=> [new Ship(5,'A'),new Ship(4,'B'),new Ship(3,'C'), new Ship(3,'S'), new Ship(2,'D')];

  createBoard = (size)=> new Array(size).fill().map(()=> new Array(size).fill(0));

  resetBoard = ()=> this.board.map(row => row.fill(0));

  checkAttack = (y,x)=>( this.board[y][x] === 1 || this.board[y][x] === 'X');

  findShip = (y,x) => this.ships.find(ship => ship.symbol === this.board[y][x]);

  receiveAttack = (y,x)=>{
    if(this.checkAttack(y,x))return;

    const msgHit = ['Direct hit! The enemy ship is on fire!','Target locked and hit! The ship is damaged!','Bullseye! The enemy fleet is shaking!','Success! Enemy vessel struck with precision!','Impact confirmed! Heavy damage inflicted!'];

    const msgSunk = ['"You sank the enemy ship! The seas are yours!','Ship down! The enemy fleet is falling apart!','Victory! You have sent the ship to the depths!','Another vessel destroyed! The tides are turning!','The enemy ship is no more! The waves are quiet for now..."'];

    const msgFail = ['Missed! The shot splashes into the empty waters','Miss! The sea mocks your aim','No hit! The enemy ship remains unscathed','Splash! Just water, no ships here','Empty ocean… better luck next time!'];

    let msg;
    const random = Math.floor(Math.random() * msgHit.length);
    const ship = this.findShip(y,x);

    if(ship && !ship.sunk){
      ship.hit();
      ship.isSunk();
      msg = ship.sunk? msgSunk[random] :  msgHit[random];
      this.board[y][x] = 1;
      return{symbol: ship.symbol, message: msg};
    }
    else{
      this.board[y][x] = 'X';
      msg = msgFail[random];
      return msg;
    }

  };

  checkNeighbors = (x, y) => {
    const directions = [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1],
      [-1, -1],
      [1, -1],
      [-1, 1],
      [1, 1]
    ];

    for (const [dx, dy] of directions) {
      const nx = x + dx;
      const ny = y + dy;
      if (
        nx >= 0 &&
        ny >= 0 &&
        nx < this.board[0].length &&
        ny < this.board.length &&
        this.board[ny][nx] !== 0
      ) {
        return false;
      }
    }
    return true;
  };
  checkPosition = (ship, x, y, orientation) => {

    if (orientation === 'horizontal') {

      if (ship.length + x > this.board[0].length) return false;

      for (let i = 0; i < ship.length; i++) {
        if (this.board[y][x + i] !== 0 || !this.checkNeighbors( x + i, y)) {
          return false;
        }
      }
    } else if (orientation === 'vertical') {
      if (ship.length + y > this.board.length) return false;

      for (let i = 0; i < ship.length; i++) {
        if (this.board[y + i][x] !== 0 || !this.checkNeighbors( x, y + i)) {
          return false;
        }
      }
    }
    return true;
  };


  placeShips = () => {

    this.ships.forEach(ship => {
      const orientation = Math.random() > .5? 'horizontal' : 'vertical';

      while (!ship.isPlaced) {
        const x = Math.floor(Math.random() * this.board[0].length);
        const y = Math.floor(Math.random() * this.board.length);
        if (this.checkPosition(ship, x, y,orientation)) {
          if (orientation === 'horizontal') {
            for (let i = 0; i < ship.length; i++) {
              this.board[y][x + i] = ship.symbol;
            }
          } else if (orientation === 'vertical') {
            for (let i = 0; i < ship.length; i++) {
              this.board[y + i][x] = ship.symbol;
            }
          }
          ship.isPlaced = true;
        }
      }
    });
  };

  displaceShips = ()=> this.ships.forEach(ship => ship.isPlaced = false);

  resetShipsHits = ()=> this.ships.forEach(ship => ship.hits = 0);
}


export default GameBoard;