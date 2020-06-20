export interface Coordinate {
  x: number;
  y: number;
}

export interface GameState {

}

export enum ShipType {
  Battleship,
  Cruiser,
  Destroyer,
  Submarine
}

export interface Ship {
  type: ShipType;
  start: Coordinate;
  end: Coordinate;
  placed: Boolean;
  length: number;
  damage: number;
  destroyed: Boolean;
  place(start: Coordinate, end: Coordinate): void;
}

export interface Move {}

export enum PlayerType {
  Defender,
  Attacker
}

export interface Player {
  type: PlayerType;
}
