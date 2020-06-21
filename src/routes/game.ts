import { Router, Request, Response } from "express";
import gameManager from './../game_management';
import { ShipType } from "./../interfaces";
import Battleship from "../game/battleship";
import checkGame from "./../middleware/check_game";
const { checkSchema, validationResult } = require('express-validator');

const gameRouter = Router();

gameRouter.get('/new', (_req: Request, res: Response) => {
  // create game
  const game = gameManager.newGame();
  return res.json({ id: game.id });
});

gameRouter.get('/:gameId/status', checkSchema({
  gameId: {
    in: ['params'],
    errorMessage: 'GameId is missing',
    isInt: true,
    toInt: true
  },
}), checkGame, (req: Request, res: Response) => {
  const gameId: number = <number>parseInt(req.params.gameId);
  const game = gameManager.getGame(gameId);
  return res.json(game.getStatus());
});

gameRouter.post('/:gameId/placeship', checkSchema({
  gameId: {
    in: ['params'],
    errorMessage: 'GameId is missing',
    isInt: true,
    // Sanitizers can go here as well
    toInt: true
  },
  type: {
    in: ['body'],
    errorMessage: 'Type is missing',
    exists: {
      errorMessage: '\'type\' is required', // <- doesn't work
    },
    isIn: {
      options: [Object.values(ShipType)],
      errorMessage: "Invalid Type"
    }
  },
  start: {
    exists: {
      errorMessage: '\'start\' is required', // <- doesn't work
    },
  },
  'start.x': {
    isInt: true,
    errorMessage: '\'start.x\' is not an integer',
  },
  'start.y': {
    isInt: true,
    errorMessage: '\'start.y\' is not an integer',
  },
  end: {
    exists: {
      errorMessage: '\'end\' is required', // <- doesn't work
    },
  },
  'end.x': {
    isInt: true,
    errorMessage: '\'end.x\' is not an integer',
  },
  'end.y': {
    isInt: true,
    errorMessage: '\'end.y\' is not an integer',
  },
}), checkGame,
  (req: Request, res: Response) => {
    const gameId: number = <number>parseInt(req.params.gameId);
    const game = gameManager.getGame(gameId);
    const errors = validationResult(req).errors;
    /* istanbul ignore next */
    if (errors.legnth) {
      res.status(400);
      return res.json(errors);
    }
    const { start, end } = req.body;
    const type: ShipType = req.body.type;
    game.placeShip(type, start, end);
    return res.json({
      status: 'placed',
      start,
      end
    });
  });

gameRouter.post('/:gameId/attack', checkSchema({
  gameId: {
    in: ['params'],
    errorMessage: 'GameId is missing',
    isInt: true,
    toInt: true
  },
  coordinate: {
    exists: {
      errorMessage: '\'end\' is required', // <- doesn't work
    },
  },
  'coordinate.x': {
    isInt: true,
    errorMessage: '\'coordinate.x\' is not an integer'
  },
  'coordinate.y': {
    isInt: true,
    errorMessage: '\'coordinate.y\' is not an integer'
  }
}), checkGame, (req: Request, res: Response) => {
  const gameId: number = <number>parseInt(req.params.gameId);
  const game = gameManager.getGame(gameId);
  const { coordinate } = req.body;
  const attackResult = game.attack(coordinate);
  if (attackResult instanceof Battleship) {
    if (attackResult.destroyed) {
      return res.json({
        status: "SUNK",
        message: `You just sank a ${attackResult.type}`
      })
    }
    return res.json({
      status: "HIT",
      message: "HIT"
    })
  } else if (!attackResult) {
    return res.json({
      status: "MISS",
      message: "MISS"
    });
  } else {
    // get hits to sink ships
    const hits = game.getStatus().ships.reduce((acc: number, ship: any) => {
      acc+=ship.length;
      return acc;
    }, 0);
    return res.json({
      status: "WIN",
      message: `Win! You have completed the game in ${game.getMoves()} moves`,
      moves: game.getMoves(),
      missedShots: game.getMoves()-hits
    })
  }
});

export default gameRouter;