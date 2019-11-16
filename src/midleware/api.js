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
    const {url, params, delayTime, onSuccess, onFailure} = action.payload;

    if (delayTime) {
        await delay(delayTime);
    }

    try {
        console.log(params)
        const {data} = await axios.request({
            method: 'get',
            url,
            params
        });

        if (!data.complete) {
            const index = getState().departures.length + data.departures.length;
            dispatch(pollingData(url, params, index));
        }

        dispatch(onSuccess(data))

    } catch (error) {
        dispatch(onFailure(error));
    }
};

export default api;