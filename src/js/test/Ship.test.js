import Ship from "../Ship";

describe('Ship class', () => {
  test('should create a ship with a given length', () => {
    const ship = new Ship(5);
    expect(ship.length).toBe(5);
  });

  test('should register a hit on the ship', () => {
    const ship = new Ship(5);
    ship.hit();
    expect(ship.hits).toBe(1);
  });

  test('should mark the ship as sunk after receiving enough hits', () => {
    const ship = new Ship(3);
    ship.hit();
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBe(true);
  });

  test('should not be sunk if it hasn\'t received enough hits', () => {
    const ship = new Ship(3);
    ship.hit();
    expect(ship.isSunk()).toBe(false);
  });
});


