//import { ShipType } from './../src/types';
//import { mocked } from 'ts-jest/utils';
import Game from './../src/game';
//import Board from './../src/board';
import { ShipType } from './../src/interfaces';
import Battleship from './../src/battleship';

//jest.mock('./../src/board');

describe('Battleship', () => {
  let instance: Game;
  beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    //mocked(Board).mockClear();
    instance = new Game();
  });
  it('should create Game instance', async () => {
    expect(instance).toBeInstanceOf(Game);
  });
  it('should call placeShip', async () => {
    instance.placeShip(ShipType.Submarine, { x: 0, y: 0 }, { x: 2, y: 0 });
  });
  it('should call placeShip and fail if all placed', async () => {
    instance.placeShip(ShipType.Submarine, { x: 0, y: 0 }, { x: 2, y: 0 });
    instance.placeShip(ShipType.Submarine, { x: 4, y: 0 }, { x: 6, y: 0 });
    instance.placeShip(ShipType.Submarine, { x: 0, y: 2 }, { x: 2, y: 2 });
    instance.placeShip(ShipType.Submarine, { x: 0, y: 4 }, { x: 2, y: 4 });
    instance.placeShip(ShipType.Destroyer, { x: 0, y: 10 }, { x: 0, y: 9 });
    instance.placeShip(ShipType.Destroyer, { x: 2, y: 10 }, { x: 2, y: 9 });
    instance.placeShip(ShipType.Destroyer, { x: 4, y: 10 }, { x: 4, y: 9 });
    instance.placeShip(ShipType.Cruiser, { x: 0, y: 6 }, { x: 2, y: 6 });
    instance.placeShip(ShipType.Cruiser, { x: 4, y: 6 }, { x: 6, y: 6 });
    instance.placeShip(ShipType.Battleship, { x: 10, y: 10 }, { x: 7, y: 10 });
    expect(() => {
      instance.placeShip(ShipType.Battleship, { x: 10, y: 10 }, { x: 7, y: 10 });
    }).toThrow('All ships have been placed!');
  });
  it('attack should return correct ship', async () => {
    instance.placeShip(ShipType.Submarine, { x: 0, y: 0 }, { x: 2, y: 0 });
    instance.placeShip(ShipType.Submarine, { x: 4, y: 0 }, { x: 6, y: 0 });
    instance.placeShip(ShipType.Submarine, { x: 0, y: 2 }, { x: 2, y: 2 });
    instance.placeShip(ShipType.Submarine, { x: 0, y: 4 }, { x: 2, y: 4 });
    instance.placeShip(ShipType.Destroyer, { x: 0, y: 10 }, { x: 0, y: 9 });
    instance.placeShip(ShipType.Destroyer, { x: 2, y: 10 }, { x: 2, y: 9 });
    instance.placeShip(ShipType.Destroyer, { x: 4, y: 10 }, { x: 4, y: 9 });
    instance.placeShip(ShipType.Cruiser, { x: 0, y: 6 }, { x: 2, y: 6 });
    instance.placeShip(ShipType.Cruiser, { x: 4, y: 6 }, { x: 6, y: 6 });
    instance.placeShip(ShipType.Battleship, { x: 10, y: 10 }, { x: 7, y: 10 });
    expect(instance.attack({ x: 0, y: 0 })).toBeInstanceOf(Battleship)
  });
  it('attack should return false for miss', async () => {
    instance.placeShip(ShipType.Submarine, { x: 0, y: 0 }, { x: 2, y: 0 });
    instance.placeShip(ShipType.Submarine, { x: 4, y: 0 }, { x: 6, y: 0 });
    instance.placeShip(ShipType.Submarine, { x: 0, y: 2 }, { x: 2, y: 2 });
    instance.placeShip(ShipType.Submarine, { x: 0, y: 4 }, { x: 2, y: 4 });
    instance.placeShip(ShipType.Destroyer, { x: 0, y: 10 }, { x: 0, y: 9 });
    instance.placeShip(ShipType.Destroyer, { x: 2, y: 10 }, { x: 2, y: 9 });
    instance.placeShip(ShipType.Destroyer, { x: 4, y: 10 }, { x: 4, y: 9 });
    instance.placeShip(ShipType.Cruiser, { x: 0, y: 6 }, { x: 2, y: 6 });
    instance.placeShip(ShipType.Cruiser, { x: 4, y: 6 }, { x: 6, y: 6 });
    instance.placeShip(ShipType.Battleship, { x: 10, y: 10 }, { x: 7, y: 10 });
    expect(instance.attack({ x: 0, y: 1 })).toBeFalsy;
  });
  it('attack should return true for complete', async () => {
    instance.placeShip(ShipType.Submarine, { x: 0, y: 0 }, { x: 2, y: 0 });
    instance.placeShip(ShipType.Submarine, { x: 4, y: 0 }, { x: 6, y: 0 });
    instance.placeShip(ShipType.Submarine, { x: 0, y: 2 }, { x: 2, y: 2 });
    instance.placeShip(ShipType.Submarine, { x: 0, y: 4 }, { x: 2, y: 4 });
    instance.placeShip(ShipType.Destroyer, { x: 0, y: 10 }, { x: 0, y: 9 });
    instance.placeShip(ShipType.Destroyer, { x: 2, y: 10 }, { x: 2, y: 9 });
    instance.placeShip(ShipType.Destroyer, { x: 4, y: 10 }, { x: 4, y: 9 });
    instance.placeShip(ShipType.Cruiser, { x: 0, y: 6 }, { x: 2, y: 6 });
    instance.placeShip(ShipType.Cruiser, { x: 4, y: 6 }, { x: 6, y: 6 });
    instance.placeShip(ShipType.Battleship, { x: 10, y: 10 }, { x: 7, y: 10 });
    instance.attack({ x: 0, y: 0 });
    instance.attack({ x: 1, y: 0 });
    instance.attack({ x: 2, y: 0 });
    // submarine 2
    instance.attack({ x: 4, y: 0 });
    instance.attack({ x: 5, y: 0 });
    instance.attack({ x: 6, y: 0 });
    // submarine 3
    instance.attack({ x: 0, y: 2 });
    instance.attack({ x: 1, y: 2 });
    instance.attack({ x: 2, y: 2 });
    // submarine 4
    instance.attack({ x: 0, y: 4 });
    instance.attack({ x: 1, y: 4 });
    instance.attack({ x: 2, y: 4 });
    // Destroyer 1
    instance.attack({ x: 0, y: 10 });
    instance.attack({ x: 0, y: 9 });
    // destroyer 2
    instance.attack({ x: 2, y: 10 });
    instance.attack({ x: 2, y: 9 });
    // destroyer 3
    instance.attack({ x: 4, y: 10 });
    instance.attack({ x: 4, y: 9 });
    // Cruiser 1
    instance.attack({ x: 0, y: 6 });
    instance.attack({ x: 1, y: 6 });
    instance.attack({ x: 2, y: 6 });
    // Cruiser 2
    instance.attack({ x: 4, y: 6 });
    instance.attack({ x: 5, y: 6 });
    instance.attack({ x: 6, y: 6 });
    // Battleship
    instance.attack({ x: 10, y: 10 });
    instance.attack({ x: 9, y: 10 });
    instance.attack({ x: 8, y: 10 });
    expect(instance.attack({x:7, y:10})).toEqual(true);
  });
  it('should fail with not all ships placed', async ()=> {
    expect(() => {
      instance.attack({ x: 10, y: 10 });
    }).toThrow('Not all ships have been placed!');
  });
})