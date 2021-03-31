import {eesDB, employeesDB, responsibilitiesDB, holidaysDB} from '../connection';
import {eesSchema} from '../schemas';
import {validateDataAgainstSchema} from '../schemas/validator';

export const ADD_EES_DATA = async (data) => {
  const {value, error} = await validateDataAgainstSchema(data, eesSchema);
  if (error) throw error;

  return eesDB.asyncInsert(value);
};

export const ADD_EMPLOYEES_DATA = async (data) => {
  const value = data;
  return employeesDB.asyncInsert(value);
};

export const ADD_RESPONSIBILITIES_DATA = async (data) => {
  const value = data;
  return responsibilitiesDB.asyncInsert(value);
};

export const ADD_EMPLOYEE_RTS_DATA = async (id, queryFields, data) => {
  const employee = await employeesDB.asyncFindOne({_id: id});
  const employeeYearIndex = employee.calendar.findIndex((year) => year.year === queryFields.year);
  const employeeMonthIndex = employee.calendar
    .filter((year) => year.year === queryFields.year)[0]
    .months.findIndex((el) => el.month === queryFields.month);

  return employeesDB.asyncUpdate(
    {_id: id},
    {
      $push: {
        [`calendar.${employeeYearIndex}.months.${employeeMonthIndex}.rts`]: data,
      },
    }
  );
};

export const ADD_EMPLOYEE_NEW_YEAR_CALENDAR = async (id, data) => {
  const res = employeesDB.asyncUpdate({_id: id}, {$push: {calendar: data}});
  return res;
};

export const ADD_PUBLIC_HOLIDAYS_DATA = async (data) => holidaysDB.asyncInsert(data);
