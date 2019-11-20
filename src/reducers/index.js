import { combineReducers } from 'redux';
import { departures } from './departures';
import { locations } from './locations';
import { error } from'./error';
import {complete} from "./complete";

export const reducer = combineReducers({
    departures,
    locations,
    complete,
    error
});