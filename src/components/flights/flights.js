/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { useState, Fragment } from 'react';
import SearchFlights from '../searchFlights';
// import FlightResults from '../flightResults';

const sectionCSS = css`
  display: inline-block;
  @media (max-width: 767px) {
    display: block;
    width: 100%;
  }
`;
const w30 = css`width: 25%;`;
const w70 = css`width: 75%;`;

export default () => {
  const [filterData, setFilterData] = useState({});

  const search = (searchData) => { setFilterData(searchData); };

  return (
    <Fragment>
      <div css={[sectionCSS, w30]}><SearchFlights searchAction={search} /></div>
      <div css={[sectionCSS, w70]}></div>
    </Fragment>
  );
}
