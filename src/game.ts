import { ShipType, Player, PlayerType } from './types';
import Board from './board';

/**
 * Class: Game class
 * 
 * Will handle state and gameplay
 * 
 */
class Game {
  tets: string = "test";
  board: Board = new Board();
  // TODO: Add state
  players: Player[] = [{type: PlayerType.Defender}, {type: PlayerType.Attacker}]
  playerTurn: Player;
  constructor() {
    this.playerTurn = this.players[0];
  }
}
const newGame = new Game();

// Game start
newGame.board.placeShip(ShipType.Submarine, {x: 0, y: 0}, {x: 3, y:0});

console.log(newGame.board.getShips());