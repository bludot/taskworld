import Game from './game';
class GameManager {
  private games: Game[] = []; // replace with database later
  constructor() {
    // TODO: Restore games from database
  }
  public newGame(): Game {
    const game = new Game(this.games.length);
    this.games.push(game);
    return game;
  }
  public getGame(id: number): Game {
    const game = this.games[id];
    if (!game) throw new Error('this is not a game!')
    return game;
  }
}

const gameManager = new GameManager();

export default gameManager;