import {eesDB, employeesDB, responsibilitiesDB} from '../connection';

export const GET_ALL_EES_DATA = async () => {
  return await eesDB.asyncFind({});
};

export const GET_EES_DATA_BY_ID = async (id) => {
  return await eesDB.asyncFindOne({_id: id});
};

export const GET_ALL_EMPLOYEES_DATA = async () => {
  return await employeesDB.asyncFind({});
};

export const GET_EMPLOYEE_DATA_BY_ID = async (id) => {
  return await employeesDB.asyncFindOne({_id: id});
};

export const GET_RESPONSIBILITIES_DATA_BY_EMPLOYEE = async (id) => {
  return await responsibilitiesDB.asyncFindOne({employee: id});
};
