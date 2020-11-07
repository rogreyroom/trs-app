// Connection
import path from 'path'
const { AsyncNedb } = require('nedb-async')
const dbDirectory = path.join(process.cwd(), './db')

export const eesDB = new AsyncNedb({
  filename: path.join(dbDirectory, 'ees.db'),
  autoload: true
})