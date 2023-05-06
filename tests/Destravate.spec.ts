import 'mocha'
import { expect } from 'chai'

import { Activity } from '../src/Activity.js'
import { Coordinate } from '../src/Coordinate.js'
import { Track } from '../src/Track.js'

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
