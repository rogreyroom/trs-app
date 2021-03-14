import {eesDB} from '../connection';

export const REMOVE_EES_DATA = async (id) => eesDB.asyncRemove({_id: id});
