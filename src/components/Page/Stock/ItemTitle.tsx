import styled from '@emotion/styled';
import { STOCK_UPDATE_TIME } from '@ts/Constants';
import { StockCountryKey } from '@ts/StockCountry';
import { theme } from '@styles/themes';
import HelpSVG from '@assets/icons/question_mark_circle_fill.svg?react';

const ItemTextContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
  padding: '0px 20px',
});

const ItemTitleContainer = styled.div({
  display: 'flex',
  alignItems: 'center',
  gap: '6px',

  ['>p']: {
    margin: '0px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',

    ['&.title']: {
      ...theme.font.title20Semibold,
      color: theme.colors.sub_gray2,
      flexShrink: '0',
    },

    ['&.update-time']: {
      ...theme.font.body14Regular,
      color: theme.colors.sub_gray8,
      marginLeft: 'auto',
    },
  },
});

const ItemHelpContainer = styled.div({
  display: 'flex',
  alignItems: 'center',
  gap: '4px',

  ['>p']: {
    ...theme.font.detail12Medium,
    color: theme.colors.sub_gray6,
    margin: '0',
  },

  ['>svg']: {
    width: '14px',
    height: 'auto',
    aspectRatio: '1 / 1',
    fill: theme.colors.sub_gray7,
    flexShrink: '0',
  },
});

interface HelpProps {
  text: string;
  onClick: () => void;
}

const StockItemTitle = ({ title, country, help }: { title: string; country: StockCountryKey; help?: HelpProps }) => {
  const updateTime = STOCK_UPDATE_TIME[country];

  return (
    <ItemTextContainer>
      <ItemTitleContainer>
        <p className="title">{title}</p>
        <p className="update-time">어제 {updateTime} 기준</p>
      </ItemTitleContainer>
      {help && (
        <ItemHelpContainer onClick={help.onClick}>
          <p>{help.text}</p>
          <HelpSVG />
        </ItemHelpContainer>
      )}
    </ItemTextContainer>
  );
};

export default StockItemTitle;
