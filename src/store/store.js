const store = {
  cities: [],
  complete: false,
  departures: [],
  destination_city_id: "",
  origin_city_id: "",
  is_valid_route: null,
  locations: [],
  operators: [],
  search_request_ids: [],
  ttl: 0,
  error: false,
  errorData: null,
  interval: null,
  departureCity: 'New York',
  destinationCity: 'Montréal',
  date: '2020-08-03',
  passangers: {
    adults: 1,
    children: 0,
    seniors: 0
  }
};

export default store;