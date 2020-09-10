import { validateResponse } from '../network/fetch';
import moment from 'moment';
import _ from 'lodash';

const allFlightsMockURL = 'https://tw-frontenders.firebaseio.com/advFlightSearch.json';

const getRequiredFlights = (data, origin, destination, travelDate) => {
  let sourceProspects = [];
  let destinationProspects = [];

  data.forEach(elem => {
    const start = moment(new Date(`${elem.date} ${elem.departureTime}`));
    const end = moment(new Date(`${elem.date} ${elem.arrivalTime}`));
    elem.duration = Math.round(end.diff(start, 'hours', true) * 100) / 100;
    elem.date === travelDate && elem.origin === origin && elem.destination !== destination &&  sourceProspects.push(elem);
    elem.date === travelDate && elem.origin !== origin && elem.destination === destination && destinationProspects.push(elem);
  });

  const s1 = _.intersectionWith(sourceProspects, destinationProspects, (a, b) => (a.destination === b.origin))
  const s2 = _.intersectionWith(destinationProspects, sourceProspects, (a, b) => (b.destination === a.origin))
  const res = s1.map((f1) => {
    return s2.map((f2) => {
      const start = moment(new Date(`${f1.date} ${f1.arrivalTime}`));
      const end = moment(new Date(`${f2.date} ${f2.departureTime}`));
      const layover = end.diff(start, 'minutes', true);
      if (f1.destination === f2.origin && layover >=30) {
        return {f1, f2, multiple: {
          arrivalTime: f2.arrivalTime,
          date: f1.date,
          departureTime: f1.departureTime,
          destination: f2.destination,
          flightNo: null,
          duration: f1.duration + f2.duration,
          name: "Multiple",
          multiple: true,
          origin: f1.origin,
          price: f1.price + f2.price
        }};
      }
    }); 
  });

  const multiple = _.flatten(res).filter(x => x);

  const directFlights = data.filter((flight) => (flight.origin === origin
    && flight.destination === destination
    && flight.date === travelDate));
  return [...directFlights, ...multiple];
};

const getFilteredFlights  = (data, { departureDate, fromCity, toCity }) => {
  const dep = moment(departureDate).format("YYYY/MM/DD");
  const returnDate = moment(departureDate).format("YYYY/MM/DD");
  return {
    to: getRequiredFlights(data, fromCity.title, toCity.title, dep),
    from: getRequiredFlights(data,  toCity.title, fromCity.title, returnDate)
  };
};

export const searchAllFlights = (filters) => {
  return fetch(allFlightsMockURL)
    .then(validateResponse)
    .then(response => getFilteredFlights(response.data, filters))
}

