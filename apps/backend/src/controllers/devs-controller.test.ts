import assert from 'node:assert/strict'
import sinon, { type SinonMatcher } from 'sinon'
import request from 'supertest'
import app from '../app'
import Dev from '../models/dev'

interface DevEntity {
  likes: string[]
  dislikes: string[]
  _id: string
  name: string
  user: string
  bio: string
  avatar: string
  createdAt: string
  updatedAt: string
  __v: number
}

describe('DevController', () => {
  const user1Entity: DevEntity = {
    likes: [],
    dislikes: [],
    _id: '62cb6a0e8f3aed0038018703',
    name: 'Diego Mais',
    user: 'diegomais',
    bio: '🧑‍💻 A programmer who cares about code.',
    avatar: 'https://avatars.githubusercontent.com/u/40746974?v=4',
    createdAt: '2022-07-11T00:08:46.709Z',
    updatedAt: '2022-07-11T00:08:46.709Z',
    __v: 0,
  }

  const user2Entity: DevEntity = {
    likes: [],
    dislikes: [],
    _id: '62cb6a60583d7900462741a8',
    name: 'Diego Fernandes',
    user: 'diego3g',
    bio: "CTO at @Rocketseat. Passionate about education and changing people's lives through programming.",
    avatar: 'https://avatars.githubusercontent.com/u/2254731?v=4',
    createdAt: '2022-07-11T00:10:08.682Z',
    updatedAt: '2022-07-11T00:10:08.682Z',
    __v: 0,
  }

  const devCreate = sinon.stub(Dev, 'create')
  devCreate
    .withArgs({
      avatar: user2Entity.avatar,
      bio: user2Entity.bio,
      name: user2Entity.name,
      user: user2Entity.user,
    })
    .resolves(user2Entity)

  const devFindById = sinon.stub(Dev, 'findById')
  devFindById.withArgs(user1Entity._id).resolves({ likes: [], dislikes: [] })

  const devFind = sinon.stub(Dev, 'find')
  devFind
    .withArgs({
      $and: [
        { _id: { $ne: user1Entity._id } },
        { _id: { $nin: [] } },
        { _id: { $nin: [] } },
      ],
    } as unknown as SinonMatcher)
    .resolves([user2Entity])

  const devFindOne = sinon.stub(Dev, 'findOne')
  devFindOne.withArgs({ user: user1Entity.user }).resolves(user1Entity)
  devFindOne.withArgs({ user: user2Entity.user }).resolves(undefined)

  describe('GET /devs', () => {
    it('should return 200 with an array of other devs', async () => {
      const response = await request(app)
        .get('/devs')
        .set({ user: user1Entity._id })
        .expect(200)
      assert.deepStrictEqual(response.body, [user2Entity])
    })
  })

  describe('POST /devs', () => {
    describe('user exists', () => {
      it('should return 200 with user data', async () => {
        const response = await request(app)
          .post('/devs')
          .send({ username: user1Entity.user })
          .expect(200)
        assert.deepStrictEqual(response.body, user1Entity)
      })
    })

    describe('user not exists', () => {
      it('should return 200 with user data from GitHub', async () => {
        const response = await request(app)
          .post('/devs')
          .send({ username: user2Entity.user })
          .expect(200)
        assert.deepStrictEqual(response.body, user2Entity)
      })
    })
  })
})
