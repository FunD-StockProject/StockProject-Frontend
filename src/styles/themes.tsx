import { Theme } from '@emotion/react';

export type themeColor =
  | 'primary0'
  | 'primary5'
  | 'primary10'
  | 'primary20'
  | 'primary30'
  | 'primary40'
  | 'primary50'
  | 'primary60'
  | 'primary70'
  | 'primary80'
  | 'primary90'
  | 'primary100'
  | 'grayscale0'
  | 'grayscale5'
  | 'grayscale10'
  | 'grayscale20'
  | 'grayscale30'
  | 'grayscale40'
  | 'grayscale50'
  | 'grayscale60'
  | 'grayscale70'
  | 'grayscale80'
  | 'grayscale90'
  | 'grayscale100'
  | 'danger'
  | 'warning'
  | 'success'
  | 'information'
  | 'red'
  | 'transparent';

export type themeTextType = 'Display' | 'Heading' | 'Title' | 'Body' | 'Detail' | 'Label' | 'Links';
export type themeFontSize = {
  Display: themeFontSizeDisplay;
  Heading: themeFontSizeHeading;
  Title: themeFontSizeTitle;
  Body: themeFontSizeBody;
  Detail: themeFontSizeDetail;
  Label: themeFontSizeLabel;
  Links: themeFontSizeLinks;
};

export type themeFontSizeDisplay = 'Large' | 'Medium' | 'Small';
export type themeFontSizeHeading = 'Large' | 'Medium' | 'Small';
export type themeFontSizeTitle = 'XXLarge' | 'XLarge' | 'Large' | 'Medium' | 'Small' | 'XSmall';
export type themeFontSizeBody = 'Large' | 'Medium' | 'Small';
export type themeFontSizeDetail = 'Large' | 'Medium' | 'Small';
export type themeFontSizeLabel = 'Large' | 'Medium' | 'Small' | 'XSmall';
export type themeFontSizeLinks = 'Large' | 'Medium' | 'Small';

declare module '@emotion/react' {
  export interface Theme {
    colors: {
      [key in themeColor]: string;
    };
    fontSize: {
      [key in themeTextType]: {
        [key2 in themeFontSize[key]]: string;
      };
    };
  }
}

const theme: Theme = {
  colors: {
    /* primary */
    primary0: '#FFFFFF',
    primary5: '#E8ECFF',
    primary10: '#D3DBFF',
    primary20: '#ADBBFF',
    primary30: '#8096FF',
    primary40: '#5270FF',
    primary50: '#3457FD',
    primary60: '#2947D2',
    primary70: '#243CAE',
    primary80: '#162672',
    primary90: '#0B1339',
    primary100: '#101010',
    /* grayscale */
    grayscale0: '#FFFFFF',
    grayscale5: '#F6F6F6',
    grayscale10: '#F0F0F1',
    grayscale20: '#E8E8E9',
    grayscale30: '#DBDCDF ',
    grayscale40: '#C1C3C8',
    grayscale50: '#B2B4B9',
    grayscale60: '#93959A',
    grayscale70: '#525558',
    grayscale80: '#3E3F40',
    grayscale90: '#303033',
    grayscale100: '#1D1E1F',
    /* fucntion */
    danger: '#EB003B',
    warning: '#FFB724',
    success: '#008A1E',
    information: '#2768FF',
    /* key */
    red: '#FD4821',

    transparent: '#DD000000',
  },
  fontSize: {
    Display: {
      Large: '66px',
      Medium: '50px',
      Small: '40px',
    },
    Heading: {
      Large: '50px',
      Medium: '40px',
      Small: '32px',
    },
    Title: {
      XXLarge: '32px',
      XLarge: '25px',
      Large: '21px',
      Medium: '19px',
      Small: '17px',
      XSmall: '15px',
    },
    Body: {
      Large: '19px',
      Medium: '17px',
      Small: '15px',
    },
    Detail: {
      Large: '17px',
      Medium: '15px',
      Small: '13px',
    },
    Label: {
      Large: '19px',
      Medium: '17px',
      Small: '15px',
      XSmall: '13px',
    },
    Links: {
      Large: '19px',
      Medium: '17px',
      Small: '15px',
    },
  },
};

export default theme;
