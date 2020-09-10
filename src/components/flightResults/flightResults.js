/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import FlightsList from './flightsList';

const noFlightsMsg = css`
  text-align: center;
  margin: 30% 20%;
  font-size: 1em;
  font-family: cursive;
`;
const container = css`
  display: flex;
  justify-content: space-evenly;
  @media (max-width: 1000px) { flex-direction: column; }
`;

export default ({ searchFilter, flights }) => {

  if (!flights)  { return (<h1 css={noFlightsMsg}> Please apply a flight filter to see flights here! </h1>); }
  
  if (flights && !(flights.to.length && flights.from.length)) { return (<h1 css={noFlightsMsg}> No flights found ! </h1>); }

  return (
    <div css={container}>
      {flights.to ? <FlightsList flights={flights.to} filter={searchFilter} /> : null}
      {(searchFilter.isTwoWay && flights.from) ? <FlightsList returnFlight flights={flights.from} filter={searchFilter} />: null}
    </div>
  )
}