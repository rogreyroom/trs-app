import Joi from 'joi';

export const employeesSchema = Joi.object().keys({
  name: Joi.string().required().error(new Error(`Name is required and should be a string!`))
})

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