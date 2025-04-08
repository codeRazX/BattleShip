import GameBoard from "../GameBoard";
import Ship from "../Ship";

describe("Gameboard class",()=>{
    const gameBoard = new GameBoard(10);
    const ship = new Ship(5,"A");
  
    test("The board should be a 10x10 multidimensional array filled with zeros",()=>{
        expect(Array.isArray(gameBoard.board)).toBe(true);
        expect(gameBoard.board.length).toBe(10);
        gameBoard.board.forEach(row => {
            expect(Array.isArray(row)).toBe(true);
            expect(row.length).toBe(10);
            expect(row.every(cell => cell === 0)).toBe(true);
        });
    });

    test("Place all ships randomly",()=>{
        gameBoard.placeShips();

        gameBoard.ships.forEach(ship => {
            expect(ship.isPlaced).toBe(true);
        });
    })
    test('Displace ships', ()=>{
        gameBoard.placeShips();
        gameBoard.displaceShips();

        expect(gameBoard.ships.every(ship => ship.isPlaced)).toBe(false);
    })
    test("Reset boat", ()=> {
        gameBoard.placeShips();
        gameBoard.resetBoard();

        gameBoard.board.flat().forEach(pos => expect(pos).toBe(0));
    })

  

})

describe('receiveAttack function', () => {
    let game;
  
    beforeEach(() => {
      game = new GameBoard();
      game.board = [
        [0, 0, 0],
        [0, 'D', 0],
        [0, 'D', 0],
      ];
     
    });
  
    it('should return a "hit" message when a ship is hit', () => {
      const result = game.receiveAttack(1, 1); 
      const hitMessages = ['Direct hit! The enemy ship is on fire!','Target locked and hit! The ship is damaged!','Bullseye! The enemy fleet is shaking!','Success! Enemy vessel struck with precision!','Impact confirmed! Heavy damage inflicted!'];
      expect(hitMessages).toContain(result); 
    });
  
    it('"It should return a "sunk" message and ship.sunk should be true', () => {
      game.ships[4].hit();
      const result = game.receiveAttack(2,1);
      const sunkMessages = ['"You sank the enemy ship! The seas are yours!','Ship down! The enemy fleet is falling apart!','Victory! You have sent the ship to the depths!','Another vessel destroyed! The tides are turning!','The enemy ship is no more! The waves are quiet for now..."'];
      expect(game.ships[4].sunk).toBe(true);
      expect(sunkMessages).toContain(result); 
    });
  
    it('should return a "fail" message when the attack misses', () => {
      const result = game.receiveAttack(0, 0);
      const failMessages = [
        'Missed! The shot splashes into the empty waters',
        'Miss! The sea mocks your aim',
        'No hit! The enemy ship remains unscathed',
        'Splash! Just water, no ships here',
        'Empty ocean… better luck next time!',
      ];
      expect(failMessages).toContain(result);
    });
  });