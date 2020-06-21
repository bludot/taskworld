import gameManager from './../game_management';
import { Response, Request } from 'express';
const checkGame = (req: Request, res: Response, next: any) => {
  const gameId: number = <number>parseInt(req.params.gameId);
  try{
    gameManager.getGame(gameId);
  } catch (err) {
    res.status(500);
    return res.json({
      status: "error",
      message: err.message
    })
  }
  return next();
}
export default checkGame;