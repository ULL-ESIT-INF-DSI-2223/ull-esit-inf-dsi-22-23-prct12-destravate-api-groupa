import express from 'express'
import { Server as HttpServer } from 'http'

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
  public constructor() {}
}
