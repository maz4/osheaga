import React from 'react';
import {render, fireEvent, wait, waitForElement } from '@testing-library/react';
import axiosMock from 'axios';
import Root from '../Root';

afterEach( () => {
  axiosMock.get.mockReset();
});

const config = {
  method: 'GET',
  headers: {
    'Accept' : 'application/test; version=0; profile=https://test.com/',
    'X-Busbud-Token' : 'test'
  }
};

const origin_city_id = "375dd587-9001-acbd-84a4-683deda84183";
const destination_city_id = "375dd587-9001-acbd-84a4-683dedfb933e";

const cities = [
  {
    id: "375dd587-9001-acbd-84a4-683deda84183",
    geohash: "dr5reg",
    image_url:
        "https://busbud.imgix.net/city-hires/1474307214322-NewYork,NewYork,UnitedStates.jpg?h={height}&w={width}&auto=format,compress",
    full_name: "New York, New York, United States",
    locale: "en",
  },
  {
    id: "375dd587-9001-acbd-84a4-683dedfb933e",
    geohash: "f25dvk",
    image_url:
        "https://busbud.imgix.net/city-hires/1474307214311-Montreal,Quebec,Canada.jpg?h={height}&w={width}&auto=format,compress",
    full_name: "Montreal, Quebec, Canada",
    locale: "en",
  }
];

const locations = [
  {
    id: 1111,
    city_id: "375dd587-9001-acbd-84a4-683deda84183",
    name: "New York City",
    address: [],
  },
  {
    id: 2222,
    city_id: "375dd587-9001-acbd-84a4-683deda84183",
    name: "31st St & 8th Ave",
    address: [
      "349 W 31st St (between 8th & 9th Avenue)",
      "New York, NY 10001"
    ],
  },
  {
    id: 3333,
    city_id: "375dd587-9001-acbd-84a4-683deda84183",
    name: "34th St & 6th Ave",
    address: ["22 W 34th St", "New York", "NY 10001 USA"],
  },
];

const departures = [
  {
    origin_location_id: 1111,
    id: '1111aaaa',
    prices: {
      total: 111
    },
    departure_time: "2020-08-02T13:00:00",
    arrival_time: "2020-08-02T14:00:00"
  },
  {
    origin_location_id: 2222,
    id: '2222bbbb',
    prices: {
      total: 2222
    },
    departure_time: "2020-08-02T15:00:00",
    arrival_time: "2020-08-02T16:00:00"
  },
  {
    origin_location_id: 3333,
    id: '3333cccc',
    prices: {
      total: 3333
    },
    departure_time: "2020-11-12T17:30:00",
    arrival_time: "2020-11-12T18:30:00"
  }
];

jest.mock('axios');

describe('render bus search app', () => {

  it('should show search information and get data after clicking search button', async () => {
    axiosMock.get.mockImplementation( () =>
      Promise.resolve({
        data: {
          origin_city_id,
          destination_city_id,
          cities,
          locations,
          departures,
          complete: true
        }
      })
    );

    const {queryAllByText, queryByText, getByText, debug } = render(<Root />);

    expect(queryByText('From: New York to Montreal')).toBeInTheDocument();
    expect(queryByText('Date: 2020-08-02')).toBeInTheDocument();

    fireEvent.click(getByText(/search/i))

    await wait( () => expect(queryAllByText(/select/i)).toHaveLength(3));

    expect(queryByText('Departure Time: 13:00')).toBeInTheDocument();
    expect(queryByText('Arrival Time: 14:00')).toBeInTheDocument();

  });

  it('should show erorr messages if no buses found', async () => {
    axiosMock.get.mockRejectedValueOnce({data: {error: 'test error'}});
    const {queryByText, getByText} = render(<Root />);

    fireEvent.click(getByText(/search/i))

    await wait( () => expect(queryByText(/ups something went wrong please refresh the page/i)).toBeInTheDocument());

  });

  it('should poll data till complete is set to true', async () => {
    axiosMock.get
      .mockImplementationOnce(() => {
        return Promise.resolve({
          data: {
            origin_city_id,
            destination_city_id,
            cities,
            locations,
            departures: [],
            complete: false
          }
        })
      })
      .mockImplementationOnce(() => {
        return Promise.resolve({
          data: {
            origin_city_id,
            destination_city_id,
            cities,
            locations,
            departures: [departure[0]],
            complete: true
          }
        })
      })
      .mockImplementationOnce( () => {
        return Promise.resolve({
          data: {
            origin_city_id,
            destination_city_id,
            cities,
            locations,
            departures,
            complete: true
          }
        })
      });

    const {queryAllByText, queryByText, getByText, debug } = render(<Root />);

    fireEvent.click(getByText(/search/i))

    await wait(() => expect(axiosMock.get).toHaveBeenCalledTimes(1));

    expect(axiosMock.get).toHaveBeenCalledWith('dr5reg/f25dvk/2020-08-02')

    await wait(() => expect(axiosMock.get).toHaveBeenCalledTimes(2));

    expect(axiosMock.get).toHaveBeenLastCalledWith('dr5reg/f25dvk/2020-08-02/poll?index=1')

    await wait( () => expect(queryAllByText(/select/i)).toHaveLength(3));

    expect(queryByText('Departure Time: 13:00')).toBeInTheDocument();
    expect(queryByText('Arrival Time: 14:00')).toBeInTheDocument();

  });

});