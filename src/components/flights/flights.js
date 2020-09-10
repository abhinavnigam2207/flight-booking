/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { useState } from 'react';
import SearchFlights from '../searchFlights';
import FlightResults from '../flightResults';
import Loader from '../core/loader';
import { searchAllFlights } from '../../services/flights';

const container = css`
  display: flex;
  @media (max-width: 767px) { flex-direction: column; }
`;
const f2 = css`flex: 2;`;
const f5 = css`flex: 6;`;
const bgGrey = css`background: #d3d3d36e;`;

export default () => {
  const [data, setFlightsData] = useState({ filterData: {}, flights: null });
  const [isLoading, setIsLoading] = useState(false);

  const search = async (filterData) => {
    setIsLoading(true);
    try {
      const flights = await searchAllFlights(filterData);
      setFlightsData({ filterData, flights});
    }
    catch(err) {
      console.error(err);
    }
    setTimeout(() => {setIsLoading(false)}, 1000); // To showcase the loader
  };

  return (
    <div css={container}>
      <div css={f2}><SearchFlights searchAction={search} /></div>
      <div css={[f5, !Object.keys(data.filterData).length ? bgGrey : null]}>
        {isLoading
          ? <Loader />
          : <FlightResults flights={data.flights} searchFilter={data.filterData} />}
      </div>
    </div>
  );
}
