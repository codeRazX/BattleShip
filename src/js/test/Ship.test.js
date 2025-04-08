import Ship from "../Ship";

describe('Ship class', () => {
  test('should create a ship with a given length and a symbol', () => {
    const ship = new Ship(5,"D");
    expect(ship.length).toBe(5);
    expect(ship.symbol).toBe("D");
  });

  test('should register a hit on the ship', () => {
    const ship = new Ship(5,"D");
    ship.hit();
    expect(ship.hits).toBe(1);
  });

  test('should mark the ship as sunk after receiving enough hits', () => {
    const ship = new Ship(3,"D");
    ship.hit();
    ship.hit();
    ship.hit();
    ship.isSunk();
    expect(ship.sunk).toBe(true);
  });

  test('should not be sunk if it hasn\'t received enough hits', () => {
    const ship = new Ship(3,"D");
    ship.hit();
    ship.isSunk();
    expect(ship.sunk).toBe(false);
  });

});


