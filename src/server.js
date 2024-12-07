import process from 'node:process'
import dotenv from 'dotenv'
import minimist from 'minimist'
import { app } from './app.js'

const args = minimist(process.argv.slice(2))
const PORT = args.port || 3000
const MODE = process.env.NODE_ENV || 'development'
const server = app.listen(PORT)

if (MODE === 'production') {
  dotenv.config({ path: '.env' })
}
else if (MODE === 'test') {
  dotenv.config({ path: '.env.test' })
}
else {
  dotenv.config({ path: '.env.development' })
}

server.on('listening', () => {
  // @ts-ignore
  const { address, port } = server.address()
  const host = address === '::' ? 'localhost' : address

  console.log(`Server is listening on ${host}:${port} in ${MODE} mode`)
})

// @esbuild-begin-strip
// @ts-ignore
if (import.meta.hot) {
  // @ts-ignore
  import.meta.hot.on('vite:beforeFullReload', () => {
    console.log('Restarting server...')
    server.close()
  })
}
// @esbuild-end-strip
