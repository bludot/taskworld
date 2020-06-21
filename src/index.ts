/* istanbul ignore file */
import express, { Request, Response } from 'express';
import Game from './game';

// Express
const app = express()
const port = 3000

app.get('/', (_req: Request, res: Response) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))

const newGame = new Game();

// Game start
newGame.placeShip(ShipType.Submarine, {x: 0, y: 0}, {x: 2, y:0});
newGame.placeShip(ShipType.Submarine, {x: 4, y: 0}, {x: 6, y:0});
newGame.placeShip(ShipType.Submarine, {x: 0, y: 2}, {x: 2, y:2});
newGame.placeShip(ShipType.Submarine, {x: 0, y: 4}, {x: 2, y:4});
newGame.placeShip(ShipType.Destroyer, {x: 0, y: 10}, {x: 0, y:9});
newGame.placeShip(ShipType.Destroyer, {x: 2, y: 10}, {x: 2, y:9});
newGame.placeShip(ShipType.Destroyer, {x: 4, y: 10}, {x: 4, y:9});
newGame.placeShip(ShipType.Cruiser, {x: 0, y: 6}, {x: 2, y:6});
newGame.placeShip(ShipType.Cruiser, {x: 4, y: 6}, {x: 6, y:6});
newGame.placeShip(ShipType.Battleship, {x: 10, y: 10}, {x: 7, y:10});

// submarine 1
newGame.attack({x:0, y:0});
newGame.attack({x:1, y:0});
newGame.attack({x:2, y:0});
// submarine 2
newGame.attack({x:4, y:0});
newGame.attack({x:5, y:0});
newGame.attack({x:6, y:0});
// submarine 3
newGame.attack({x:0, y:2});
newGame.attack({x:1, y:2});
newGame.attack({x:2, y:2});
// submarine 4
newGame.attack({x:0, y:4});
newGame.attack({x:1, y:4});
newGame.attack({x:2, y:4});
// Destroyer 1
newGame.attack({x:0, y:10});
newGame.attack({x:0, y:9});
// destroyer 2
newGame.attack({x:2, y:10});
newGame.attack({x:2, y:9});
// destroyer 3
newGame.attack({x:4, y:10});
newGame.attack({x:4, y:9});
// Cruiser 1
newGame.attack({x:0, y:6});
newGame.attack({x:1, y:6});
newGame.attack({x:2, y:6});
// Cruiser 2
newGame.attack({x:4, y:6});
newGame.attack({x:5, y:6});
newGame.attack({x:6, y:6});
// Battleship
newGame.attack({x:10, y:10});
newGame.attack({x:9, y:10});
newGame.attack({x:8, y:10});
console.log(newGame.attack({x:6, y:10}));
console.log(newGame.attack({x:7, y:10}));
