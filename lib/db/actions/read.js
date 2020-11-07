import { eesDB } from '../connection'

export const GET_ALL_EES_DATA = async () => {
	return await eesDB.asyncFind({})
}

export const GET_EES_DATA_BY_ID = async (id) => {
	return await eesDB.asyncFindOne({ _id: id })
}
