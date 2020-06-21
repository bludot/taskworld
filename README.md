### BATTLESHIP

A battle ship game over a Restful API.

### setup
just docker-compose it

```bash
$ docker-compose up
```

### test

make sure you run npm install (or yarn) and run `npm test`

### endpoints

* `GET /new`
  * returns id of game
* `GET /:gameId/status`
  * Return status of the game
* `POST /:gameId/placeship`
  * Send battleship to place
  * 
    ```json
    {
      "status": "placed",
      "start": {
          "x": 0,
          "y": 0
      },
      "end": {
          "x": 2,
          "y": 0
      }
    }
    ```
* `POST /:gameId/attack`
  * attack a ship
  * 
    ```json
    {
      "coordinate": {
        "x": 0,
        "y": 0
      }
    }
    ```

### Missing tasks

* Database saving
  * Would have used mongodb with mongoose and just stored the whole game object. 
  * I would also need to be able to save state at every change.
  * 2 main new functions: 
    * saving game state
    * restoring game state


