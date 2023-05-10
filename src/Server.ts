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
  }

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
    if (model && req.query.id)
      model
        .find({ id: req.query.id })
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
    if (req.url.includes('?')) url = req.url.substring(0, req.url.indexOf('?'))
    switch (url) {
      case '/tracks':
        let query = req.query
        query.start = JSON.parse(query.start as string)
        query.end = JSON.parse(query.end as string)
        document = new Track(query)
        break
      case '/users':
        document = new User(req.query)
        break
      case '/groups':
        document = new Group(req.query)
        break
      case '/challenges':
        document = new Challenge(req.query)
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
    if (model)
      model
        .deleteMany(req.query)
        .then((result) => {
          res.status(200).json({ message: 'Deleted', result: result })
        })
        .catch((err) => {
          res.status(500).json({ message: err })
        })
    else res.status(500).json({ message: 'Bad parameters' })
  }

  private patch = async (req: express.Request, res: express.Response) => {}
}
new Server().start(3000)
