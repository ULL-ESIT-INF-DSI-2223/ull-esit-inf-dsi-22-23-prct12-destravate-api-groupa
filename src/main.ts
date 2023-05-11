import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

import { Server } from './Server.js'

/**
 * Options for the start command.
 */
interface StartOptions {
  port: number
}

/**
 * Fills an option object to be used in the yargs builder.
 * @param desc Description of the option.
 * @param tp Type of the option.
 * @param demand If the option is required or not.
 * @returns Option object.
 */
function FillOption(desc: string, tp: string, demand: boolean) {
  const option = {}
  Object.assign(option, {
    description: desc,
    type: tp,
    demandOption: demand,
  })
  return option
}

/**
 * Fill the user option for the start command.
 * @param yargs Yargs instance.
 * @returns Option object.
 */
const UserData = (yargs: yargs.Argv<StartOptions>) => {
  return yargs.option('port', FillOption('Server port', 'string', true))
}

/**
 * Main function of the app for testing purposes.
 */
function main() {
  const commands = yargs(hideBin(process.argv))
    .command('start', 'Starts the server', UserData, (argv) => {
      const server = new Server()
      server.start(argv.port as number)
    })
    .help()
  if (commands.argv) return 0
  else return 1
}

main()
