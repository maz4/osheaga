import React from 'react';
import {render, fireEvent, waitForElement, wait} from '@testing-library/react';
// import axios from 'axios';

import App from './App';

jest.mock('axios', () => {
  return {
    get: jest.fn(() => {
      return {
        "origin_city_id": "375dd5879001acbd84a4683dedf9eed1",
        "destination_city_id": "375dd5879001acbd84a4683ded9c875b",
        "cities": [
          {
            "id": "375dd5879001acbd84a4683deda84183",
            "locale": "en",
            "region_id": 6417,
            "name": "New York",
            "geohash": "dr5reg",
            "timezone": "America/New_York",
            "image_url": "/images/promos/city-blocks/new-york.jpg",
            "full_name": "New York, New York, United States",
          }
        ],
        "locations": [
          {
            "id": 3970,
            "city_id": "375dd5879001acbd84a4683dedfb933e",
            "name": "Métro Bonaventure Bus Station",
            "address": [
              "997 Rue St-Antoine Ouest",
              "Montreal, QC H3C 1A6"
            ],
            "type": "transit_station",
            "geohash": "f25dvfzcz"
          }
      
        ],
        "operators": [
          {
            "id": "bfc27cd544ca49c18d000f2bc00c58c0",
            "source_id": 155,
            "profile_id": 111,
            "name": "Greyhound",
            "url": null,
            "logo_url": "https://busbud-pubweb-assets-staging.global.ssl.fastly.net/images-service/operator-logos/greyhound.png?hash=1{&height,width}",
            "display_name": "Greyhound",
            "sellable": true,
            "amenities": {
              "classes": {
                "Normal": {
                  "display_name": "Economy",
                  "wifi": true,
                  "toilet": true,
                  "ac": true,
                  "food": false,
                  "refreshment": false,
                  "power_outlets": true,
                  "tv": false,
                  "bus_attendant": false,
                  "leg_room": false
                },
                "Economy": {
                  "display_name": "Economy",
                  "wifi": true,
                  "toilet": true,
                  "ac": true,
                  "food": false,
                  "refreshment": false,
                  "power_outlets": true,
                  "tv": false,
                  "bus_attendant": false,
                  "leg_room": false
                }
              }
            },
            "source": "greyhound_us",
            "referral_deal": false,
            "display_url": null,
            "fraud_check": "iovation",
            "terms": {
              "refund": false,
              "exchange": true,
              "bag_allowed": true,
              "piece_of_id": false,
              "boarding_requirement": "printed_tkt",
              "extra_bag_policy": true,
              "use_new_ticket": false,
              "exchange_cutoff": 24,
              "nb_checked_bags": 1,
              "kg_by_bag": 25,
              "nb_carry_on": 1,
              "extra_bag_cost": 1500
            }
          }
        ],
        "departures": [
          {
            "id": "7c5dd26a",
            "source_id": 155,
            "checkout_type": "new",
            "operator_id": "bfc27cd544ca49c18d000f2bc00c58c0",
            "origin_location_id": 1942,
            "destination_location_id": 1938,
            "class": "Economy",
            "class_name": "Economy",
            "amenities": {
              "display_name": "Economy",
              "wifi": true,
              "toilet": true,
              "ac": true,
              "food": false,
              "refreshment": false,
              "power_outlets": true,
              "tv": false,
              "bus_attendant": false,
              "leg_room": false
            },
            "available_seats": 55,
            "prices": {
              "total": 5200,
              "breakdown": {
                "base": 5200
              },
              "categories": {},
              "discounted": false
            },
            "ticket_types": [
              "print"
            ],
            "departure_timezone": "America/New_York",
            "arrival_timezone": "America/Montreal",
            "departure_time": "2016-01-14T00:01:00",
            "arrival_time": "2016-01-14T07:55:00"
          }
        ],
        "complete": false,    // <!-- determines if all departures have been received from all relevant bus companies
        "ttl": 900,
        "is_valid_route": true
      }
    })
  };
});

describe('render bus search app', () => {
  const {queryByText, getByText, queryByLabelText, getByLabelText} = render(<App />);

  it('should do the search form populated fileds and render the results', async () => {

    // expect(queryByLabelText(/departure/i)).toBe('New York');
    // expect(queryByLabelText(/destination/i)).toBe('Montréal');
    expect(queryByLabelText(/departure/i)).toBeInTheDocument();
    expect(queryByLabelText(/destination/i)).toBeInTheDocument();
    expect(queryByLabelText(/date/i)).toBeInTheDocument();
    expect(queryByLabelText(/return/i)).toBeInTheDocument();

    fireEvent.change(getByLabelText(/departure/i), {target: {value: 'New York'}});
    expect(queryByLabelText(/departure/i).value).toBe('New York');

    fireEvent.change(getByLabelText(/destination/i), {target: {value: 'Montréal'}});
    expect(queryByLabelText(/destination/i).value).toBe('Montréal');

    fireEvent.click(/search/i)

    await waitForElement(getByText('Search Result'));

    expect(queryByText(/select/i)).toHaveLength(1);

  });

  it('should show erorr messages if no buses found', async() => {
    await wait();
    expect(queryByText(/sorry no buses/i)).toBeInTheDocument();
  });

});