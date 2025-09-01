import { css, injectGlobal ,keyframes} from "@emotion/css";

injectGlobal`
:root {
  --base-font-color: #303133;
  --na-succeed-color: #72e985;
  --na-error-color: #ce4a4e;
  --na-padding: 6px 10px;
  --na-animation-duration: 0.5s;
  --na-justify-content: center;
  --na-zindex: 100;
  --na-startingPosition:0;
  --na-destination:25px;


}
`;

function alertTheme($color:String, $bkColor:String) {
  return`background-color: ${$bkColor};
   color: #fff;
  .na-icon {
    color: ${$color};
    font-weight: 400;
  }`;
}
export const naBox = css`
  position: fixed;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  top: 0px;
  width: 100%;
  z-index: var(--na-zindex);
  display: inline-flex;
  padding-top: 18px;
`;
export const naCon = css`
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2);
  margin-bottom: 15px;
  font-size: 14px;
  display: inline-flex;
  justify-content: var(--na-justify-content);
  align-items: baseline;
  padding: var(--na-padding);
  text-align: var(--na-text-align);
  border-radius: 4px;
`;

const enterAnimation = keyframes`
  0% {
    opacity: 0.6;
    transform: translateY(-25px);
  }

  100% {
    opacity: 1;
    top:   var(--na-startingPosition);
    transform: translateY(var(--na-startingPosition)) ; 
  }
`
const outAnimation = keyframes`
  0% {
    box-shadow: 0 1px 11px 0 rgba(0, 0, 0, 0.5);
    opacity: 1;
    transform: translateY(var(--na-startingPosition));

  }

  100% {
  box-shadow: 0 1px 40px 0 rgba(0, 0, 0, 0.2);
    opacity: 0.2;
    transform: translateY(-50px);
  }
`
export const enter=css`
  animation-duration: 0.3s;
  animation-timing-function: ease;
  animation-name: ${enterAnimation};
`
export const out=css`
  animation-duration: var(--na-animation-duration);
  animation-timing-function: cubic-bezier(0.38, 0.63, 0.56, 0.92);
  animation-name: ${outAnimation};
`

export const success = css`${alertTheme('#67c23a', '#67c23a' )}`
export const error = css`${alertTheme('#fef0f0', '#f56c6c')}`
export const warning = css`${alertTheme('#fff', '#e6a23c')}`
export const info = css`${alertTheme('#909399', '#fff')} color: #333  !important;`
export default {}



