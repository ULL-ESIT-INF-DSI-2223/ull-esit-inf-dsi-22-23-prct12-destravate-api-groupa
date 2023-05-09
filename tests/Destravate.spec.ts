import 'mocha'
import { expect } from 'chai'

import { Activity } from '../src/Activity.js'
import { Coordinate } from '../src/Coordinate.js'
import { Track } from '../src/Track.js'
import { User } from '../src/User.js'
import { Group } from '../src/Group.js'

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
    expect(track1.users_log).to.be.a('array')
    expect(track1.users_log).to.have.lengthOf(0)
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
    expect(user.active_challenges.values).to.be.a('array')
    expect(user.active_challenges.values).to.have.lengthOf(0)
  })
  it('User Objects should be able to add active challenges', () => {
    user.active_challenges.add(1)
    expect(user.active_challenges.values).to.have.lengthOf(1)
    expect(user.active_challenges.values).to.include(1)
  })
  it('User Objects should be able to remove active challenges', () => {
    user.active_challenges.remove(1)
    expect(user.active_challenges.values).to.have.lengthOf(0)
    expect(user.active_challenges.values).to.not.include(1)
  })
  it('User Objects should know if the friend/group/favorite/challenge is in the list when adding', () => {
    user.friends.add(1)
    expect(user.friends.add(1)).to.be.false
    user.groups.add(1)
    expect(user.groups.add(1)).to.be.false
    user.favorites.add(1)
    expect(user.favorites.add(1)).to.be.false
    user.active_challenges.add(1)
    expect(user.active_challenges.add(1)).to.be.false
  })
  it('User Objects should know if the friend/group/favorite/challenge is not in the list when removing', () => {
    expect(user.friends.remove(2)).to.be.false
    expect(user.groups.remove(2)).to.be.false
    expect(user.favorites.remove(2)).to.be.false
    expect(user.active_challenges.remove(2)).to.be.false
  })
})

describe('Group class tests', () => {
  const group = new Group(0, 'Canary Team')
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
    expect(group.members.values).to.have.lengthOf(0)
  })
  it('Group Objects should be able to add users', () => {
    group.members.add(1)
    expect(group.members.values).to.have.lengthOf(1)
    expect(group.members.values).to.include(1)
  })
  it('Group Objects should be able to remove users', () => {
    group.members.remove(1)
    expect(group.members.values).to.have.lengthOf(0)
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
    expect(group.stats.values['monthly']).to.be.deep.equal({ km: 0, slope: 0 })
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
})
