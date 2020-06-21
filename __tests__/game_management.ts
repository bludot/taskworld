import gameManager from './../src/game_management';
import Game from './../src/game';

describe('gameManagement', () => {
  it('create new game', async () => {
    expect(gameManager.newGame()).toBeInstanceOf(Game);
  })
  it('expect a game object', async () => {
    expect(gameManager.getGame(0)).toBeInstanceOf(Game);
  })
})