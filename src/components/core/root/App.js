/** @jsx jsx */
import { jsx } from '@emotion/core'
import { Fragment } from 'react';
import Header from '../header';
import Fights from '../../flights';
import './App.css';

export default () => {
  return (
    <Fragment>
      <Header/>
      <Fights />
    </Fragment>
  );
}
