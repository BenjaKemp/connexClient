const request = require('supertest')
const app = require('../../foo/app.js')

describe('Testing Endpoints', () => {

  it('check that time object is returned correctly', async () => {
    const res = await request(app)
    .get('/time')
    .set('authorization', 'mysecrettoken')

    expect(res.statusCode).toEqual(200)
    console.log('this is res    ',res.body)
    expect(res.body).toEqual(expect.objectContaining({
      epoch: expect.any(Number)
    }))
  })

  it('check that the metrics object is returned correctly', async () => {
    const res = await request(app)
    .get('/metrics')
    .set('authorization', 'mysecrettoken')
    expect(res.statusCode).toEqual(200)
    expect(res.text).toBeDefined()
  })

  it('should return a 403', async () => {
    const res = await request(app)
    .get('/time')
    .set('authorization', 'incorrect toxen')
    expect(res.statusCode).toEqual(403)
  })
})