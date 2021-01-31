// Connection
import path from 'path'
const { AsyncNedb } = require('nedb-async')
const dbDirectory = path.join(process.cwd(), './db')

export const eesDB = new AsyncNedb({
  filename: path.join(dbDirectory, 'ees.db'),
  autoload: true
})

export const employeesDB = new AsyncNedb({
  filename: path.join(dbDirectory, 'employees.db'),
  autoload: true
})

export const responsibilitiesDB = new AsyncNedb({
  filename: path.join(dbDirectory, 'responsibilities.db'),
  autoload: true
})