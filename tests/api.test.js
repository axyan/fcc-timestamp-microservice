const request = require('supertest');

const app = require('../app');

/** Test GET for '/api' **/
describe('GET /api Test Suite', () => {

  test('should return current unix and utc time', async () => {
    const res = await request(app)
      .get('/api')
      .set('Accept', 'application/json')
      .send()
      .expect(200);

    const unixTime = res.body.unix;
    expect(res.body.utc).toMatch(new Date(unixTime).toUTCString());
    expect(unixTime).toBeLessThanOrEqual(unixTime + 2);
    expect(unixTime).toBeGreaterThanOrEqual(unixTime - 2);
  });
});

/** Test GET for '/api/:date' **/
describe('GET /api/:date Test Suite', () => {
  
  test('should return correct unix and utc time', async () => {
    const res = await request(app)
      .get('/api/1451001600000')
      .set('Accept', 'application/json')
      .send()
      .expect(200);

    expect(res.body.unix).toEqual(1451001600000);
    expect(res.body.utc).toMatch("Fri, 25 Dec 2015 00:00:00 GMT");
  });

  test('should return error for invalid date', async () => {
    const res = await request(app)
      .get('/api/helloworld')
      .set('Accept', 'application/json')
      .send()
      .expect(422);

    expect(res.body.error).toMatch("Invalid Date");
  });
});
