import { validateResponse } from '../network/fetch';
import moment from 'moment';

const allFlightsMockURL = 'https://tw-frontenders.firebaseio.com/advFlightSearch.json';

const getDirectFlights = (data, origin, destination, travelDate) => {
  data.forEach(elem => {
    const start = moment(new Date(`${elem.date} ${elem.departureTime}`));
    const end = moment(new Date(`${elem.date} ${elem.arrivalTime}`));
    elem.duration = end.diff(start, 'hours', true);
  });
  return data.filter((flight) => (flight.origin === origin
    && flight.destination === destination
    && flight.date === travelDate));
};

const getFilteredFlights  = (data, filters) => {
  const dep = moment(filters.departureDate).format("YYYY/MM/DD");
  const returnDate = moment(filters.departureDate).format("YYYY/MM/DD");
  const to = getDirectFlights(data, filters.fromCity.title, filters.toCity.title, dep)
  const from = getDirectFlights(data,  filters.toCity.title, filters.fromCity.title, returnDate)
  return { to, from };
};

export const searchAllFlights = (filters) => {
  return fetch(allFlightsMockURL)
    .then(validateResponse)
    .then(response => getFilteredFlights(response.data, filters))
}

