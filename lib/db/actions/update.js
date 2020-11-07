import { eesDB } from '../connection'

export const UPDATE_EES_DAT = async (id, data) => {
	const { type, count_type, symbol, percent, percent_range, description } = data
	return await eesDB.asyncUpdate(
		{ _id: id },
		{ $set: {
				'type': type,
				'count_type': count_type,
				'symbol': symbol,
				'percent': percent,
				'percent_range': percent_range,
				'description': description
			}
		}
	)
}
