/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import loadingImg from '../../../static/images/loader.gif'

const loaderCSS = css`width:100%;`;

export default () => (<img css={loaderCSS} src={loadingImg} alt="loading" />);
