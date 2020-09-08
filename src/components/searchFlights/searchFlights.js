/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DateFnsUtils from '@date-io/date-fns';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { cities } from './constants';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';

const container = css`
  padding: 15px 5px;
  border-right: 1px solid lightgray;
`;
const left = css`border-right: 0px; border-radius: 5px 0px 0px 0px !important;`;
const right = css`border-left: 0px; border-radius: 0px 5px 0px 0px !important;`;
const btn = css`
  width: 35%;
  border: 1px solid lightgray !important;
  :disabled{
    background: #2196F3;
    color: white !important;
  }
`;
const formBox = css`
  border: 1px solid lightgray;
  border-radius: 5px;
  padding: 5px;
`;
const formControlStyle = css`margin: 10px 0px;`;

export default ({searchAction}) => {
  const [isTwoWay, setIsTwoWay] = useState(true);
  const [fromCity, setFromCity] = useState(null);
  const [toCity, setToCity] = useState(null);
  const [departureDate, setDepartureDate] = useState(new Date());
  const [returnDate, setReturnDate] = useState(null);
  const [passengers, setPassengers] = useState(1);

  const search = () => {
    searchAction({
      departureDate, returnDate, passengers, fromCity, toCity
    });
  };

  return (
    <div css={container}>
      <Button css={[btn, left]} disabled={!isTwoWay} onClick={()=> {setIsTwoWay(false);}}>One Way</Button>
      <Button css={[btn, right]} disabled={isTwoWay} onClick={()=> {setIsTwoWay(true);}}>Return</Button>
      <div css={formBox}>
        <div css={formControlStyle}>
          <Autocomplete
            id="combo-box-demo"
            options={cities}
            autoComplete={false}
            openOnFocus={false}
            value={fromCity}
            onChange={(event, newValue) => {
              setFromCity(newValue);
            }}
            getOptionLabel={(option) => option.title}
            renderInput={(params) => <TextField onMouseDownCapture={(e) => e.stopPropagation()} {...params} label="Enter Origin City" />}
          />
        </div>
        <div css={formControlStyle}>
          <Autocomplete
            id="combo-box-demo"
            options={cities}
            autoComplete={false}
            openOnFocus={false}
            value={toCity}
            onChange={(event, newValue) => {
              setToCity(newValue);
            }}
            getOptionLabel={(option) => option.title}
            renderInput={(params) => <TextField onMouseDownCapture={(e) => e.stopPropagation()} {...params} label="Enter Destination City" />}
          />
        </div>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <div css={formControlStyle}>
            <DatePicker
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy"
              id="departure-date-picker"
              label="Departure Date"
              value={departureDate}
              style={{width: '100%'}}
              disablePast
              autoOk
              onChange={(date) => { setDepartureDate(date);}}
              KeyboardButtonProps={{ 'aria-label': 'change Departure Date' }}
            />
          </div>
          {isTwoWay && <div css={formControlStyle}>
            <DatePicker
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy"
              id="return-date-picker"
              label="Return Date"
              value={returnDate}
              style={{width: '100%'}}
              disablePast
              autoOk
              onChange={(date) => { setReturnDate(date);}}
              KeyboardButtonProps={{ 'aria-label': 'change Return Date' }}
            />
          </div>}
        </MuiPickersUtilsProvider>
        <div css={formControlStyle}>
          <TextField
              id="passengers-input"
              label="Passengers"
              type="number"
              value={passengers}
              onChange={(e) => {setPassengers(e.target.value)}}
              style={{width: '100%'}}
              InputProps={{ inputProps: { min: 0, max: 10 } }}
              InputLabelProps={{ shrink: true }}
            />
        </div>
        <div css={formControlStyle}>
          <Button variant="contained" color="primary" onClick={search}>Search</Button>
        </div>
      </div>
    </div>
  );
}
