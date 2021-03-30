// Connection
import path from 'path';

const {AsyncNedb} = require('nedb-async');

const isProd = process.env.NODE_ENV === 'production';
let dbDirectory = '.';

if (isProd) {
  // mac
  // dbDirectory = path.join(app.getAppPath(), '../../../../db');
  // portable win
  dbDirectory = path.join(process.env.PORTABLE_EXECUTABLE_DIR, '/db');
  console.log('PRODUCTION dbDirectory', dbDirectory);
} else {
  dbDirectory = path.join(process.cwd(), 'resources/db');
  console.log('DEVELOPMENT dbDirectory', dbDirectory);
}

// const app = require('electron').remote.app

// console.log('REMOTE', app.getAppPath(), '||||', path.join(app.getAppPath(), '../resource/db'));

console.log('process.cwd()', process.cwd(), dbDirectory);

export const eesDB = new AsyncNedb({
  filename: path.join(dbDirectory, 'ees.db'),
  autoload: true,
});

export const employeesDB = new AsyncNedb({
  filename: path.join(dbDirectory, 'employees.db'),
  autoload: true,
});

export const responsibilitiesDB = new AsyncNedb({
  filename: path.join(dbDirectory, 'responsibilities.db'),
  autoload: true,
});

export const holidaysDB = new AsyncNedb({
  filename: path.join(dbDirectory, 'holidays.db'),
  autoload: true,
});

export const usersDB = new AsyncNedb({
  filename: path.join(dbDirectory, 'users.db'),
  autoload: true,
});
