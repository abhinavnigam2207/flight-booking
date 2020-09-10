/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { useState } from 'react';
import Button from '@material-ui/core/Button';
import flightIcon from '../../../static/images/flight.png';
import moment from 'moment';

const flex1 = css`flex: 1;`;
const flightRow = css`
  display: flex;
  padding: 0 5px;
  justify-content: space-between;
  align-items: center;
  border: 1px solid lightgray;
  border-radius: 5px;
  margin: 10px;
  padding: 15px 5px;
`;
const flightImg = css`
  height: 35px;
  width: 35px;
`;
const noFlightsMsg = css`
  text-align: center;
  margin: 30% 20%;
  font-size: 1em;
  font-family: cursive;
`;
const head = css`font-weight: 600;`;
const subHead = css`color: darkgray;`;
const red = css`color: #e93535;`;
const btn = css`
  background: #e93535 !important;
  color: white !important;
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
        <div css={flightInfo}>{`${flights.length} flights found. ${moment(filter.departureDate).format('ddd, DD MMMM')}`}</div>
      </header>
      <div>
        {flights.map((flight) => (
          <div css={flightRow}>
            <div><img css={flightImg} src={flightIcon} /></div>
            <div>
              <div css={head}>{flight.name}</div>
              <div css={subHead}>{flight.flightNo}</div>
            </div>
            <div>
              <div css={head}>{flight.departureTime}</div>
              <div css={subHead}>{flight.origin.split('(')[0]}</div>
            </div>
            <div>
              <div css={head}>{flight.arrivalTime}</div>
              <div css={subHead}>{flight.destination.split('(')[0]}</div>
            </div>
            <div>
              <div css={head}>{`${flight.duration} hours`}</div>
              {flight.multiple ? (<div css={subHead}>Total Duration</div>) : (<div css={subHead}>Non Stop</div>)}
            </div>
            <div css={[head, red]}>{`Rs ${flight.price}`}</div>
            <Button css={btn} onClick={()=> {}}>Book</Button>
          </div>
        ))}
      </div>
    </div>
  );
};