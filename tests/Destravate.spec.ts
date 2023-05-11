import 'mocha'
import { expect } from 'chai'

import { UniqueList } from '../src/UniqueList.js'
import { Activity } from '../src/Activity.js'
import { Coordinate } from '../src/Coordinate.js'
import { Track } from '../src/Track.js'
import { User } from '../src/User.js'
import { Group } from '../src/Group.js'
import { Challenge } from '../src/Challenge.js'
import { Server } from '../src/Server.js'

let server: Server
before(async function () {
  server = new Server()
  await server.start()
})

describe('Destravate app tests', () => {
  describe('Track class tests', () => {
    const coord1: Coordinate = {
      lat: 40.4167,
      lng: -3.70325,
    }
    const coord2: Coordinate = {
      lat: 52.520008,
      lng: 13.404954,
    }
    const track1: Track = new Track(
      0,
      'Route to El Dorado',
      coord1,
      coord2,
      100,
      0.5,
      Activity.running
    )
    it('Track Objects should have an id', () => {
      expect(track1.id).to.be.a('number')
      expect(track1.id).to.equal(0)
    })
    it('Track Objects should have a name', () => {
      expect(track1.name).to.be.a('string')
      expect(track1.name).to.equal('Route to El Dorado')
    })
    it('Track Objects should have a start and end points, and both should be Coordinates', () => {
      expect(track1.start).to.be.a('object')
      expect(track1.start).to.have.property('lat')
      expect(track1.start).to.have.property('lng')
      expect(track1.start.lat).to.be.a('number')
      expect(track1.start.lng).to.be.a('number')
      expect(track1.start.lat).to.equal(40.4167)
      expect(track1.start.lng).to.equal(-3.70325)
      expect(track1.end).to.be.a('object')
      expect(track1.end).to.have.property('lat')
      expect(track1.end).to.have.property('lng')
      expect(track1.end.lat).to.be.a('number')
      expect(track1.end.lng).to.be.a('number')
      expect(track1.end.lat).to.equal(52.520008)
      expect(track1.end.lng).to.equal(13.404954)
    })
    it('Track Objects should have a distance', () => {
      expect(track1.distance).to.be.a('number')
      expect(track1.distance).to.equal(100)
    })
    it('Track Objects should have a slope', () => {
      expect(track1.slope).to.be.a('number')
      expect(track1.slope).to.equal(0.5)
    })
    it('Track Objects should have a list of users that have done the track', () => {
      expect(track1.users_log.values).to.be.a('array')
      expect(track1.users_log.values).to.have.lengthOf(0)
    })
    it('Track Objects should have an activity', () => {
      expect(Object.values(Activity)).to.include(track1.activity)
    })
    it('Track Objects should have a score', () => {
      expect(track1.score).to.be.a('number')
      expect(track1.score).to.equal(0)
    })
  })

  describe('User class tests', () => {
    const user = new User(0, 'Iluzio', Activity.running)
    it('User Objects should have an id', () => {
      expect(user.id).to.be.a('number')
      expect(user.id).to.equal(0)
    })
    it('User Objects should have a name', () => {
      expect(user.name).to.be.a('string')
      expect(user.name).to.equal('Iluzio')
    })
    it('User Objects should have an sport activity', () => {
      expect(Object.values(Activity)).to.include(user.activity)
    })

    it('User Objects should have a list of friends', () => {
      expect(user.friends.values).to.be.a('array')
      expect(user.friends.values).to.have.lengthOf(0)
    })
    it('User Objects should be able to add friends', () => {
      user.friends.add(1)
      expect(user.friends.values).to.have.lengthOf(1)
      expect(user.friends.values).to.include(1)
    })
    it('User Objects should be able to remove friends', () => {
      user.friends.remove(1)
      expect(user.friends.values).to.have.lengthOf(0)
      expect(user.friends.values).to.not.include(1)
    })
    it('User Objects should have a list of groups in which the user is', () => {
      expect(user.groups.values).to.be.a('array')
      expect(user.groups.values).to.have.lengthOf(0)
    })
    it('User Objects should be able to add groups', () => {
      user.groups.add(1)
      expect(user.groups.values).to.have.lengthOf(1)
      expect(user.groups.values).to.include(1)
    })
    it('User Objects should be able to remove groups', () => {
      user.groups.remove(1)
      expect(user.groups.values).to.have.lengthOf(0)
      expect(user.groups.values).to.not.include(1)
    })
    it('User Objects should have stats', () => {
      expect(Object.keys(user.stats.values)).includes('weekly')
      expect(Object.keys(user.stats.values)).includes('monthly')
      expect(Object.keys(user.stats.values)).includes('yearly')
    })
    it('User Objects should be able to reset stats', () => {
      user.stats.reset()
      expect(user.stats.values['weekly']).to.be.deep.equal({ km: 0, slope: 0 })
      expect(user.stats.values['monthly']).to.be.deep.equal({ km: 0, slope: 0 })
      expect(user.stats.values['yearly']).to.be.deep.equal({ km: 0, slope: 0 })
    })
    it('User Objects should have a list of favorite tracks', () => {
      expect(user.favorites.values).to.be.a('array')
      expect(user.favorites.values).to.have.lengthOf(0)
    })
    it('User Objects should be able to add favorite tracks', () => {
      user.favorites.add(1)
      expect(user.favorites.values).to.have.lengthOf(1)
      expect(user.favorites.values).to.include(1)
    })
    it('User Objects should be able to remove favorite tracks', () => {
      user.favorites.remove(1)
      expect(user.favorites.values).to.have.lengthOf(0)
      expect(user.favorites.values).to.not.include(1)
    })
    it('User Objects should have a list of active challenges', () => {
      expect(user.challenges.values).to.be.a('array')
      expect(user.challenges.values).to.have.lengthOf(0)
    })
    it('User Objects should be able to add active challenges', () => {
      user.challenges.add(1)
      expect(user.challenges.values).to.have.lengthOf(1)
      expect(user.challenges.values).to.include(1)
    })
    it('User Objects should be able to remove active challenges', () => {
      user.challenges.remove(1)
      expect(user.challenges.values).to.have.lengthOf(0)
      expect(user.challenges.values).to.not.include(1)
    })
    it('User Objects should have a record of the tracks done', () => {
      expect(user.records.values).to.be.a('array')
      expect(user.records.values).to.have.lengthOf(0)
    })
    it('User Objects should be able to add records', () => {
      user.records.add({ date: '2019-01-01', tracks: new UniqueList(1, 2, 3) })
      expect(user.records.values).to.have.lengthOf(1)
      expect(user.records.values).to.be.deep.equal([
        { date: '2019-01-01', tracks: new UniqueList(1, 2, 3) },
      ])
    })
    it('User Objects should know if the friend/group/favorite/challenge/record is in the list when adding', () => {
      user.friends.add(1)
      expect(user.friends.add(1)).to.be.false
      user.groups.add(1)
      expect(user.groups.add(1)).to.be.false
      user.favorites.add(1)
      expect(user.favorites.add(1)).to.be.false
      user.challenges.add(1)
      expect(user.challenges.add(1)).to.be.false
      user.records.add({ date: '2019-01-01', tracks: new UniqueList(1, 2, 3) })
      expect(
        user.records.add({
          date: '2019-01-01',
          tracks: new UniqueList(1, 2, 3),
        })
      ).to.be.false
    })
    it('User Objects should know if the friend/group/favorite/challenge/record is not in the list when removing', () => {
      expect(user.friends.remove(2)).to.be.false
      expect(user.groups.remove(2)).to.be.false
      expect(user.favorites.remove(2)).to.be.false
      expect(user.challenges.remove(2)).to.be.false
      expect(
        user.records.remove({
          date: '2019-01-01',
          tracks: new UniqueList(1, 2),
        })
      ).to.be.false
    })
  })

  describe('Group class tests', () => {
    const group = new Group(0, 'Canary Team', 3, 4)
    it('Group Objects should have an id', () => {
      expect(group.id).to.be.a('number')
      expect(group.id).to.equal(0)
    })
    it('Group Objects should have a name', () => {
      expect(group.name).to.be.a('string')
      expect(group.name).to.equal('Canary Team')
    })
    it('Group Objects should have a list of users', () => {
      expect(group.members.values).to.be.a('array')
      expect(group.members.values).to.have.lengthOf(2)
    })
    it('Group Objects should be able to add users', () => {
      group.members.add(1)
      expect(group.members.values).to.have.lengthOf(3)
      expect(group.members.values).to.include(1)
    })
    it('Group Objects should be able to remove users', () => {
      group.members.remove(1)
      expect(group.members.values).to.have.lengthOf(2)
      expect(group.members.values).to.not.include(1)
    })
    it('Group Objects should have stats', () => {
      expect(Object.keys(group.stats.values)).includes('weekly')
      expect(Object.keys(group.stats.values)).includes('monthly')
      expect(Object.keys(group.stats.values)).includes('yearly')
    })
    it('Group Objects should be able to reset stats', () => {
      group.stats.reset()
      expect(group.stats.values['weekly']).to.be.deep.equal({ km: 0, slope: 0 })
      expect(group.stats.values['monthly']).to.be.deep.equal({
        km: 0,
        slope: 0,
      })
      expect(group.stats.values['yearly']).to.be.deep.equal({ km: 0, slope: 0 })
    })
    it('Group Objects should have a list of favorite tracks', () => {
      expect(group.favorites.values).to.be.a('array')
      expect(group.favorites.values).to.have.lengthOf(0)
    })
    it('Group Objects should be able to add favorite tracks', () => {
      group.favorites.add(1)
      expect(group.favorites.values).to.have.lengthOf(1)
      expect(group.favorites.values).to.include(1)
    })
    it('Group Objects should be able to remove favorite tracks', () => {
      group.favorites.remove(1)
      expect(group.favorites.values).to.have.lengthOf(0)
      expect(group.favorites.values).to.not.include(1)
    })
    it('Group Objects should have a record of the tracks done', () => {
      expect(group.records.values).to.be.a('array')
      expect(group.records.values).to.have.lengthOf(0)
    })
    it('Group Objects should be able to add records', () => {
      group.records.add({
        date: '2019-01-01',
        tracks: new UniqueList(1, 2, 3),
        users: new UniqueList(1, 2, 3),
        km: 10,
      })
      expect(group.records.values).to.have.lengthOf(1)
      expect(group.records.values).to.be.deep.equal([
        {
          date: '2019-01-01',
          tracks: new UniqueList(1, 2, 3),
          users: new UniqueList(1, 2, 3),
          km: 10,
        },
      ])
    })
    it('Group Objects should know if the user/favorite/record is in the list when adding', () => {
      group.members.add(1)
      expect(group.members.add(1)).to.be.false
      group.favorites.add(1)
      expect(group.favorites.add(1)).to.be.false
      group.records.add({
        date: '2019-01-01',
        tracks: new UniqueList(1, 2, 3),
        users: new UniqueList(1, 2, 3),
        km: 10,
      })
      expect(
        group.records.add({
          date: '2019-01-01',
          tracks: new UniqueList(1, 2, 3),
          users: new UniqueList(1, 2, 3),
          km: 10,
        })
      ).to.be.false
    })
    it('Group Objects should know if the user/favorite/record is not in the list when removing', () => {
      expect(group.members.remove(2)).to.be.false
      expect(group.favorites.remove(2)).to.be.false
      expect(
        group.records.remove({
          date: '2019-01-01',
          tracks: new UniqueList(1, 2),
          users: new UniqueList(1, 2),
          km: 10,
        })
      ).to.be.false
    })
    it('Group Objects should have a ranking', () => {
      group.records.add({
        date: '2023-01-01',
        tracks: new UniqueList(1, 3),
        users: new UniqueList(1),
        km: 250,
      })
      expect(group.ranking.values).to.be.a('array')
      expect(group.ranking.values).to.have.lengthOf(2)
    })
  })

  describe('Challenge class tests', () => {
    const challenge = new Challenge(
      0,
      'The World Warrior',
      Activity.cycling,
      0,
      1
    )
    it('Challenge Objects should have an id', () => {
      expect(challenge.id).to.be.a('number')
      expect(challenge.id).to.equal(0)
    })
    it('Challenge Objects should have a name', () => {
      expect(challenge.name).to.be.a('string')
      expect(challenge.name).to.equal('The World Warrior')
    })
    it('Challenge Objects should have an activity', () => {
      expect(Object.values(Activity)).to.include(challenge.activity)
    })
    it('Challenge Objects should have a list of tracks that are part of the challenge', () => {
      expect(challenge.tracks.values).to.be.a('array')
      expect(challenge.tracks.values).to.have.lengthOf(2)
      expect(challenge.tracks.values).to.be.deep.equal([0, 1])
    })
    it('Challenge Objects should be able to add tracks', () => {
      challenge.tracks.add(2)
      expect(challenge.tracks.values).to.have.lengthOf(3)
    })
    it('Challenge Objects should be able to remove tracks', () => {
      challenge.tracks.remove(2)
      expect(challenge.tracks.values).to.have.lengthOf(2)
    })
    it('Challenge Objects should have a list of users that are part of the challenge', () => {
      expect(challenge.users.values).to.be.a('array')
      expect(challenge.users.values).to.have.lengthOf(0)
    })
    it('Challenge Objects should be able to add users', () => {
      challenge.users.add(1)
      expect(challenge.users.values).to.have.lengthOf(1)
      expect(challenge.users.values).to.include(1)
    })
    it('Challenge Objects should be able to remove users', () => {
      challenge.users.remove(1)
      expect(challenge.users.values).to.have.lengthOf(0)
      expect(challenge.users.values).to.not.include(1)
    })
    it('Challenge Objects should know if the user/track is in the list when adding', () => {
      challenge.users.add(1)
      expect(challenge.users.add(1)).to.be.false
      challenge.tracks.add(1)
      expect(challenge.tracks.add(1)).to.be.false
    })
    it('Challenge Objects should know if the user/track is not in the list when removing', () => {
      expect(challenge.users.remove(2)).to.be.false
      expect(challenge.tracks.remove(2)).to.be.false
    })
  })
  describe('Server class tests', () => {})
})

after(async function () {
  await server.stop()
})
