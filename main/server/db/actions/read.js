import {eesDB, employeesDB, responsibilitiesDB, holidaysDB, usersDB} from '../connection';

export const GET_ALL_EES_DATA = async () => eesDB.asyncFind({});

export const GET_EES_DATA_BY_ID = async (id) => eesDB.asyncFindOne({_id: id});

export const GET_ALL_EMPLOYEES_DATA = async () => employeesDB.asyncFind({});

export const GET_EMPLOYEE_DATA_BY_ID = async (id) => employeesDB.asyncFindOne({_id: id});

export const GET_RESPONSIBILITIES_DATA_BY_EMPLOYEE = async (id) =>
  responsibilitiesDB.asyncFindOne({employee: id});

export const GET_PUBLIC_HOLIDAYS_DATA_BY_YEAR = async (theYear) =>
  holidaysDB.asyncFindOne({year: theYear});

export const GET_USER = async (name) => usersDB.asyncFindOne({user: name});
