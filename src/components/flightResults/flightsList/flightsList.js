/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { Fragment } from 'react';

import moment from 'moment';
import FlightListItem from '../flightListItem';

const flex1 = css`flex: 1;`;
const noFlightsMsg = css`
  text-align: center;
  margin: 30% 20%;
  font-size: 1em;
  font-family: cursive;
`;
const headCSS = css`
  background: aliceblue;
  padding: 10px 15px;
`;
const flightInfo = css`
  color: grey;
  font-size: 15px;
  line-height: 20px;
  font-family: monospace;
`;

export default ({ returnFlight, filter, flights }) => {
  const from = filter && filter.fromCity && filter.fromCity.title;
  const to = filter && filter.toCity && filter.toCity.title;

  if (flights && !flights.length) { return (<h1 css={noFlightsMsg}> No flights found ! </h1>); }

  return (
    <div css={flex1}>
      <header css={headCSS}>
        {returnFlight ? (<strong>{`${to} to ${from}`}</strong> ): <strong>{`${from} to ${to}`}</strong>}
        <div css={flightInfo}>{`${flights.length} flights found. ${moment(returnFlight ? filter.returnDate: filter.departureDate).format('ddd, DD MMMM')}`}</div>
      </header>
      <div>
        {flights.map((flight) => (
          <Fragment>
            <FlightListItem flight={flight}/>
            {/* {flight.multiple
              ?  (<FlightListItem flight={flight.multiple}/>)
              : (<FlightListItem flight={flight}/>)} */}
          </Fragment>
        ))}
      </div>
    </div>
  );
};