/**
 * @namespace asdasd
 */
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
  | 'blue'
  | 'yellow'
  | 'cyan'
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

const colors = {
  /* primary */
  /** #FFFFFF */ primary0: '#FFFFFF',
  /** #E8ECFF */ primary5: '#E8ECFF',
  /** #D3DBFF */ primary10: '#D3DBFF',
  /** #ADBBFF */ primary20: '#ADBBFF',
  /** #8096FF */ primary30: '#8096FF',
  /** #5270FF */ primary40: '#5270FF',
  /** #3457FD */ primary50: '#3457FD',
  /** #2947D2 */ primary60: '#2947D2',
  /** #243CAE */ primary70: '#243CAE',
  /** #162672 */ primary80: '#162672',
  /** #0B1339 */ primary90: '#0B1339',
  /** #101010 */ primary100: '#101010',
  /* grayscale */
  /** #FFFFFF */ grayscale0: '#FFFFFF',
  /** #F6F6F6 */ grayscale5: '#F6F6F6',
  /** #F0F0F1 */ grayscale10: '#F0F0F1',
  /** #E8E8E9 */ grayscale20: '#E8E8E9',
  /** #DBDCDF */ grayscale30: '#DBDCDF ',
  /** #C1C3C8 */ grayscale40: '#C1C3C8',
  /** #B2B4B9 */ grayscale50: '#B2B4B9',
  /** #93959A */ grayscale60: '#93959A',
  /** #525558 */ grayscale70: '#525558',
  /** #3E3F40 */ grayscale80: '#3E3F40',
  /** #303033 */ grayscale90: '#303033',
  /** #1D1E1F */ grayscale100: '#1D1E1F',
  /* fucntion */
  /** #EB003B */ danger: '#EB003B',
  /** #FFB724 */ warning: '#FFB724',
  /** #008A1E */ success: '#008A1E',
  /** #2768FF */ information: '#2768FF',
  /* key */
  /** #FD4821 */ red: '#FD4821',
  /** #2D92FF */ blue: '#2D92FF',
  /** #FFEA64 */ yellow: '#FFEA64',
  /** #64FFEA */ cyan: '#64FFEA',

  /** #DD000000 */ transparent: '#DD000000',
};

const Display = {
  /** @param Web 66px @param Mobile 40px */
  Large: {
    /** 66px */ Web: '66px',
    /** 40px */ Mobile: '40px',
  },
  /** @param Web 50px @param Mobile 32px */
  Medium: {
    /** 50px */ Web: '50px',
    /** 32px */ Mobile: '32px',
  },
  /** @param Web 40px @param Mobile 25px */
  Small: {
    /** 40px */ Web: '40px',
    /** 25px */ Mobile: '25px',
  },
};

const Heading = {
  /** @param Web 50px @param Mobile 40px */
  Large: {
    /** 50px */ Web: '50px',
    /** 40px */ Mobile: '40px',
  },
  /** @param Web 40px @param Mobile 32px */
  Medium: {
    /** 40px */ Web: '40px',
    /** 32px */ Mobile: '32px',
  },
  /** @param Web 32px @param Mobile 25px */
  Small: {
    /** 32px */ Web: '32px',
    /** 25px */ Mobile: '25px',
  },
};

const Title = {
  /** @param Web 32px @param Mobile 25px */
  XXLarge: {
    /** 32px */ Web: '32px',
    /** 25px */ Mobile: '25px',
  },
  /** @param Web 25px @param Mobile 21px */
  XLarge: {
    /** 25px */ Web: '25px',
    /** 21px */ Mobile: '21px',
  },
  /** @param Web 21px @param Mobile 19px */
  Large: {
    /** 21px */ Web: '21px',
    /** 19px */ Mobile: '19px',
  },
  /** @param Web 19px @param Mobile 17px */
  Medium: {
    /** 19px */ Web: '19px',
    /** 17px */ Mobile: '17px',
  },
  /** @param Web 17px @param Mobile 15px */
  Small: {
    /** 17px */ Web: '17px',
    /** 15px */ Mobile: '15px',
  },
  /** @param Web 15px @param Mobile 13px */
  XSmall: {
    /** 15px */ Web: '15px',
    /** 13px */ Mobile: '13px',
  },
};

const Body = {
  /** @param Web 19px @param Mobile 19px */
  Large: {
    /** 19px */ Web: '19px',
    /** 19px */ Mobile: '19px',
  },
  /** @param Web 17px @param Mobile 17px */
  Medium: {
    /** 17px */ Web: '17px',
    /** 17px */ Mobile: '17px',
  },
  /** @param Web 15px @param Mobile 15px */
  Small: {
    /** 15px */ Web: '15px',
    /** 15px */ Mobile: '15px',
  },
};

const Detail = {
  /** @param Web 17px @param Mobile 17px */
  Large: {
    /** 17px */ Web: '17px',
    /** 17px */ Mobile: '17px',
  },
  /** @param Web 15px @param Mobile 15px */
  Medium: {
    /** 15px */ Web: '15px',
    /** 15px */ Mobile: '15px',
  },
  /** @param Web 13px @param Mobile 13px */
  Small: {
    /** 13px */ Web: '13px',
    /** 13px */ Mobile: '13px',
  },
};

const Label = {
  /** @param Web 19px @param Mobile 19px */
  Large: {
    /** 19px */ Web: '19px',
    /** 19px */ Mobile: '19px',
  },
  /** @param Web 17px @param Mobile 17px */
  Medium: {
    /** 17px */ Web: '17px',
    /** 17px */ Mobile: '17px',
  },
  /** @param Web 15px @param Mobile 15px */
  Small: {
    /** 15px */ Web: '15px',
    /** 15px */ Mobile: '15px',
  },
  /** @param Web 13px @param Mobile 13px */
  XSmall: {
    /** 13px */ Web: '13px',
    /** 13px */ Mobile: '13px',
  },
};

const Links = {
  /** @param Web 19px @param Mobile 19px */
  Large: {
    /** 19px */ Web: '19px',
    /** 19px */ Mobile: '19px',
  },
  /** @param Web 17px @param Mobile 17px */
  Medium: {
    /** 17px */ Web: '17px',
    /** 17px */ Mobile: '17px',
  },
  /** @param Web 15px @param Mobile 15px */
  Small: {
    /** 15px */ Web: '15px',
    /** 15px */ Mobile: '15px',
  },
};

const fontSize = {
  /** @param Large 66px / 40px @param Medium 50px / 32px @param Small 40px / 25px */
  Display: Display,
  /** @param Large 50px / 40px @param Medium 40px / 32px @param Small 32px / 25px */
  Heading: Heading,
  /** @param XXLarge 32px / 25px @param XLarge 25px / 21px @param Large 21px / 19px @param Medium 19px / 17px @param Small 17px / 15px @param XSmall 15px / 13px */
  Title: Title,
  /** @param Large 19px @param Medium 17px @param Small 15px */
  Body: Body,
  /** @param Large 17px @param Medium 15px @param Small 13px */
  Detail: Detail,
  /** @param Large 19px @param Medium 17px @param Small 15px @param XSmall 13px */
  Label: Label,
  /** @param Large 19px @param Medium 17px @param Small 15px */
  Links: Links,
};

const theme = {
  colors: colors,
  fontSize: fontSize,
};

const breakpoints = [720, 480];

const media = breakpoints.map((bp) => `@media (max-width: ${bp}px)`);

export { theme, media };
