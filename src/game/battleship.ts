import { Ship, ShipType, Coordinate } from '../interfaces';

class Battleship implements Ship {
  type: ShipType;
  start?: Coordinate;
  end?: Coordinate;
  placed: Boolean = false;
  length: number = 0;
  damage: number = 0;
  destroyed: Boolean = false;
  constructor(type: ShipType) {
    this.type = type;
    switch (type) {
      case ShipType.Submarine:
        this.length = 3;
        break;
      case ShipType.Destroyer:
        this.length = 2;
        break;
      case ShipType.Cruiser:
        this.length = 3;
        break;
      case ShipType.Battleship:
        this.length = 4;
        break;
    }
  }

  public place(start: Coordinate, end: Coordinate) {
    this.start = start;
    this.end = end;
    this.placed = true;
  }
  public takeDamage(): void {
    if (!this.destroyed) {
      this.damage++;
      if (this.damage == this.length) {
        this.destroyed = true;
      }
      return;
    }
  }
}

export default Battleship;