import express from 'express'
import { Server as HttpServer } from 'http'
import { connect, disconnect } from 'mongoose'

import { Group } from './Group.js'

import { UniqueList } from './UniqueList.js'
import { ExtendedEntry } from './Entry.js'
import { TrackModel, UserModel, GroupModel, ChallengeModel } from './Models.js'

const dbURL = 'mongodb://localhost:27017'
const dbName = '/Destravate'

const routes = [
  '/tracks',
  '/tracks/:id',
  '/users',
  '/users/:id',
  '/groups',
  '/groups/:id',
  '/challenges',
  '/challenges/:id',
]

export class Server {
  /**
   * Instance of the http server.
   * @private
   * @type { HttpServer }
   */
  private server: HttpServer = new HttpServer()
  /**
   * Instance of the express app.
   * @private
   * @type {express.Application}
   */
  private app: express.Application = express()

  /* c8 ignore start */
  /**
   * Initializes the server of the app.
   */
  public constructor() {
    this.app.use(express.json())
    this.defineGet()
    this.definePost()
    this.defineDelete()
    this.definePatch()
    this.app.all('*', (_, res) => {
      res.status(501).send()
    })
  }

  /**
   * Defines the get requests of the server.
   */
  private defineGet() {
    for (const route of routes) {
      this.app.get(route, (req, res) => {
        this.get(req, res)
          .then(() => {
            console.log('Get request completed')
          })
          .catch((err) => {
            console.log('Error in get request: ' + err)
          })
      })
    }
  }

  /**
   * Defines the post requests of the server.
   */
  private definePost() {
    for (const route of routes) {
      this.app.post(route, (req, res) => {
        this.post(req, res)
          .then(() => {
            console.log('Post request completed')
          })
          .catch((err) => {
            console.log('Error in post request: ' + err)
          })
      })
    }
  }

  /**
   * Defines the delete requests of the server.
   */
  private defineDelete() {
    for (const route of routes) {
      this.app.delete(route, (req, res) => {
        this.delete(req, res)
          .then(() => {
            console.log('Delete request completed')
          })
          .catch((err) => {
            console.log('Error in delete request: ' + err)
          })
      })
    }
  }

  /**
   * Defines the patch requests of the server.
   */
  private definePatch() {
    for (const route of routes) {
      this.app.patch(route, (req, res) => {
        this.patch(req, res)
          .then(() => {
            console.log('Patch request completed')
          })
          .catch((err) => {
            console.log('Error in patch request: ' + err)
          })
      })
    }
  }

  /**
   * Starts listening on the specified port
   * @param port Port to listen on
   */
  public start(port = parseInt(process.env.PORT as string, 10)) {
    this.server = this.app.listen(port, () => {
      console.log(`Server listening on port ${port}`)
    })
  }

  /**
   * Shuts down the server
   */
  public stop(): void {
    disconnect()
    this.server.close()
  }
  /* c8 ignore stop */

  /**
   * Method to handle get requests.
   * @param req Request
   * @param res Response
   */
  private get = async (req: express.Request, res: express.Response) => {
    connect(dbURL + dbName)
      .then(() => {
        console.log('Connected to database ' + dbName)
        let model
        let url = req.url
        if (req.url.includes('?'))
          url = req.url.substring(0, req.url.indexOf('?'))
        switch (url) {
          case '/tracks':
            model = TrackModel
            break
          case '/users':
            model = UserModel
            break
          case '/groups':
            model = GroupModel
            break
          case '/challenges':
            model = ChallengeModel
            break
          default:
            break
        }
        if (model && req.params.id)
          model
            .findById(req.params.id)
            .then((result) => {
              this.searchResult(result, res)
            })
            .catch((err) => {
              res.status(500).json({ message: err })
            })
        else if (model && req.query.name)
          model
            .find({ name: req.query.name.toString() })
            .then((result) => {
              this.searchResult(result, res)
            })
            .catch((err) => {
              res.status(500).json({ message: err })
            })
        else if (model)
          model
            .find()
            .then((result) => {
              this.searchResult(result, res)
            })
            .catch((err) => {
              res.status(500).json({ message: err })
            })
        else res.status(400).json({ message: 'Bad parameters' })
      })
      .catch((err) => {
        console.log('Error connecting to database: ' + err)
      })
  }

  /**
   * Method to handle post requests.
   * @param req Request
   * @param res Response
   */
  private post = async (req: express.Request, res: express.Response) => {
    connect(dbURL + dbName)
      .then(() => {
        console.log('Connected to database ' + dbName)
        let document
        const url = req.url
        let body = req.body
        if (url.includes('?'))
          res.status(400).json({ message: 'Bad parameters' })
        try {
          switch (url) {
            case '/tracks':
              document = new TrackModel(body)
              this.createReferencesToTrack(document)
              break
            case '/users':
              document = new UserModel(body)
              this.createReferencesToUser(document)
              break
            case '/groups':
              body = this.updateBody(body)
              document = new GroupModel(body)
              this.createReferencesToGroup(document)
              break
            case '/challenges':
              document = new ChallengeModel(body)
              this.createReferencesToChallenge(document)
              break
            default:
              break
          }
        } catch (err) {
          res.status(400).json({ message: 'Bad parameters', error: err })
        }
        if (document) {
          document
            .save()
            .then((result) => {
              res.status(201).json({ message: 'Created', result: result })
            })
            .catch((err) => {
              res.status(500).json({ message: err })
            })
        } else res.status(400).json({ message: 'Bad parameters' })
      })
      .catch((err) => {
        console.log('Error connecting to database: ' + err)
      })
  }

  /**
   * Links the track to the other documents.
   * @param document Track document
   */
  private createReferencesToTrack(document: any): void {
    UserModel.find({ _id: { $in: document.users_log } }).then((users) => {
      if (
        users &&
        document.users_log &&
        users.length !== document.users_log.length
      )
        throw new Error('User not found')
    })
    UserModel.updateMany(
      { _id: { $in: document.users_log } },
      { $push: { tracks: document._id } },
      { multi: true, runValidators: true }
    )
  }

  /**
   * Links the user to the other documents.
   * @param document User document
   */
  private createReferencesToUser(document: any): void {
    TrackModel.find({ _id: { $in: document.favorites } }).then((tracks) => {
      if (
        tracks &&
        document.favorites &&
        tracks.length !== document.favorites.length
      )
        throw new Error('Track not found')
    })
    TrackModel.updateMany(
      { _id: { $in: document.favorites } },
      { $push: { users_log: document._id } },
      { multi: true, runValidators: true }
    )
    ChallengeModel.find({ _id: { $in: document.challenges } }).then(
      (challenges) => {
        if (
          challenges &&
          document.challenges &&
          challenges.length !== document.challenges.length
        )
          throw new Error('Challenge not found')
      }
    )
    ChallengeModel.updateMany(
      { _id: { $in: document.challenges } },
      { $push: { users: document._id } },
      { multi: true, runValidators: true }
    )
    GroupModel.find({ _id: { $in: document.groups } }).then((groups) => {
      if (groups && document.groups && groups.length !== document.groups.length)
        throw new Error('Group not found')
    })
    GroupModel.updateMany(
      { _id: { $in: document.groups } },
      { $push: { members: document._id } },
      { multi: true, runValidators: true }
    )
  }

  /**
   * Links the group to the other documents.
   * @param document Group document
   */
  private createReferencesToGroup(document: any): void {
    UserModel.find({ _id: { $in: document.members } }).then((users) => {
      if (users && document.members && users.length !== document.members.length)
        throw new Error('User not found')
    })
    UserModel.updateMany(
      { _id: { $in: document.members } },
      { $push: { groups: document._id } },
      { multi: true, runValidators: true }
    )
  }

  /**
   * Links the challenge to the other documents.
   * @param document Challenge document
   */
  private createReferencesToChallenge(document: any): void {
    UserModel.find({ _id: { $in: document.users } }).then((users) => {
      if (users && document.users && users.length !== document.users.length)
        throw new Error('User not found')
    })
    UserModel.updateMany(
      { _id: { $in: document.users } },
      { $push: { challenges: document._id } },
      { multi: true, runValidators: true }
    )
  }

  /**
   * Method to handle delete requests.
   * @param req Request
   * @param res Response
   */
  private delete = async (req: express.Request, res: express.Response) => {
    connect(dbURL + dbName)
      .then(() => {
        console.log('Connected to database ' + dbName)
        let model
        let url = req.url
        if (req.url.includes('?'))
          url = req.url.substring(0, req.url.indexOf('?'))
        switch (url) {
          case '/tracks':
            model = TrackModel
            break
          case '/users':
            model = UserModel
            break
          case '/groups':
            model = GroupModel
            break
          case '/challenges':
            model = ChallengeModel
            break
          default:
            break
        }
        if (model && req.params.id) {
          model
            .deleteOne({ id: parseInt(req.params.id as string) })
            .then((result) => {
              this.deleteReferencesFromUser(req.params.id)
              res.status(200).json({ message: 'Deleted', result: result })
            })
            .catch((err) => {
              res.status(500).json({ message: err })
            })
        } else if (model && req.query.name) {
          model
            .findOne({ name: req.query.name })
            .then((result) => {
              if (result) {
                if (model === UserModel)
                  this.deleteReferencesFromUser(result.id)
              }
            })
            .catch((err) => {
              res.status(500).json({ message: err })
            })
          model
            .deleteOne({ name: req.query.name })
            .then((result) => {
              if (result.deletedCount === 0)
                res.status(404).json({ message: 'Not found' })
              else res.status(200).json({ message: 'Deleted', result: result })
            })
            .catch((err) => {
              res.status(500).json({ message: err })
            })
        } else {
          res.status(400).json({ message: 'Bad parameters' })
        }
      })
      .catch((err) => {
        console.log('Error connecting to database: ' + err)
      })
  }

  /**
   * Deletes all references to a user in the database before deleting the user.
   * @param id ID of the user to delete
   */
  private deleteReferencesFromUser(id: string): void {
    TrackModel.find({ users_log: { $in: [id] } }).then((tracks) => {
      tracks.forEach((track) => {
        track.users_log = new UniqueList<string>(
          ...track.users_log.filter((user) => user !== id)
        )
        track.save()
      })
    })
    UserModel.find({ friends: { $in: [id] } }).then((users) => {
      users.forEach((user) => {
        user.friends = new UniqueList<string>(
          ...user.friends.filter((friend) => friend !== id)
        )
        user.save()
      })
    })
    GroupModel.find({ members: { $in: [id] } }).then((groups) => {
      groups.forEach((group) => {
        group.members = new UniqueList<string>(
          ...group.members.filter((member) => member !== id)
        )
        group.ranking.splice(group.ranking.indexOf(id), 1)
        group.records.forEach((record) => {
          record.users.splice(record.users.indexOf(id), 1)
        })
      })
    })
    ChallengeModel.find({ users: { $in: [id] } }).then((challenges) => {
      challenges.forEach((challenge) => {
        challenge.users = new UniqueList<string>(
          ...challenge.users.filter((user) => user !== id)
        )
      })
    })
  }

  /**
   * Method to handle patch requests.
   * @param req Request
   * @param res Response
   */
  private patch = async (req: express.Request, res: express.Response) => {
    connect(dbURL + dbName)
      .then(() => {
        console.log('Connected to database ' + dbName)
        let model
        let url = req.url
        let body = req.body
        if (req.url.includes('?'))
          url = req.url.substring(0, req.url.indexOf('?'))
        switch (url) {
          case '/tracks':
            model = TrackModel
            break
          case '/users':
            model = UserModel
            break
          case '/groups':
            model = GroupModel
            body = this.updateBody(body)
            break
          case '/challenges':
            model = ChallengeModel
            break
          default:
            break
        }
        if (model && req.params.id)
          model
            .findByIdAndUpdate(req.params.id, body, {
              new: true,
              runValidators: true,
            })
            .then((result) => {
              this.searchResult(result, res)
            })
            .catch((err) => {
              res.status(500).json({ message: err })
            })
        else if (model && req.query.name)
          model
            .findOneAndUpdate({ name: req.query.name.toString() }, body, {
              new: true,
              runValidators: true,
            })
            .then((result) => {
              this.searchResult(result, res)
            })
            .catch((err) => {
              res.status(500).json({ message: err })
            })
        else res.status(400).json({ message: 'Bad parameters' })
      })
      .catch((err) => {
        console.log('Error connecting to database: ' + err)
      })
  }

  /**
   * Returns a status code depending on the result.
   * @param result Result of the search
   * @param res Response
   */
  private searchResult(result: any, res: express.Response): void {
    if (!result) res.status(404).json({ message: 'Not found' })
    else res.status(200).json({ message: 'Updated', result: result })
  }

  /**
   * Updates the document with the new records.
   * @param document Document to update
   * @param body Body of the request
   * @returns Updated document
   */
  private updateBody(body: any): any {
    const { id, name, members } = body
    const group = new Group(id, name, ...members)
    for (const record of body.records)
      record.users = new UniqueList(...record.users)
    group.records = new UniqueList<ExtendedEntry>(...body.records)
    const ranking = group.ranking.values
    body.ranking = ranking
    return body
  }
}
