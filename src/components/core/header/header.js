/** @jsx jsx */
import { css, jsx } from '@emotion/core'

const headStyle = css`
  height: 40px;
  font-size: 25px;
  margin: 0px;
  padding: 5px;
  font-family: system-ui;
  border-bottom: 1px solid grey;
`;

export default () => (
  <header>
    <h1 css={headStyle}>
      Flight Search App
    </h1>
  </header>
);
