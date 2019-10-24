import React from 'react';
import {render, fireEvent, wait, waitForElement} from '@testing-library/react';
import axiosMock from 'axios';
import Root from './Root';


afterEach( () => {
  axiosMock.get.mockClear();
})

const config = {
  method: 'GET',
  headers: {
    'Accept' : 'application/test; version=0; profile=https://test.com/',
    'X-Busbud-Token' : 'test'
  }
}

jest.mock('axios', () => {
return {
    get: jest.fn(() => Promise.resolve({
      data: {
        origin_city_id: "375dd587-9001-acbd-84a4-683deda84183",
        destination_city_id: "375dd587-9001-acbd-84a4-683dedfb933e",
        cities: [
          {
            id: "375dd587-9001-acbd-84a4-683deda84183",
            region_id: 6417,
            name: "New York",
            lat: 40.71427,
            lon: -74.00597,
            geohash: "dr5reg",
            timezone: "America/New_York",
            image_url:
              "https://busbud.imgix.net/city-hires/1474307214322-NewYork,NewYork,UnitedStates.jpg?h={height}&w={width}&auto=format,compress",
            hero_image_url:
              "https://busbud.imgix.net/city-heroes/newyork.jpg?h={height}&w={width}&auto=format",
            legacy_url_form: "NewYork,NewYork,UnitedStates",
            country_code2: "US",
            full_name: "New York, New York, United States",
            short_name: "New York, NY, USA",
            locale: "en",
            region: {
              id: 6417,
              region_code: "NY",
              country_code2: "US",
              name: "New York",
              short_name: "NY",
              locale: "en",
              country: {
                code2: "US",
                code3: "USA",
                name: "United States",
                short_name: "USA",
                continent: "NA",
                default_locale: "en",
                default_currency: "USD",
                population: 310232863,
                locale: "en"
              }
            }
          },
          {
            id: "375dd587-9001-acbd-84a4-683dedfb933e",
            region_id: 3361,
            name: "Montreal",
            lat: 45.50884,
            lon: -73.58781,
            geohash: "f25dvk",
            timezone: "America/Montreal",
            image_url:
              "https://busbud.imgix.net/city-hires/1474307214311-Montreal,Quebec,Canada.jpg?h={height}&w={width}&auto=format,compress",
            hero_image_url:
              "https://busbud.imgix.net/city-heroes/montreal.jpg?h={height}&w={width}&auto=format",
            legacy_url_form: "Montreal,Quebec,Canada",
            country_code2: "CA",
            full_name: "Montreal, Quebec, Canada",
            short_name: "Montreal, QC, Canada",
            locale: "en",
            region: {
              id: 3361,
              region_code: "QC",
              country_code2: "CA",
              name: "Quebec",
              short_name: "QC",
              locale: "en",
              country: {
                code2: "CA",
                code3: "CAN",
                name: "Canada",
                short_name: "Canada",
                continent: "NA",
                default_locale: "en",
                default_currency: "CAD",
                population: 33679000,
                locale: "en"
              }
            }
          }
        ],
        locations: [
          {
            id: 1111,
            city_id: "375dd587-9001-acbd-84a4-683deda84183",
            name: "New York City",
            address: [],
            type: "other",
            lat: null,
            lon: null,
            geohash: null
          },
          {
            id: 2222,
            city_id: "375dd587-9001-acbd-84a4-683deda84183",
            name: "31st St & 8th Ave",
            address: [
              "349 W 31st St (between 8th & 9th Avenue)",
              "New York, NY 10001"
            ],
            type: "bus_stop",
            lat: 40.750996,
            lon: -73.996178,
            geohash: "dr5ru4mxu"
          },
          {
            id: 3333,
            city_id: "375dd587-9001-acbd-84a4-683deda84183",
            name: "34th St & 6th Ave",
            address: ["22 W 34th St", "New York", "NY 10001 USA"],
            type: "bus_stop",
            lat: 40.749046,
            lon: -73.986303,
            geohash: "dr5ru6hu6"
          }, //
          
        ],
        operators: [],
        departures: [
          {
            id: "LongNumberAndLEttersID1",
            origin_location_id: 1111,
            prices: {
              total: 111
            },
            departure_time: "2020-08-02T13:00:00",
            arrival_time: "2020-08-02T14:00:00"
          },
          {
            id: "LongNumberAndLEttersID2",
            origin_location_id: 2222,
            prices: {
              total: 2222
            },
            departure_time: "2020-08-02T15:00:00",
            arrival_time: "2020-08-02T16:00:00"
          },
          {
            id: "LongNumberAndLEttersID3",
            origin_location_id: 3333,
            prices: {
              total: 3333
            },
            departure_time: "2020-11-12T17:30:00",
            arrival_time: "2020-11-12T18:30:00"
          }
        ],
        search_request_ids: [
          "201910090612f9a80f7a18376008801d7ff5c7a11328c06b349cbc700e303249dedc918c60cf"
        ],
        complete: false,
        ttl: 600,
        is_valid_route: true
      }
       }))
  };
});

describe('render bus search app', () => {
  const {getByText, queryByText, queryAllByText, queryByLabelText, getByLabelText, debug} = render(<Root />);

  it('should do the search for sudo populated fileds and render the results', async () => {

    expect(queryByLabelText(/departure/i)).toBeInTheDocument();
    expect(queryByLabelText(/destination/i)).toBeInTheDocument();
    expect(queryByLabelText(/date/i)).toBeInTheDocument();
    expect(queryByLabelText(/return/i)).toBeInTheDocument();

    fireEvent.change(getByLabelText(/departure/i), {target: {value: 'New York'}});
    expect(queryByLabelText(/departure/i).value).toBe('New York');

    fireEvent.change(getByLabelText(/destination/i), {target: {value: 'Montréal'}});
    expect(queryByLabelText(/destination/i).value).toBe('Montréal');

    await wait( () => expect(queryAllByText(/select/i)).toHaveLength(3));

  });

  it.skip('should show erorr messages if no buses found', async () => {
    axiosMock.get.mockRejectedValueOnce({data: {error: 'test error'}});
    await wait();
    expect(queryByText(/sorry no buses/i)).toBeInTheDocument();
  });

});