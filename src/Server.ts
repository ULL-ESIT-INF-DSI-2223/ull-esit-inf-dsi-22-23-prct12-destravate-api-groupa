import express from 'express'
import { Server as HttpServer } from 'http'
import { connect, disconnect } from 'mongoose'

import { Group } from './Group.js'

import { UniqueList } from './UniqueList.js'
import { ExtendedEntry } from './Entry.js'
import { TrackModel, UserModel, GroupModel, ChallengeModel } from './Models.js'

const dbURL = 'mongodb://localhost:27017'
const dbName = '/Destravate'

const routes = ['/tracks', '/users', '/groups', '/challenges']

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

  /**
   * Initializes the server of the app.
   */
  public constructor() {
    this.app.use(express.json())
    this.defineGet()
    this.definePost()
    this.defineDelete()
    this.definePatch()
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
  public start(port = 3030) {
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

  /**
   * Method to handle get requests.
   * @param req Request
   * @param res Response
   */
  private get = async (req: express.Request, res: express.Response) => {
    connect(dbURL + dbName)
      .then(() => {
        console.log('Connected to database ' + dbName)
      })
      .catch((err) => {
        console.log('Error connecting to database: ' + err)
      })

    let model
    let url = req.url
    if (req.url.includes('?')) url = req.url.substring(0, req.url.indexOf('?'))
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
    if (model && req.query.id)
      model
        .findOne({ id: parseInt(req.query.id as string) })
        .then((result) => {
          this.searchResult(result, res)
        })
        .catch((err) => {
          res.status(500).json({ message: err })
        })
    else if (model && req.query.name)
      model
        .find({ name: req.query.name })
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
    else res.status(500).json({ message: 'Bad parameters' })
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
      })
      .catch((err) => {
        console.log('Error connecting to database: ' + err)
      })

    let document
    let url = req.url
    let body = req.body
    if (req.url.includes('?')) url = req.url.substring(0, req.url.indexOf('?'))
    switch (url) {
      case '/tracks':
        document = new TrackModel(body)
        break
      case '/users':
        document = new UserModel(body)
        break
      case '/groups':
        body = this.updateBody(body)
        document = new GroupModel(body)
        break
      case '/challenges':
        document = new ChallengeModel(body)
        break
      default:
        break
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
    } else res.status(500).json({ message: 'Bad parameters' })
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
      })
      .catch((err) => {
        console.log('Error connecting to database: ' + err)
      })

    let model
    let url = req.url
    if (req.url.includes('?')) url = req.url.substring(0, req.url.indexOf('?'))
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
    if (model && req.query.id)
      model
        .deleteOne({ id: parseInt(req.query.id as string) })
        .then((result) => {
          res.status(200).json({ message: 'Deleted', result: result })
        })
        .catch((err) => {
          res.status(500).json({ message: err })
        })
    else if (model && req.query.name)
      model
        .deleteMany({ name: req.query.name })
        .then((result) => {
          res.status(200).json({ message: 'Deleted', result: result })
        })
        .catch((err) => {
          res.status(500).json({ message: err })
        })
    else res.status(500).json({ message: 'Bad parameters' })
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
      })
      .catch((err) => {
        console.log('Error connecting to database: ' + err)
      })

    let model
    let url = req.url
    let body = req.body
    if (req.url.includes('?')) url = req.url.substring(0, req.url.indexOf('?'))
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
    if (model && req.query.id)
      model
        .findOneAndUpdate({ id: parseInt(req.query.id as string) }, body, {
          new: true,
        })
        .then((result) => {
          this.searchResult(result, res)
        })
        .catch((err) => {
          res.status(500).json({ message: err })
        })
    else if (model && req.query.name)
      model
        .findOneAndUpdate({ name: req.query.name }, body, { new: true })
        .then((result) => {
          this.searchResult(result, res)
        })
        .catch((err) => {
          res.status(500).json({ message: err })
        })
    else res.status(500).json({ message: 'Bad parameters' })
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
