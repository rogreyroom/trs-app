import Joi from 'joi';

export const employeesSchema = Joi.object().keys({
  name: Joi.string().required().error(new Error(`Name is required and should be a string!`)),
  surname: Joi.string().required().error(new Error(`Błąd surname`)),
  position: Joi.string().required().error(new Error(`Błąd position`)),
  juvenile_worker: Joi.boolean().required().error(new Error(`Błąd juvenile_worker`)),
  employment_status: Joi.boolean().required().error(new Error(`Błąd employment_status`)),
  employment_start_date: Joi.object({
    year: Joi.number().empty(null),
    month: Joi.number().empty(null),
    day: Joi.number().empty(null)
  }).required().error(new Error(`Błąd employment_start_date`)),
  employment_termination_date: Joi.object({
    year: Joi.number().empty(null),
    month: Joi.number().empty(null),
    day: Joi.number().empty(null)
  }).error(new Error(`Błąd `)),
  overdue_leave_amount: Joi.number().required().error(new Error(`Błąd overdue_leave_amount`)),
  assigned_leave_amount: Joi.number().required().error(new Error(`Błąd assigned_leave_amount`)),

  calendar: Joi.array().items(
    Joi.object({
      year: Joi.number(),
      months: Joi.array().items(
        Joi.object({
          month: Joi.number(),
          hourly_rate: Joi.number().required(),
          overtime_rate: Joi.number().required(),
          holiday_rate: Joi.number().required(),
          sick_leave_rate: Joi.number().required(),
          insurance_rate: Joi.number().required(),
          bonus_rate: Joi.number().required(),
          overtime_rate_multiplier: Joi.number().required(),
          overtime_hours_multiplier: Joi.number().required(),
          // holiday_leave: [],
          // sick_leave: [],
          // other_leave: [],
          // rts: []
        })
      )
    })
  ),

})

// Add
export const employeeAddFormSchema = Joi.object().keys({
  employment_start_date: Joi.object({
    year: Joi.number().empty(null),
    month: Joi.number().empty(null),
    day: Joi.number().empty(null)
  }).required(),
  juvenile_worker: Joi.boolean().required(),
  name: Joi.string().pattern(/^[a-zA-Z]|\-$/).required(),
  surname: Joi.string().pattern(/^[a-zA-Z]|\-$/).required(),
  position: Joi.string().pattern(/^[a-zA-Z]|[0-9]\-+$/).required(),
  overdue_leave_amount: Joi.number().required(),
  assigned_leave_amount: Joi.number().required(),
  bonus_rate: Joi.number().required(),
  employment_termination_date: Joi.object({
    year: Joi.number().empty(null),
    month: Joi.number().empty(null),
    day: Joi.number().empty(null)
  }).allow(null),
  hourly_rate: Joi.number().required(),
  holiday_rate: Joi.number(),
  sick_leave_rate: Joi.number(),
  other_leave_rate: Joi.number(),
  insurance_rate: Joi.number(),
  retainment_rate: Joi.number(),
  to_account_rate: Joi.number(),
  overtime_rate_multiplier: Joi.number(),
  overtime_hours_multiplier: Joi.number(),
})

// Edit
export const employeeEditFormSchema = Joi.object().keys({
  year: Joi.required(),
  month: Joi.required(),
  name: Joi.string().pattern(/^[a-zA-Z]|\-$/).required(),
  surname: Joi.string().pattern(/^[a-zA-Z]|\-$/).required(),
  position: Joi.string().pattern(/^[a-zA-Z]|[0-9]\-+$/).required(),
  overdue_leave_amount: Joi.number().required(),
  assigned_leave_amount: Joi.number().required(),
  employment_termination_date: Joi.object({
    year: Joi.number().empty(null),
    month: Joi.number().empty(null),
    day: Joi.number().empty(null)
  }).allow(null),
  hourly_rate: Joi.number().required(),
  holiday_rate: Joi.number(),
  sick_leave_rate: Joi.number(),
  other_leave_rate: Joi.number(),
  insurance_rate: Joi.number(),
  retainment_rate: Joi.number(),
  to_account_rate: Joi.number(),
  bonus_rate: Joi.number().required(),
  overtime_rate_multiplier: Joi.number(),
  overtime_hours_multiplier: Joi.number(),
})

// {
//   "doc": "employee",
//   "name": "",
//   "surname": "",
//   "position": "",
//   "juvenile_worker": false,
//   "employment_status": true,
//   "employment_start_date": {},
//   "employment_termination_date": {},
//   "overdue_leave_amount": null,
//   "assigned_leave_amount": null,
//   "calendar": [
//     {
//       "year": null,
//       "months": [
//         {
//           "month": null,
//           "holiday_leave": [],
//           "sick_leave": [],
//           "other_leave": [],
//           "rts": [
//             "rtsDate": {}
//             "working_hours": null
//             "overtime_hours": null
//             "weekend_hours": null
//             "evaluation": []
//           ]
//           "hourly_rate": null,
//           "overtime_rate": null,
//           "holiday_rate": null,
//           "sick_leave_rate": null,
//           "insurance_rate": null,
//           "bonus_rate": null,
//           "overtime_rate_multiplier": null,
//           "overtime_hours_multiplier": null
//         }
//       ]
//     }
//   ]
// }

// _id: ,
// doc: ,
// name: Joi.string().required(),
// surname Joi.string().required(),
// position: Joi.string().required(),
// employment_status: ,
// employment_start_date: ,
// employment_termination_date: ,
// overdue_leave_amount: Joi.number().required(),
// assigned_leave_amount: Joi.number().required(),
// calendar:[ ,
//   {
//     year: Joi.number().required(),
//     months:[ ,
//       {
//         month: Joi.number().required(),
//         holiday_leave:[
//           {
//             date_from: ,
//             date_to: ,
//             days: Joi.number().required(),
//           }
//         ]
//         sick_leave:[ ,
//           {
//             date_from: ,
//             date_to ,
//             days: Joi.number().required(),
//           }
//         ]
//         other_leave:[ ,
//           {
//             date_from ,
//             date_to ,
//             days: Joi.number().required(),
//           }
//         ]
//         hourly_rate: Joi.number().required(),
//         overtime_rate: Joi.number().required(),
//         holiday_rate: Joi.number().required(),
//         sick_leave_rate: Joi.number().required(),
//         insurance_rate: Joi.number().required(),
//         bonus_rate: Joi.number().required(),
//         hourly_rate_multiplier: Joi.number().required(),
//         overtime_rate_multiplier: Joi.number().required(),
//         overtime_hours_multiplier: Joi.number().required(),
//       }
//     ]
//   }
// ]


// export const eesFormSchema = Joi.object().keys({
// 	type: Joi.string().required(),
// 	count_type: Joi.string().valid('auto', 'manual').required(),
// 	symbol: Joi.string().required(),
// 	percent: Joi.number().required(),
// 	description: Joi.string().required()
// })