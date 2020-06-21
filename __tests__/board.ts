import { ShipType } from './../src/types';
import Board from './../src/board';
import Battleship from './../src/battleship';

describe('Board', () => {
  let instance: Board; 
  beforeEach(() => {
    instance = new Board();
  });
  it('Should create 10 ships', async () => {
    expect(instance.getShips()).toHaveLength(10);
  });
  it('should place ship', async () => {
    instance.placeShip(ShipType.Submarine, { x: 0, y: 0 }, { x: 2, y: 0 });
    expect(instance.getShips().filter(ship => ship.placed)).toHaveLength(1)
  })
  it('should fail with outside board boundaries', async () => {
    expect(() => {
      instance.placeShip(ShipType.Submarine, { x: -1, y: 0 }, { x: 0, y: 0 })
    }).toThrow('Outside board boundaries!');
    expect(() => {
      instance.placeShip(ShipType.Submarine, { x: 11, y: 0 }, { x: 0, y: 0 })
    }).toThrow('Outside board boundaries!');
    expect(() => {
      instance.placeShip(ShipType.Submarine, { x: 0, y: -1 }, { x: 0, y: 0 })
    }).toThrow('Outside board boundaries!');
    expect(() => {
      instance.placeShip(ShipType.Submarine, { x: 0, y: 11 }, { x: 0, y: 0 })
    }).toThrow('Outside board boundaries!');
    expect(() => {
      instance.placeShip(ShipType.Submarine, { x: 0, y: 0 }, { x: -1, y: 0 })
    }).toThrow('Outside board boundaries!');
    expect(() => {
      instance.placeShip(ShipType.Submarine, { x: 0, y: 0 }, { x: 11, y: 0 })
    }).toThrow('Outside board boundaries!');
    expect(() => {
      instance.placeShip(ShipType.Submarine, { x: 0, y: 0 }, { x: 11, y: -1 })
    }).toThrow('Outside board boundaries!');
    expect(() => {
      instance.placeShip(ShipType.Submarine, { x: 0, y: 0 }, { x: 11, y: 11 })
    }).toThrow('Outside board boundaries!');
  })
  it('should fail with only vertical or horizontal', async () => {
    expect(() => {
      instance.placeShip(ShipType.Submarine, { x: 1, y: 0 }, { x: 2, y: 4 })
    }).toThrow('Only vertical or horizontal placement allowed!');
  });
  it('Should fail for invalid coordinate placement', async () => {
    // Too small
    expect(() => {
      instance.placeShip(ShipType.Submarine, { x: 1, y: 0 }, { x: 1, y: 1 })
    }).toThrow('Invalid coordinate placements!');
    // Too big
    expect(() => {
      instance.placeShip(ShipType.Submarine, { x: 1, y: 0 }, { x: 1, y: 8 })
    }).toThrow('Invalid coordinate placements!');
  });
  it('should fail with all ships placed', async () => {
    instance.placeShip(ShipType.Battleship, {x: 2, y: 0}, {x:5, y:0});
    expect(() => {
      instance.placeShip(ShipType.Battleship, {x: 2, y: 0}, {x:5, y:0});
    }).toThrow('You have placed all ships of this type!');
  });
  it('should fail with intersects another ship', async () => {
    instance.placeShip(ShipType.Submarine, {x: 0, y: 0}, {x:2, y:0});
    expect(() => {
      instance.placeShip(ShipType.Submarine, {x: 1, y: 0}, {x:3, y:0});
    }).toThrow('Intersects another Ship!');
  });
  it('Should attack ship and destroy', async () => {
    instance.placeShip(ShipType.Battleship, {x: 2, y: 0}, {x:5, y:0});
    let ship: Battleship = <Battleship>instance.attack({x:2, y:0});
    expect(ship).toBeInstanceOf(Battleship);
    expect(ship.damage).toEqual(1);
    ship = <Battleship>instance.attack({x:3, y:0});
    expect(ship.damage).toEqual(2);
    ship = <Battleship>instance.attack({x:4, y:0});
    expect(ship.damage).toEqual(3);
    ship = <Battleship>instance.attack({x:5, y:0});
    expect(ship.damage).toEqual(4);
    expect(ship.destroyed).toBeTruthy;
    
  });
  it('Should destroy ship return undefined for a rehit', async () => {
    instance.placeShip(ShipType.Battleship, {x: 2, y: 0}, {x:5, y:0});
    let ship: Battleship = <Battleship>instance.attack({x:2, y:0});
    expect(ship).toBeInstanceOf(Battleship);
    expect(ship.damage).toEqual(1);
    ship = <Battleship>instance.attack({x:3, y:0});
    ship = <Battleship>instance.attack({x:4, y:0});
    ship = <Battleship>instance.attack({x:5, y:0});
    expect(ship.damage).toEqual(4);
    expect(ship.destroyed).toBeTruthy;
    ship = <Battleship>instance.attack({x:5, y:0});
    expect(ship).not.toBeInstanceOf(Battleship);
  });
  it('make sure unplacedShips returns correctly', async () => {
    instance.placeShip(ShipType.Submarine, { x: 0, y: 0 }, { x: 2, y: 0 });
    instance.placeShip(ShipType.Submarine, { x: 4, y: 0 }, { x: 6, y: 0 });
    instance.placeShip(ShipType.Submarine, { x: 0, y: 2 }, { x: 2, y: 2 });
    instance.placeShip(ShipType.Submarine, { x: 0, y: 4 }, { x: 2, y: 4 });
    instance.placeShip(ShipType.Destroyer, { x: 0, y: 10 }, { x: 0, y: 9 });
    instance.placeShip(ShipType.Destroyer, { x: 2, y: 10 }, { x: 2, y: 9 });
    instance.placeShip(ShipType.Destroyer, { x: 4, y: 10 }, { x: 4, y: 9 });
    instance.placeShip(ShipType.Cruiser, { x: 0, y: 6 }, { x: 2, y: 6 });
    instance.placeShip(ShipType.Cruiser, { x: 4, y: 6 }, { x: 6, y: 6 });
    expect(instance.anyUnplacedShips()).toBeTruthy;
  })
});