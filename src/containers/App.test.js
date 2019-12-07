import React from 'react';
import {Provider} from 'react-redux';
import {render as rtlRender, fireEvent, wait } from '@testing-library/react';
import axiosMock from 'axios';
import App from '../containers/App';
import {storeConfig} from '../store/storeConfig';
import SearchPanel from "../components/SearchPanel";

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

afterEach( () => {
  axiosMock.request.mockReset();

});

function render(component) {
  const store = storeConfig();
  return rtlRender(
    <Provider store={store}>
      {component}
    </Provider>
  );
}

describe('render bus search app', () => {

  it('should accept data, passengers', async () => {
    axiosMock.request.mockImplementation( () =>
      Promise.resolve({
        data: {
          locations,
          departures,
          complete: true
        }
      })
    );

    const { getByLabelText, getByText, queryAllByText, queryByText } = render(<App />);

    const dateInput = getByLabelText(/date/i);
    const adults = getByLabelText(/adults/i);
    const seniors = getByLabelText(/seniors/i);
    const children = getByLabelText(/children/i);
    const searchBtn = getByText(/search/i);

    fireEvent.change(dateInput, {target: { value: '2020-08-02'}});
    fireEvent.change(adults, {target: { value: '1'}});
    fireEvent.change(seniors, {target: { value: '0'}});
    fireEvent.change(children, {target: { value: '0'}});

    fireEvent.click(searchBtn)

    await wait( () => expect(queryAllByText(/select/i)).toHaveLength(3));

    expect(queryByText('Departure Time: 13:00')).toBeInTheDocument();
    expect(queryByText('Arrival Time: 14:00')).toBeInTheDocument();

  });

  it('should show search information and get data after clicking search button', async () => {
    axiosMock.request.mockImplementation( () =>
        Promise.resolve({
          data: {
            locations,
            departures,
            complete: true
          }
        })
    );

    const {queryAllByText, queryByText, getByText} = render(<App />);

    expect(queryByText('Bus From: New York')).toBeInTheDocument();
    expect(queryByText('To: Montreal')).toBeInTheDocument();
    expect(queryByText('Date: 2020-08-02')).toBeInTheDocument();

    fireEvent.click(getByText(/search/i))

    await wait( () => expect(queryAllByText(/select/i)).toHaveLength(3));

    expect(queryByText('Departure Time: 13:00')).toBeInTheDocument();
    expect(queryByText('Arrival Time: 14:00')).toBeInTheDocument();

  });

  it('should poll data till complete is set to true', async () => {
    axiosMock.request
      .mockImplementationOnce(() => {
        return Promise.resolve({
          data: {
            locations,
            departures: [],
            complete: false
          }
        })
      })
      .mockImplementationOnce(() => {
        return Promise.resolve({
          data: {
            locations,
            departures: [departures[0]],
            complete: false
          }
        })
      })
      .mockImplementationOnce( () => {
        return Promise.resolve({
          data: {
            locations,
            departures: [departures[1], departures[2],],
            complete: true
          }
        })
      });

    const {queryAllByText, queryByText, getByText, debug } = render(<App />);

    fireEvent.click(getByText(/search/i))

    await wait(() => expect(axiosMock.request).toHaveBeenCalledTimes(1));

    expect(axiosMock.request).toHaveBeenCalledWith(expect.objectContaining({
      url: 'dr5reg/f25dvk/2020-08-02',
      params: {adults: 1, children: 0, currency: 'usd', seniors: 0}

    }));

    await wait(() => expect(axiosMock.request).toHaveBeenCalledTimes(2));

    expect(axiosMock.request).toHaveBeenCalledWith(expect.objectContaining({
      url: 'dr5reg/f25dvk/2020-08-02/poll',
      params: {adults: 1, children: 0, currency: 'usd', seniors: 0, index: 0}
    }));

    await wait(() => expect(axiosMock.request).toHaveBeenCalledTimes(3));

    expect(axiosMock.request).toHaveBeenLastCalledWith(expect.objectContaining({
      url: 'dr5reg/f25dvk/2020-08-02/poll',
      params: {adults: 1, children: 0, currency: 'usd', seniors: 0, index: 1}
    }));

    expect(queryAllByText(/select/i)).toHaveLength(3)
    await wait( () => expect(queryAllByText(/select/i)).toHaveLength(3));

    expect(queryByText('Departure Time: 13:00')).toBeInTheDocument();
    expect(queryByText('Arrival Time: 14:00')).toBeInTheDocument();

  });

  it('should show erorr messages if no buses found', async () => {
    axiosMock.request.mockRejectedValueOnce({data: {error: 'test error'}});
    const {queryByText, getByText} = render(<App />);

    fireEvent.click(getByText(/search/i))

    await wait( () => expect(queryByText(/ups something went wrong please refresh the page/i)).toBeInTheDocument());

  });

});