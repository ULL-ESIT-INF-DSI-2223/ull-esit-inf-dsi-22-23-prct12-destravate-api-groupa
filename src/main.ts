import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

import { Server } from './Server.js'

/**
 * Main function of the app for testing purposes.
 */
function main() {
  new Server().start(3030)
  yargs(hideBin(process.argv))
    .command(
      'start',
      'Starts the server',
      (yargs) => {
        yargs.option('port', {
          alias: 'p',
          type: 'number',
          description: 'Port to listen on',
          demandOption: true,
        })
      },
      (argv) => {
        const server = new Server()
        server.start(argv.port as number)
      }
    )
    .help().argv
  return 0
}

main()
