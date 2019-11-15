import axios from 'axios';
import {pollingData} from '../actions/actions';
import * as actionTypes from '../constants/constants';

axios.defaults.baseURL = 'https://napi.busbud.com/x-departures/';
axios.defaults.headers = {
    'Accept': 'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/',
    'X-Busbud-Token': 'PARTNER_AHm3M6clSAOoyJg4KyCg7w'
};

const delay = (delayTime) => {
    return new Promise(resolve => {
        setTimeout(() => resolve(true), delayTime);
    });
};

const api = ({getState, dispatch}) => next => async action => {
    next(action);

    if (action.type !== actionTypes.API) {
        return;
    }
    const {params, delayTime, onSuccess, onFailure} = action.payload;

    if (delayTime) {
        await delay(delayTime);
    }

    try {
        const {data} = await axios.get(params);

        if (!data.complete) {
            const departureIndex = getState().departures.length + data.departures.length;
            const newPayload = params.indexOf('/poll') < 0 ? params + '/poll?index=' + departureIndex : params;
            dispatch(pollingData((newPayload)));
        }

        dispatch(onSuccess(data))

    } catch (error) {
        dispatch(onFailure(error));
    }
};

export default api;