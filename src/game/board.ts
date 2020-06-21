import { Ship, ShipType, Coordinate } from '../interfaces';
import Battleship from './battleship';
//import lineLine from 'intersects/line-line';
//import linePoint from 'intersects/line-point';
import { lineLine, linePoint } from './intersect';

class Board {
  private ships: Ship[] = [
    new Battleship(ShipType.Submarine),
    new Battleship(ShipType.Submarine),
    new Battleship(ShipType.Submarine),
    new Battleship(ShipType.Submarine),
    new Battleship(ShipType.Destroyer),
    new Battleship(ShipType.Destroyer),
    new Battleship(ShipType.Destroyer),
    new Battleship(ShipType.Cruiser),
    new Battleship(ShipType.Cruiser),
    new Battleship(ShipType.Battleship),
  ];
  placements: number[] = [];
  constructor() {

  }
  public placeShip(type: ShipType, start: Coordinate, end: Coordinate): void {
    const ship = this.ships.find(ship => type === ship.type && !ship.placed);
    if (!ship) {
      throw new Error('You have placed all ships of this type!');
    }

    // TODO: Add checks if fits on board or matches hits another ship (cant overlap)

    // Check if ship matches length
    this.checkValidPlacement(ship, start, end); // This will throw error if not able to place
    ship.place(start, end);
  }
  /* istanbul ignore next */
  public getShips(): Ship[] { // remove later this is just to debug
    return this.ships.filter(ship => ({...ship, start: undefined, end: undefined}));
  }

  private checkValidPlacement(ship: Ship, start: Coordinate, end: Coordinate) {
    // check if on board
    if (
      start.x < 0 ||
      start.x > 10 ||
      start.y < 0 ||
      start.y > 10 ||
      end.x < 0 ||
      end.x > 10 ||
      end.y < 0 ||
      end.y > 10) {
      throw new Error('Outside board boundaries!');
    }
    // we only allow vertical or horizontal
    if ((start.x !== end.x && start.y !== end.y)) {
      throw new Error('Only vertical or horizontal placement allowed!');
    }

    // Get distance and check
    const distance = Math.sqrt(Math.pow((start.x - end.x), 2) + Math.pow((start.y - end.y), 2)) + 1;
    if (distance !== ship.length) {
      throw new Error('Invalid coordinate placements!');
    }
    //Get all ships that are placed and check if any overlap
    // This script coincidentally returns true if put next to one another
    const placedShips = this.ships.filter(aShip => aShip !== ship && aShip.placed);
    const intersect = placedShips.some(testShip => {
      if (testShip && testShip.start && testShip.end) {
        return lineLine(start.x, start.y, end.x, end.y, testShip.start.x, testShip.start.y, testShip.end.x, testShip.end.y);
      }
      return false;
    });
    if (intersect) {
      throw new Error('Intersects another Ship!');
    }

    //TODO: Ships should have at least one square between them in all directions.
  }
  
  public anyUnplacedShips(): Boolean {
    return this.ships.some(ship => !ship.placed);
  }

  public attack(point: Coordinate): Battleship | Boolean {
    const shipHit = this.ships.find(ship => {
      if (ship && ship.start && ship.end) {
        return linePoint(
          ship.start.x,
          ship.start.y,
          ship.end.x,
          ship.end.y,
          point.x,
          point.y
        );
      }
      return false;
    });
    // Check if already sunk/destroyed
    if (shipHit?.destroyed) {
      return false; // We already sunk it so we hit water
    }
    // We hit a ship
    if (shipHit) {
      shipHit.takeDamage();
    }
    return shipHit || false;
  }
  public getUnSunkenShips(): Boolean {
    return this.ships.some(ship => !ship.destroyed)
  }
}

export default Board;