class Ship{

  constructor(length = 0){
    this.length = length;
    this.hits = 0;
    this.sunck = false;
  }

  hit = ()=> {
    this.hits++;
    if(this.hits === this.length){
      this.sunck = true;
    }
  };

  isSunk = () => this.sunck;
}

export default Ship;