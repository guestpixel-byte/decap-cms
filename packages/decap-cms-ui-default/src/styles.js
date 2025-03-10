import React from 'react';
import { css, Global } from '@emotion/react';

/**
 * Font Stacks
 */
const fonts = {
  primary: `
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    Roboto,
    Helvetica,
    Arial,
    sans-serif,
    "Apple Color Emoji",
    "Segoe UI Emoji",
    "Segoe UI Symbol"
  `,
  mono: `
    'SFMono-Regular',
    Consolas,
    "Liberation Mono",
    Menlo,
    Courier,
    monospace;
  `,
};

/**
 * Theme Colors
 */
const colorsRaw = {
  white: '#fff',
  black: '#000',
  grayLight: '#eff0f4',
  gray: '#798291',
  grayDark: '#313d3e',
  blue: '#3a69c7',
  blueLight: '#e8f5fe',
  green: '#005614',
  greenLight: '#caef6f',
  brown: '#754e00',
  yellow: '#ffee9c',
  red: '#ff003b',
  redDark: '#D60032',
  redLight: '#fcefea',
  purple: '#70399f',
  purpleLight: '#f6d8ff',
  teal: '#17a2b8',
  tealDark: '#117888',
  tealLight: '#ddf5f9',
  // Dark Mode
  blueDark: '#060b10',
  blueLightDark: '#12181f',
  greyBlue: '#1e242c',
  blueMain: '#32e6e2'
};

const colors = {
  statusDraftText: colorsRaw.purple,
  statusDraftBackground: colorsRaw.purpleLight,
  statusReviewText: colorsRaw.brown,
  statusReviewBackground: colorsRaw.yellow,
  statusReadyText: colorsRaw.green,
  statusReadyBackground: colorsRaw.greenLight,
  text: colorsRaw.white,
  textLight: colorsRaw.white,
  textLead: colorsRaw.white,
  background: colorsRaw.blueDark,
  foreground: colorsRaw.blueLightDark,
  active: colorsRaw.blueMain,
  activeBackground: colorsRaw.greyBlue,
  inactive: colorsRaw.gray,
  button: colorsRaw.blueMain,
  buttonText: colorsRaw.black,
  inputBackground: '#1e242c',
  infoText: colorsRaw.blue,
  infoBackground: colorsRaw.blueLight,
  successText: colorsRaw.green,
  successBackground: colorsRaw.greenLight,
  warnText: colorsRaw.brown,
  warnBackground: colorsRaw.yellow,
  errorText: colorsRaw.red,
  errorBackground: colorsRaw.redLight,
  textFieldBorder: '#12181f',
  controlLabel: '#fff',
  checkerboardLight: '#f2f2f2',
  checkerboardDark: '#e6e6e6',
  mediaDraftText: colorsRaw.purple,
  mediaDraftBackground: colorsRaw.purpleLight,
};

const lengths = {
  topBarHeight: '56px',
  inputPadding: '16px 20px',
  borderRadius: '5px',
  richTextEditorMinHeight: '300px',
  borderWidth: '2px',
  topCardWidth: '682px',
  pageMargin: '28px 18px',
  objectWidgetTopBarContainerPadding: '0 14px 14px',
};

const borders = {
  textField: `solid  ${lengths.borderWidth} ${colors.textFieldBorder}`,
};

const transitions = {
  main: '.2s ease',
};

const shadows = {
  drop: `
    box-shadow: 0 2px 4px 0 rgba(19, 39, 48, 0.12);
  `,
  dropMain: `
    box-shadow: 0 2px 6px 0 rgba(68, 74, 87, 0.05), 0 1px 3px 0 rgba(68, 74, 87, 0.1);
  `,
  dropMiddle: `
    box-shadow: 0 2px 6px 0 rgba(68, 74, 87, 0.15), 0 1px 3px 0 rgba(68, 74, 87, 0.3);
  `,
  dropDeep: `
    box-shadow: 0 4px 12px 0 rgba(68, 74, 87, 0.15), 0 1px 3px 0 rgba(68, 74, 87, 0.25);
  `,
  inset: `
    box-shadow: inset 0 0 4px rgba(68, 74, 87, 0.3);
  `,
};

const text = {
  fieldLabel: css`
    font-size: 12px;
    text-transform: uppercase;
    font-weight: 600;
    color: ${colors.controlLabel};
  `,
};

const gradients = {
  checkerboard: `
    linear-gradient(
      45deg,
      ${colors.checkerboardDark} 25%,
      transparent 25%,
      transparent 75%,
      ${colors.checkerboardDark} 75%,
      ${colors.checkerboardDark}
    )
  `,
};

const effects = {
  checkerboard: css`
    background-color: ${colors.checkerboardLight};
    background-size: 16px 16px;
    background-position: 0 0, 8px 8px;
    background-image: ${gradients.checkerboard}, ${gradients.checkerboard};
  `,
};

const badge = css`
  font-size: 13px;
  line-height: 1;
`;

const backgroundBadge = css`
  ${badge};
  display: block;
  border-radius: ${lengths.borderRadius};
  padding: 4px 10px;
  text-align: center;
`;

const textBadge = css`
  ${badge};
  display: inline-block;
  font-weight: 700;
  text-transform: uppercase;
`;

const card = css`
  ${shadows.dropMain};
  border-radius: 5px;
  background-color: #fff;
`;

const buttons = {
  button: css`
    border: 0;
    border-radius: ${lengths.borderRadius};
    cursor: pointer;
  `,
  default: css`
    height: 36px;
    line-height: 36px;
    font-weight: 500;
    padding: 0 15px;
    background-color: ${colorsRaw.gray};
    color: ${colorsRaw.white};
  `,
  widget: css`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2px 12px;
    font-size: 12px;
    font-weight: bold;
    border-radius: 3px;
  `,
  medium: css`
    height: 27px;
    line-height: 27px;
    font-size: 12px;
    font-weight: 600;
    border-radius: 3px;
    padding: 0 24px 0 14px;
  `,
  small: css`
    font-size: 13px;
    height: 23px;
    line-height: 23px;
  `,
  gray: css`
    background-color: ${colors.button};
    color: ${colors.buttonText};

    &:focus,
    &:hover {
      color: ${colorsRaw.white};
      background-color: #1e242c;
    }
  `,
  grayText: css`
    background-color: transparent;
    color: ${colorsRaw.gray};
  `,
  green: css`
    background-color: #aae31f;
    color: ${colorsRaw.green};
  `,
  lightRed: css`
    background-color: ${colorsRaw.redLight};
    color: ${colorsRaw.redDark};
  `,
  lightBlue: css`
    background-color: ${colorsRaw.blueLight};
    color: ${colorsRaw.blue};
  `,
  lightTeal: css`
    background-color: ${colorsRaw.tealLight};
    color: #1195aa;
  `,
  teal: css`
    background-color: ${colorsRaw.teal};
    color: ${colorsRaw.white};
  `,
  disabled: css`
    background-color: ${colorsRaw.grayLight};
    color: ${colorsRaw.gray};
    cursor: default;
  `,
};

const caret = css`
  color: ${colorsRaw.white};
  width: 0;
  height: 0;
  border: 5px solid transparent;
  border-radius: 2px;
`;

const components = {
  card,
  caretDown: css`
    ${caret};
    border-top: 6px solid currentColor;
    border-bottom: 0;
  `,
  caretRight: css`
    ${caret};
    border-left: 6px solid currentColor;
    border-right: 0;
  `,
  badge: css`
    ${backgroundBadge};
    color: ${colors.infoText};
    background-color: ${colors.infoBackground};
  `,
  badgeSuccess: css`
    ${backgroundBadge};
    color: ${colors.successText};
    background-color: ${colors.successBackground};
  `,
  badgeDanger: css`
    ${backgroundBadge};
    color: ${colorsRaw.red};
    background-color: #fbe0d7;
  `,
  textBadge: css`
    ${textBadge};
    color: ${colors.infoText};
  `,
  textBadgeSuccess: css`
    ${textBadge};
    color: ${colors.successText};
  `,
  textBadgeDanger: css`
    ${textBadge};
    color: ${colorsRaw.red};
  `,
  loaderSize: css`
    width: 2.2857rem;
    height: 2.2857rem;
  `,
  cardTop: css`
    ${card};
    
    max-width: 100%;
    padding: 18px 20px;
    margin-bottom: 28px;
  `,
  cardTopHeading: css`
    font-size: 1.5rem;
    font-weight: 600;
    line-height: 1.7rem;
    margin: 0;
    padding: 0;
    color: #fff;
  `,
  cardTopDescription: css`
    max-width: 480px;
    color: ${colors.text};
    font-size: 14px;
    margin-top: 8px;
  `,
  objectWidgetTopBarContainer: css`
    padding: ${lengths.objectWidgetTopBarContainerPadding};
  `,
  dropdownList: css`
    ${shadows.dropDeep};
    background-color: #12181f;
    border-radius: ${lengths.borderRadius};
    overflow: hidden;
  `,
  dropdownItem: css`
    ${buttons.button};
    background-color: transparent;
    border-radius: 0;
    color: #fff;
    font-weight: 500;
    border-bottom: 1px solid #eaebf1;
    padding: 8px 14px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-width: max-content;

    &:last-of-type {
      border-bottom: 0;
    }

    &.active,
    &:hover,
    &:active,
    &:focus {
      color: ${colors.active};
      background-color: ${colors.activeBackground};
    }
  `,
  viewControlsText: css`
    font-size: 14px;
    color: ${colors.text};
    margin-right: 12px;
    white-space: nowrap;
  `,
};


const reactSelectStyles = {
  control: styles => ({
    ...styles,
    border: 0,
    boxShadow: 'none',
    padding: '9px 0 9px 12px',
    backgroundColor: '#1e242c', // Ensure control background isn't white
  }),
  option: (styles, state) => ({
    ...styles,
    backgroundColor: state.isSelected
      ? '#1e242c' // Highlight selected option
      : state.isFocused
      ? '#1e242c' // Highlight focused option
      : 'transparent', // Default background
    paddingLeft: '22px',
  }),
  menu: styles => ({
    ...styles,
    backgroundColor: '#12181f', // Dropdown menu background
    right: 0,
    zIndex: 300,
  }),
  container: styles => ({ ...styles, padding: '0 !important' }),
  multiValue: styles => ({
    ...styles,
    backgroundColor: 'lightgray', // Background for multi-value chips
  }),
  multiValueLabel: styles => ({
    ...styles,
    color: 'black',
    fontWeight: 500,
  }),
  singleValue: (styles) => ({
    ...styles,
    color: colors.text, // Use a dynamic color from your colors object
  }),
  input: (styles) => ({
    ...styles,
    color: colors.text, // Set to white or use a dynamic theme color
  }),
};


const zIndex = {
  zIndex0: 0,
  zIndex1: 1,
  zIndex2: 2,
  zIndex10: 10,
  zIndex100: 100,
  zIndex200: 200,
  zIndex299: 299,
  zIndex300: 300,
  zIndex1000: 1000,
  zIndex10000: 10000,
  zIndex99999: 99999,
};

function GlobalStyles() {
  return (
    <Global
      styles={css`
        *,
        *:before,
        *:after {
          box-sizing: border-box;
        }

        :focus {
          outline: -webkit-focus-ring-color auto ${lengths.borderRadius};
        }

        /**
       * Don't show outlines if the user is utilizing mouse rather than keyboard.
       */
        [data-whatintent='mouse'] *:focus {
          outline: none;
        }

        input {
          border: 0;
        }

        body {
          font-family: ${fonts.primary};
          font-weight: normal;
          background-color: ${colors.background};
          color: ${colors.text};
          margin: 0;
        }

        ul,
        ol {
          padding-left: 0;
        }

        h1,
        h2,
        h3,
        h4,
        h5,
        h6,
        p {
          font-family: ${fonts.primary};
          color: ${colors.textLead};
          font-size: 15px;
          line-height: 1.5;
          margin-top: 0;
        }

        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
          font-weight: 500;
        }

        h1 {
          font-size: 24px;
          letter-spacing: 0.4px;
          color: ${colors.textLead};
        }

        a,
        button {
          font-size: 14px;
          font-weight: 500;
        }

        a {
          color: ${colors.text};
          text-decoration: none;
        }

        button {
          font-family: inherit;
          color: #000;
        }

        img {
          max-width: 100%;
        }

        textarea {
          resize: none;
        }

        /* Scroll Bar Settings */
        ::-webkit-scrollbar {
            width: 8px; /* Set the width of the scrollbar */
            height: 8px; /* Set the height for horizontal scrollbars */
        }
          
        ::-webkit-scrollbar-track {
            background: black; /* Track color */
            border-radius: 10px;
        }
          
        ::-webkit-scrollbar-thumb {
            background-color: #888; /* Thumb color */
            border-radius: 10px;
            border: 2px solid transparent;
            background-clip: padding-box;
        }
          
        ::-webkit-scrollbar-thumb:hover {
            background-color: #555; /* Thumb color on hover */
        }
          
          /* For Firefox */
        * {
            scrollbar-width: thin; /* Make scrollbar thin */
            scrollbar-color: #888 black; /* Thumb and track colors */
        }
        
      `}
    />
  );
}

export {
  fonts,
  colorsRaw,
  colors,
  lengths,
  components,
  buttons,
  text,
  shadows,
  borders,
  transitions,
  effects,
  zIndex,
  reactSelectStyles,
  GlobalStyles,
};
