/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { Fragment, useState } from 'react';
import Button from '@material-ui/core/Button';
import flightIcon from '../../../static/images/flight.png';
import multipleImg from '../../../static/images/multiple.png';

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
const multipleCSS = css`
  background: lightgray;
  margin: 0px 10px;
  border-radius: 0px;
`;
const mb0 = css`margin-bottom: 0px !important;`;
const flightImg = css`
  height: 35px;
  width: 35px;
`;
const head = css`
  font-weight: 600;
  font-size: 14px;
`;
const subHead = css`
  color: darkgray;
  font-size: 12px;
`;
const red = css`color: #e93535;`;
const green = css`color: #3ed23e;`;
const anchor = css`
  color: blueviolet;
  cursor: pointer;
`;
const btn = css`
  background: #e93535 !important;
  color: white !important;
`;

const FlightRow = ({ flight, showDetails, setShowDetails, multiple}) => (
  <div css={[flightRow, multiple ? multipleCSS : null, flight.multiple ? mb0 : null]}>
    <div><img css={flightImg} alt="flight icon" src={flight.multiple ? multipleImg : flightIcon} /></div>
    <div>
      <div css={head}>{flight.name}</div>
      {flight.multiple
        ? <div onClick={()=> {setShowDetails(!showDetails)}} css={anchor}>{showDetails ? `Hide Details`: `Show Details`}</div>
        : <div css={subHead}>{flight.flightNo}</div>}
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
      <div css={[head,flight.multiple ? green: null ]}>{`${flight.duration} hours`}</div>
      {flight.multiple ? (<div css={subHead}>Total Duration</div>) : (<div css={subHead}>Non Stop</div>)}
    </div>
    <div css={[head, red]}>{`Rs ${flight.price}`}</div>
    <Button css={btn} onClick={()=> {}}>Book</Button>
  </div>
);

export default ({ flight }) => {
  const [showDetails, setShowDetails] = useState(false);
  const dynFlight  = flight.multiple || flight;

  return (
    <Fragment>
      <FlightRow flight={dynFlight} showDetails={showDetails} setShowDetails={setShowDetails} />
      {showDetails
        ? (
          <Fragment>
            <FlightRow multiple flight={flight.f1} showDetails={showDetails} setShowDetails={setShowDetails} />
            <FlightRow multiple flight={flight.f2} showDetails={showDetails} setShowDetails={setShowDetails} />
          </Fragment>
        )
        : null}
    </Fragment>
  );
};