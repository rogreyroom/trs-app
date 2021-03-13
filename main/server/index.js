// yarn add cors joi helmet morgan

// importing the dependencies
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const port = 3001;

// defining the Express app
const app = express();
// const router = express.Router
// console.log('EXPRESS APP path', router.stack);

// ----------------------

import handleEmployeesRequest from './api/employees';
import handleEmployeesByIdRequest from './api/employeesId';
import handleEssRequest from './api/ees';
import handleEesByIdRequest from './api/eesId';
import handleResponsibilitiesByEmployeeRequest from './api/responsibilities';

// ----------------------

// console.log('handleEmployeesRequest', handleEmployeesRequest);

console.log('SERVER CALL');
app.use(express.json());

// adding Helmet to enhance your API's security
app.use(helmet());

// enabling CORS for all requests
app.use(cors());

// adding morgan to log HTTP requests
app.use(morgan('combined'));

// defining an endpoints
app.get('/api/employees', handleEmployeesRequest);
app.post('/api/employees', handleEmployeesRequest);
app.get('/api/employees/:id', handleEmployeesByIdRequest);
app.put('/api/employees/:id', handleEmployeesByIdRequest);
app.get('/api/ees', handleEssRequest);
app.get('/api/ees/:id', handleEesByIdRequest);
app.put('/api/ees/:id', handleEesByIdRequest);
app.get('/api/responsibilities/:id', handleResponsibilitiesByEmployeeRequest);
app.post('/api/responsibilities/:id', handleResponsibilitiesByEmployeeRequest);
app.put('/api/responsibilities/:id', handleResponsibilitiesByEmployeeRequest);

// starting the server
app.listen(port, () => {
  console.log(`Server: listening on port ${port}`);
});
