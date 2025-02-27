import Player from '../player';
import Ship from "../Ship";


describe('Player class', () => {
  let player;
  let opponent;
  let ship;

  beforeEach(() => {
    player = new Player();
    opponent = new Player();
    ship = new Ship(3);
    player.placeShip(0, 0, ship, 'horizontal');
  });

  test('should be able to attack the opponent', () => {
    const result = player.attack(0, 0, opponent);
    expect(result).toBe(true);
    expect(ship.hits).toBe(1);
  });

  test('should be able to make a random move', () => {
    jest.spyOn(Math, 'random').mockReturnValue(0.5); 
    const result = player.makeRandomMove(opponent);
    expect(result).toBe(false); 
  });
});