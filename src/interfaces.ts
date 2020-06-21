export interface Coordinate {
  x: number;
  y: number;
}

export interface GameState {

}

export enum ShipType {
  Battleship = "Battleship",
  Cruiser = "Cruiser",
  Destroyer = "Destroyer",
  Submarine = "Submarine"
}

export interface Ship {
  type: ShipType;
  start?: Coordinate;
  end?: Coordinate;
  placed: Boolean;
  length: number;
  damage: number;
  destroyed: Boolean;
  place(start: Coordinate, end: Coordinate): void;
  takeDamage(): void;
}

export interface Move {}

export enum PlayerType {
  Defender,
  Attacker
}

export interface Player {
  type: PlayerType;
}
