import { ShipType } from './../src/interfaces';
import Battleship from './../src/battleship';

describe('Battleship', () => {
  let instance: Battleship;
  beforeEach(() => {
    instance = new Battleship(ShipType.Submarine);
  });
  it('should create Submarine battleship', async () => {
    expect(instance).toBeInstanceOf(Battleship);
    expect(instance.length).toEqual(3);
    expect(instance.placed).toEqual(false);
    expect(instance.start).toBeUndefined;
    expect(instance.end).toBeUndefined;
  });
  it('should create Destroyer battleship', async () => {
    const ship = new Battleship(ShipType.Destroyer)
    expect(ship).toBeInstanceOf(Battleship);
    expect(ship.length).toEqual(2);
    expect(ship.placed).toEqual(false);
    expect(ship.start).toBeUndefined;
    expect(ship.end).toBeUndefined;
  });
  it('should create Cruiser battleship', async () => {
    const ship = new Battleship(ShipType.Cruiser)
    expect(ship).toBeInstanceOf(Battleship);
    expect(ship.length).toEqual(3);
    expect(ship.placed).toEqual(false);
    expect(ship.start).toBeUndefined;
    expect(ship.end).toBeUndefined;
  });
  it('should create Battleship battleship', async () => {
    const ship = new Battleship(ShipType.Battleship)
    expect(ship).toBeInstanceOf(Battleship);
    expect(ship.length).toEqual(4);
    expect(ship.placed).toEqual(false);
    expect(ship.start).toBeUndefined;
    expect(ship.end).toBeUndefined;
  });
  it('should place ship and set placed', () => {
    instance.place({x:0, y:0}, {x: 2, y: 0});
    expect(instance.placed).toBeTruthy;
    expect(instance.start).toEqual({x:0, y:0});
    expect(instance.end).toEqual({x:2, y:0});
  });

  it('should take Damage', () => {
    instance.takeDamage();
    expect(instance.damage).toEqual(1);
    instance.takeDamage();
    instance.takeDamage();
    expect(instance.destroyed).toBeTruthy;
    instance.takeDamage();
    expect(instance.damage).toEqual(3);
  });
})