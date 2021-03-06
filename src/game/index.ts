import { ShipType, Coordinate } from '../interfaces';
import Board from './board';
import Battleship from './battleship';

/**
 * Class: Game class
 * 
 * Will handle state and gameplay
 * 
 */
class Game {
  private board: Board = new Board();
  public id: number;
  private moves: number = 0;
  constructor(id: number) {
    this.id = id;
  }
  // TODO: Add and save state (basically just save board right?)
  public placeShip(type: ShipType, start: Coordinate, end: Coordinate) {
    // check if unplaced ships
    if (!this.board.anyUnplacedShips()) throw new Error('All ships have been placed!');
    this.board.placeShip(type, start, end);
  }
  public attack(point: Coordinate): Battleship | Boolean { // if hit, return ship, if not hit return false, if all sunk, then return true
    this.moves++;
    if (this.board.anyUnplacedShips()) throw new Error('Not all ships have been placed!');
    const ship = this.board.attack(point);
    if (!this.board.getUnSunkenShips()) {
      return true;
    }
    if (ship) {
      return ship;
    } else {
      return false;
    }
  }
  public getStatus(): any {
    return {
      ships: this.board.getShips(),
    }
  }
  public getMoves(): number {
    return this.moves;
  }
}

export default Game;