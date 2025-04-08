class Ship{

  constructor(length,symbol){
    this.length = length;
    this.hits = 0;
    this.sunk = false;
    this.symbol = symbol;
    this.isPlaced = false;
  }

  hit = ()=> this.hits++;
  isSunk = () => this.sunk = (this.hits === this.length);
}

export default Ship;