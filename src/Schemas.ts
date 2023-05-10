import { model, Schema } from 'mongoose'

import { Activity } from './Activity.js'

import { TrackInterface } from './Track.js'
import { UserInterface } from './User.js'
import { GroupInterface } from './Group.js'
import { ChallengeInterface } from './Challenge.js'

export const TrackSchema = new Schema<TrackInterface>({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  start: {
    type: Object,
    required: true,
  },
  end: {
    type: Object,
    required: true,
  },
  distance: {
    type: Number,
    required: true,
  },
  slope: {
    type: Number,
    required: true,
  },
  users_log: {
    type: Array,
    required: false,
  },
  activity: {
    type: String,
    required: true,
    enum: Object.values(Activity),
  },
  score: {
    type: Number,
    required: false,
  },
})

export const Track = model<TrackInterface>('Track', TrackSchema)

export const UserSchema = new Schema<UserInterface>({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  activity: {
    type: String,
    required: true,
    enum: Object.values(Activity),
  },
  friends: {
    type: Array,
    required: false,
  },
  groups: {
    type: Array,
    required: false,
  },
  stats: {
    type: Array,
    required: false,
  },
  favorites: {
    type: Array,
    required: false,
  },
  active_challenges: {
    type: Array,
    required: false,
  },
  records: {
    type: Array,
    required: false,
  },
})

export const User = model<UserInterface>('User', UserSchema)

export const GroupSchema = new Schema<GroupInterface>({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  members: {
    type: Array,
    required: false,
  },
  stats: {
    type: Array,
    required: false,
  },
  favorites: {
    type: Array,
    required: false,
  },
  records: {
    type: Array,
    required: false,
  },
})

export const Group = model<GroupInterface>('Group', GroupSchema)

export const ChallengeSchema = new Schema<ChallengeInterface>({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  activity: {
    type: String,
    required: true,
    enum: Object.values(Activity),
  },
  tracks: {
    type: Array,
    required: false,
  },
  users: {
    type: Array,
    required: false,
  },
})

export const Challenge = model<ChallengeInterface>('Challenge', ChallengeSchema)
