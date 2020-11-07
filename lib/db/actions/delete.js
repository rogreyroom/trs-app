import { eesDB } from '../connection'

export const REMOVE_EES_DATA = async (id) => {
	return await eesDB.asyncRemove({ _id: id });
};
