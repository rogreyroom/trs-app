import {eesDB, employeesDB, responsibilitiesDB} from '../connection';

export const UPDATE_EES_DATA = async (id, data) => {
  const {type, count_type, symbol, percent, description} = data;
  return eesDB.asyncUpdate(
    {_id: id},
    {
      $set: {
        type,
        count_type,
        symbol,
        percent,
        description,
      },
    }
  );
};

export const UPDATE_EMPLOYEE_JUVENILE_STATUS = async (id, data) =>
  employeesDB.asyncUpdate({_id: id}, {$set: {juvenile_worker: data.newJuvenileStatus}});

export const UPDATE_EMPLOYEE_TERMINATION_DATE = async (id, data) =>
  employeesDB.asyncUpdate(
    {_id: id},
    {
      $set: {
        employment_termination_date: data.date,
        employment_status: data.status,
      },
    }
  );

export const UPDATE_EMPLOYEE_HOLIDAY_DATES = async (id, queryFields, data) => {
  const employee = await employeesDB.asyncFindOne({_id: id});
  const employeeYearIndex = employee.calendar.findIndex((year) => year.year === queryFields.year);
  const employeeMonthIndex = employee.calendar
    .filter((year) => year.year === queryFields.year)[0]
    .months.findIndex((el) => el.month === queryFields.month);
  return employeesDB.asyncUpdate(
    {_id: id},
    {
      $push: {
        [`calendar.${employeeYearIndex}.months.${employeeMonthIndex}.holiday_leave`]: data.date,
      },
    }
  );
};

export const REMOVE_EMPLOYEE_HOLIDAY_DATES = async (id, queryFields, data) => {
  const employee = await employeesDB.asyncFindOne({_id: id});
  const employeeYearIndex = employee.calendar.findIndex((year) => year.year === queryFields.year);
  const employeeMonthIndex = employee.calendar
    .filter((year) => year.year === queryFields.year)[0]
    .months.findIndex((el) => el.month === queryFields.month);
  return employeesDB.asyncUpdate(
    {_id: id},
    {
      $pull: {
        [`calendar.${employeeYearIndex}.months.${employeeMonthIndex}.holiday_leave`]: data,
      },
    }
  );
};

export const UPDATE_EMPLOYEE_SICK_DATES = async (id, queryFields, data) => {
  const employee = await employeesDB.asyncFindOne({_id: id});
  const employeeYearIndex = employee.calendar.findIndex((year) => year.year === queryFields.year);
  const employeeMonthIndex = employee.calendar
    .filter((year) => year.year === queryFields.year)[0]
    .months.findIndex((el) => el.month === queryFields.month);
  return employeesDB.asyncUpdate(
    {_id: id},
    {
      $push: {
        [`calendar.${employeeYearIndex}.months.${employeeMonthIndex}.sick_leave`]: data.date,
      },
    }
  );
};

export const REMOVE_EMPLOYEE_SICK_DATES = async (id, queryFields, data) => {
  const employee = await employeesDB.asyncFindOne({_id: id});
  const employeeYearIndex = employee.calendar.findIndex((year) => year.year === queryFields.year);
  const employeeMonthIndex = employee.calendar
    .filter((year) => year.year === queryFields.year)[0]
    .months.findIndex((el) => el.month === queryFields.month);
  return employeesDB.asyncUpdate(
    {_id: id},
    {
      $pull: {
        [`calendar.${employeeYearIndex}.months.${employeeMonthIndex}.sick_leave`]: data,
      },
    }
  );
};

export const UPDATE_EMPLOYEE_OTHER_LEAVE_DATES = async (id, queryFields, data) => {
  const employee = await employeesDB.asyncFindOne({_id: id});
  const employeeYearIndex = employee.calendar.findIndex((year) => year.year === queryFields.year);
  const employeeMonthIndex = employee.calendar
    .filter((year) => year.year === queryFields.year)[0]
    .months.findIndex((el) => el.month === queryFields.month);
  return employeesDB.asyncUpdate(
    {_id: id},
    {
      $push: {
        [`calendar.${employeeYearIndex}.months.${employeeMonthIndex}.other_leave`]: data.date,
      },
    }
  );
};

export const REMOVE_EMPLOYEE_OTHER_LEAVE_DATES = async (id, queryFields, data) => {
  const employee = await employeesDB.asyncFindOne({_id: id});
  const employeeYearIndex = employee.calendar.findIndex((year) => year.year === queryFields.year);
  const employeeMonthIndex = employee.calendar
    .filter((year) => year.year === queryFields.year)[0]
    .months.findIndex((el) => el.month === queryFields.month);
  return employeesDB.asyncUpdate(
    {_id: id},
    {
      $pull: {
        [`calendar.${employeeYearIndex}.months.${employeeMonthIndex}.other_leave`]: data,
      },
    }
  );
};

export const UPDATE_EMPLOYEE_RTS_DATA = async (id, queryFields, data) => {
  const employee = await employeesDB.asyncFindOne({_id: id});
  const employeeYearIndex = employee.calendar.findIndex((year) => year.year === queryFields.year);
  const employeeMonthIndex = employee.calendar
    .filter((year) => year.year === queryFields.year)[0]
    .months.findIndex((el) => el.month === queryFields.month);
  const rtsDayIndex = employee.calendar
    .filter((year) => year.year === queryFields.year)[0]
    .months.filter((el) => el.month === queryFields.month)[0]
    .rts.findIndex((day) => JSON.stringify(day.due_date) === JSON.stringify(data.due_date));

  return employeesDB.asyncUpdate(
    {_id: id},
    {
      $set: {
        [`calendar.${employeeYearIndex}.months.${employeeMonthIndex}.rts.${rtsDayIndex}`]: data,
      },
    }
  );
};

export const UPDATE_BASIC_EMPLOYEE_INFO = async (id, data) =>
  employeesDB.asyncUpdate(
    {_id: id},
    {
      $set: {
        name: data.name,
        surname: data.surname,
        position: data.position,
        employment_start_date: data.employment_start_date,
        overdue_leave_amount: data.overdue_leave_amount,
        assigned_leave_amount: data.assigned_leave_amount,
      },
    }
  );

export const UPDATE_EMPLOYEE_MONTHLY_RATES = async (id, data) => {
  const {year, month} = data;
  const employee = await employeesDB.asyncFindOne({_id: id});
  const employeeYearIndex = employee.calendar.findIndex((y) => y.year === year);
  const resArray = [];
  for (let monthIterator = month; monthIterator <= 12; monthIterator += 1) {
    const employeeMonthIndex = employee.calendar
      .filter((y) => y.year === year)[0]
      .months.findIndex((el) => el.month === monthIterator);
    const res = employeesDB.asyncUpdate(
      {_id: id},
      {
        $set: {
          [`calendar.${employeeYearIndex}.months.${employeeMonthIndex}.hourly_rate`]: data.hourly_rate,
          [`calendar.${employeeYearIndex}.months.${employeeMonthIndex}.overtime_rate`]: data.overtime_rate,
          [`calendar.${employeeYearIndex}.months.${employeeMonthIndex}.holiday_rate`]: data.holiday_rate,
          [`calendar.${employeeYearIndex}.months.${employeeMonthIndex}.sick_leave_rate`]: data.sick_leave_rate,
          [`calendar.${employeeYearIndex}.months.${employeeMonthIndex}.other_leave_rate`]: data.other_leave_rate,
          [`calendar.${employeeYearIndex}.months.${employeeMonthIndex}.insurance_rate`]: data.insurance_rate,
          [`calendar.${employeeYearIndex}.months.${employeeMonthIndex}.retainment_rate`]: data.retainment_rate,
          [`calendar.${employeeYearIndex}.months.${employeeMonthIndex}.to_account_rate`]: data.to_account_rate,
          [`calendar.${employeeYearIndex}.months.${employeeMonthIndex}.bonus_rate`]: data.bonus_rate,
          [`calendar.${employeeYearIndex}.months.${employeeMonthIndex}.overtime_rate_multiplier`]: data.overtime_rate_multiplier,
          [`calendar.${employeeYearIndex}.months.${employeeMonthIndex}.overtime_hours_multiplier`]: data.overtime_hours_multiplier,
        },
      }
    );
    resArray.push(res);
  }
  return resArray;
};

export const UPDATE_EMPLOYEE_DATA = async (id, data) => {
  const {
    name,
    surname,
    position,
    juvenile_worker,
    employment_status,
    employment_start_date,
    employment_termination_date,
    overdue_leave_amount,
    assigned_leave_amount,
  } = data;
  return employeesDB.asyncUpdate(
    {_id: id},
    {
      $set: {
        name,
        surname,
        position,
        juvenile_worker,
        employment_status,
        employment_start_date,
        employment_termination_date,
        overdue_leave_amount,
        assigned_leave_amount,
      },
    }
  );
};

export const UPDATE_RESPONSIBILITIES_DATA = async (employee, data) =>
  responsibilitiesDB.asyncUpdate({employee}, {$set: {text: data.text}});
