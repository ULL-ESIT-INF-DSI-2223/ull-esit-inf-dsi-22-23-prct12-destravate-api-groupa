import express from 'express'
import { Server as HttpServer } from 'http'
import { connect } from 'mongoose'

import { Track, User, Group, Challenge } from './Models.js'

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
  public start(port: number) {
    this.server = this.app.listen(port, () => {
      console.log(`Server listening on port ${port}`)
    })
  }

  /**
   * Shuts down the server
   */
  public stop(): void {
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
    const query = req.query
    if (req.url.includes('?')) url = req.url.substring(0, req.url.indexOf('?'))
    switch (url) {
      case '/tracks':
        model = Track
        break
      case '/users':
        model = User
        break
      case '/groups':
        model = Group
        break
      case '/challenges':
        model = Challenge
        break
      default:
        break
    }
    if (model && query.id)
      model
        .find({ id: query.id })
        .then((result) => {
          if (result.length === 0)
            res.status(404).json({ message: 'Not found' })
          else res.status(200).json({ message: 'Found', result: result })
        })
        .catch((err) => {
          res.status(500).json({ message: err })
        })
    else if (model && query.name)
      model
        .find({ name: query.name })
        .then((result) => {
          if (result.length === 0)
            res.status(404).json({ message: 'Not found' })
          else res.status(200).json({ message: 'Found', result: result })
        })
        .catch((err) => {
          res.status(500).json({ message: err })
        })
    else if (model)
      model
        .find()
        .then((result) => {
          if (result.length === 0)
            res.status(404).json({ message: 'Not found' })
          else res.status(200).json({ message: 'Found', result: result })
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
    const query = req.query
    if (req.url.includes('?')) url = req.url.substring(0, req.url.indexOf('?'))
    switch (url) {
      case '/tracks':
        query.start = JSON.parse(query.start as string)
        query.end = JSON.parse(query.end as string)
        document = new Track(query)
        break
      case '/users':
        document = new User(query)
        break
      case '/groups':
        document = new Group(query)
        break
      case '/challenges':
        document = new Challenge(query)
        break
      default:
        break
    }
    if (document)
      document
        .save()
        .then((result) => {
          res.status(201).json({ message: 'Created', result: result })
        })
        .catch((err) => {
          res.status(500).json({ message: err })
        })
    else res.status(500).json({ message: 'Bad parameters' })
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
    const query = req.query
    if (req.url.includes('?')) url = req.url.substring(0, req.url.indexOf('?'))
    switch (url) {
      case '/tracks':
        model = Track
        break
      case '/users':
        model = User
        break
      case '/groups':
        model = Group
        break
      case '/challenges':
        model = Challenge
        break
      default:
        break
    }
    if (model && query.id)
      model
        .deleteMany({ id: query.id })
        .then((result) => {
          res.status(200).json({ message: 'Deleted', result: result })
        })
        .catch((err) => {
          res.status(500).json({ message: err })
        })
    else if (model)
      model
        .deleteMany({ name: query.name })
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
    const query = req.query
    if (req.url.includes('?')) url = req.url.substring(0, req.url.indexOf('?'))
    switch (url) {
      case '/tracks':
        model = Track
        break
      case '/users':
        model = User
        break
      case '/groups':
        model = Group
        break
      case '/challenges':
        model = Challenge
        break
      default:
        break
    }
    if (model && query.id)
      model
        .findOneAndUpdate({ id: query.id }, query, { new: true })
        .then((result) => {
          if (!result) res.status(404).json({ message: 'Not found' })
          else res.status(200).json({ message: 'Updated', result: result })
        })
        .catch((err) => {
          res.status(500).json({ message: err })
        })
    else res.status(500).json({ message: 'Bad parameters' })
  }
}
new Server().start(3000)
