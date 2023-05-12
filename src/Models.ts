import { model, Schema } from 'mongoose'

import { Activity } from './Activity.js'

import { TrackInterface } from './Track.js'
import { UserInterface } from './User.js'
import { GroupInterface } from './Group.js'
import { ChallengeInterface } from './Challenge.js'

/**
 * Schema representing a track of the app.
 */
export const TrackSchema = new Schema<TrackInterface<string>>({
  name: {
    type: String,
    required: true,
    unique: true,
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
    type: Schema.Types.Mixed,
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

/**
 * Model for the Track schema.
 */
export const TrackModel = model<TrackInterface<string>>('Track', TrackSchema)

/**
 * Schema representing a user of the app.
 */
export const UserSchema = new Schema<UserInterface<string>>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  activity: {
    type: String,
    required: true,
    enum: Object.values(Activity),
  },
  friends: {
    type: Schema.Types.Mixed,
    ref: 'User',
    required: false,
  },
  groups: {
    type: Schema.Types.Mixed,
    ref: 'Group',
    required: false,
  },
  stats: {
    type: Array,
    required: false,
  },
  favorites: {
    type: Schema.Types.Mixed,
    ref: 'Track',
    required: false,
  },
  challenges: {
    type: Schema.Types.Mixed,
    ref: 'Challenge',
    required: false,
  },
  records: {
    type: Schema.Types.Mixed,
    required: false,
  },
})

/**
 * Model for the User schema.
 */
export const UserModel = model<UserInterface<string>>('User', UserSchema)

/**
 * Schema representing a group of the app.
 */
export const GroupSchema = new Schema<GroupInterface<string>>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  members: {
    type: Schema.Types.Mixed,
    ref: 'User',
    required: false,
  },
  stats: {
    type: Array,
    required: false,
  },
  ranking: {
    type: Schema.Types.Mixed,
    ref: 'User',
    required: false,
  },
  favorites: {
    type: Schema.Types.Mixed,
    ref: 'Track',
    required: false,
  },
  records: {
    type: Schema.Types.Mixed,
    required: false,
  },
})

/**
 * Model for the Group schema.
 */
export const GroupModel = model<GroupInterface<string>>('Group', GroupSchema)

/**
 * Schema representing a challenge of the app.
 */
export const ChallengeSchema = new Schema<ChallengeInterface<string>>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  activity: {
    type: String,
    required: true,
    enum: Object.values(Activity),
  },
  tracks: {
    type: Schema.Types.Mixed,
    ref: 'Track',
    required: false,
  },
  users: {
    type: Schema.Types.Mixed,
    ref: 'User',
    required: false,
  },
})

/**
 * Model for the Challenge schema.
 */
export const ChallengeModel = model<ChallengeInterface<string>>(
  'Challenge',
  ChallengeSchema
)
