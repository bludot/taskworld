declare interface Coordinate {
  x: number;
  y: number;
}

declare interface GameState {

}

declare enum ShipType {
  Battleship,
  Cruiser,
  Destroyer,
  Submarine
}

declare interface Ship {
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

declare interface Move {}

declare enum PlayerType {
  Defender,
  Attacker
}

declare interface Player {
  type: PlayerType;
}
