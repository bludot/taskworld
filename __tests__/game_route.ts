import request from 'supertest';
import express from 'express';
import gameRouter from './../src/routes/game';

const app = express();
app.use(express.json());
app.use(gameRouter);

describe('gameRouter', () => {
  it('GET /new', async () => {
    const response = await request(app)
      .get('/new');

    expect(response.header['content-type']).toContain('json');
    expect(response.status).toEqual(200);
    expect(response.body).toEqual({
      id: 0
    });
  });
  it('GET /:gameId/status', async () => {
    const response = await request(app)
      .get('/0/status');
    expect(response.header['content-type']).toContain('json');
    expect(response.body).toHaveProperty('ships');
    expect(response.status).toEqual(200);
  });
  it('GET /:gameId/status should fail', async () => {
    const response = await request(app)
      .get('/1/status');
    expect(response.header['content-type']).toContain('json');
    expect(response.status).toEqual(500);
  });
  it('POST /:gameId/placeship', async () => {
    const response = await request(app)
      .post('/0/placeship')
      .send({
        type: "Submarine",
        start: {
          x: 0,
          y: 0
        },
        end: {
          x: 2,
          y: 0
        }
      });
    expect(response.header['content-type']).toContain('json');
    expect(response.status).toEqual(200);
    expect(response.body).toEqual({
      status: "placed",
      start: {
        x: 0,
        y: 0
      },
      end: {
        x: 2,
        y: 0
      }
    })
  });
  it('POST /:gameId/placeship expect 500 error with invalid fields', async () => {
    const response = await request(app)
      .post('/0/placeship')
      .send({
        type: "Submarine",
        start: {
          x: "A",
          y: 0
        },
        end: {
          x: 0,
          y: 0
        }
      });
    expect(response.status).toEqual(500);
  });
  it('POST /:gameId/attack expect MISS', async () => {
    //await request(app).post('/0/placeship').send({"type": "Submarine", "start": {x: 0, y: 0}, "end": {x: 2, y:0}});
    //await request(app).post('/0/placeship').send({"type": "Submarine", "start": {x: 0, y: 0}, "end": {x: 2, y:0}});
    await request(app).post('/0/placeship').send({ "type": "Submarine", "start": { x: 4, y: 0 }, "end": { x: 6, y: 0 } });
    await request(app).post('/0/placeship').send({ "type": "Submarine", "start": { x: 0, y: 2 }, "end": { x: 2, y: 2 } });
    await request(app).post('/0/placeship').send({ "type": "Submarine", "start": { x: 0, y: 4 }, "end": { x: 2, y: 4 } });
    await request(app).post('/0/placeship').send({ "type": "Destroyer", "start": { x: 0, y: 10 }, "end": { x: 0, y: 9 } });
    await request(app).post('/0/placeship').send({ "type": "Destroyer", "start": { x: 2, y: 10 }, "end": { x: 2, y: 9 } });
    await request(app).post('/0/placeship').send({ "type": "Destroyer", "start": { x: 4, y: 10 }, "end": { x: 4, y: 9 } });
    await request(app).post('/0/placeship').send({ "type": "Cruiser", "start": { x: 0, y: 6 }, "end": { x: 2, y: 6 } });
    await request(app).post('/0/placeship').send({ "type": "Cruiser", "start": { x: 4, y: 6 }, "end": { x: 6, y: 6 } });
    await request(app).post('/0/placeship').send({ "type": "Battleship", "start": { x: 10, y: 10 }, "end": { x: 7, y: 10 } });
    const response = await request(app)
      .post(`/0/attack`)
      .send({
        coordinate: {
          x: 1,
          y: 1
        }
      });
    expect(response.status).toEqual(200);
    expect(response.body).toEqual({
      status: "MISS",
      message: "MISS"
    })
  });
})