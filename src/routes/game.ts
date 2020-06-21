import { Router, Request, Response } from "express";

const gameRouter = Router();

gameRouter.get('/new', (_req: Request, res: Response) => {
  // create game
  return res.json({})
})

gameRouter.get('/:gameId/status', (_req: Request, res: Response) => {
  res.json('')
})
