import styled from '@emotion/styled';
import { useLocation } from 'react-router-dom';
import { LayoutProps } from '../../ts/Types';
import logoBlueSvg from '../../assets/logo_blue.svg';

const stockType = {
  국내: '국내',
  해외: '해외',
} as const;

type stockType = (typeof stockType)[keyof typeof stockType];

interface StockHeaderProps extends LayoutProps {
  type: stockType;
  name: string;
}

const StockHeader = styled(({ name, type, className }: StockHeaderProps) => {
  return (
    <div className={className}>
      <div id="stock_left">
        <div id="stock_info">
          <div id="stock_type">{type}</div>
          <div id="stock_name">{name}</div>
        </div>
        <div id="stock_desc">
          인간지표는 공식 지표가 아니므로 참고 용도로만 활용해 주세요
        </div>
      </div>
      <div id="stock_chart">차트보기</div>
    </div>
  );
})({
  display: 'flex',
  alignItems: 'center',
  ['#stock_left']: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
    flexGrow: 1,

    ['#stock_info']: {
      display: 'flex',
      gap: '14px',
      justifyItems: 'center',
      alignItems: 'center',

      ['#stock_type']: {
        fontSize: '14px',
        backgroundColor: '#4400FF',
        padding: '6px 24px',
        borderRadius: '14px',
      },

      ['#stock_name']: {
        fontSize: '34px',
      },
    },

    ['#stock_desc']: {
      fontSize: '24px',
    },
  },

  ['#stock_chart']: {
    padding: '17px 90px',
    fontSize: '30px',
    backgroundColor: '#333333',
    cursor: 'pointer',
  },
});

const StockHumanIndicatorSlider = styled(({ className }: LayoutProps) => {
  return (
    <div className={className}>
      <div id="human_indicator_header">
        <div id="human_indicator_region">국내 개미</div>
        <img src={logoBlueSvg} />
        <div id="about_human_indicator">?</div>
      </div>
      <div id="human_indicator_result">
        <div id="right_button">a</div>
      </div>
    </div>
  );
})({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  ['#human_indicator_header']: {
    display: 'flex',
    fontSize: '36px',
    gap: '12px',
    alignItems: 'center',

    ['#about_human_indicator']: {
      backgroundColor: '#666666',
      borderRadius: '100%',
      height: '28px',
      width: '28px',
      fontSize: '16px',
      cursor: 'pointer',
    },
  },
  ['#human_indicator_result']: {
    position: 'relative',
    width: '100%',
    height: '280px',
    backgroundColor: '#666666',
    ['#right_button']: {
      position: 'absolute',
      right: '0',
      height: '100%',
      backgroundColor: '#00000088',
      padding: '0 32px',
      opacity: '0',
      transition: 'all .05s ease-in-out',
      [':hover']: {
        opacity: '1',
      },
    },
  },
});

const StockHumanHowlingSlider = styled(({ className }: LayoutProps) => {
  return (
    <div className={className}>
      <div id="human_howling_header">
        <div id="human_howling_region">국내 개미들의 소리</div>
        <div id="about_human_howling">?</div>
      </div>
      <div id="human_howling_result">
        <div id="right_button">a</div>
      </div>
    </div>
  );
})({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  ['#human_howling_header']: {
    display: 'flex',
    fontSize: '36px',
    gap: '12px',
    alignItems: 'center',

    ['#about_human_howling']: {
      backgroundColor: '#666666',
      borderRadius: '100%',
      height: '28px',
      width: '28px',
      fontSize: '16px',
      cursor: 'pointer',
    },
  },
  ['#human_howling_result']: {
    position: 'relative',
    width: '100%',
    height: '660px',
    backgroundColor: '#666666',
    ['#right_button']: {
      position: 'absolute',
      right: '0',
      height: '100%',
      backgroundColor: '#00000088',
      padding: '0 32px',
      opacity: '0',
      transition: 'all .05s ease-in-out',
      [':hover']: {
        opacity: '1',
      },
    },
  },
});

const RelatedStockList = styled(({ className }: LayoutProps) => {
  return (
    <div className={className}>
      <div id="human_howling_header">관련 종목</div>
      <div id="human_howling_result">
        <div id="right_button">a</div>
      </div>
    </div>
  );
})({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  ['#human_howling_header']: {
    display: 'flex',
    fontSize: '36px',
    gap: '12px',
    alignItems: 'center',

    ['#about_human_howling']: {
      backgroundColor: '#666666',
      borderRadius: '100%',
      height: '28px',
      width: '28px',
      fontSize: '16px',
      cursor: 'pointer',
    },
  },
  ['#human_howling_result']: {
    position: 'relative',
    width: '100%',
    height: '400px',
    backgroundColor: '#666666',
    ['#right_button']: {
      position: 'absolute',
      right: '0',
      height: '100%',
      backgroundColor: '#00000088',
      padding: '0 32px',
      opacity: '0',
      transition: 'all .05s ease-in-out',
      [':hover']: {
        opacity: '1',
      },
    },
  },
});

const ResultDiv = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '30px',
  padding: '30px 0px',
});

const Result = () => {
  const { state } = useLocation();
  const stockName = state?.stockName;

  return (
    <ResultDiv>
      <StockHeader type={stockType.국내} name={stockName} />
      <StockHumanIndicatorSlider />
      <StockHumanHowlingSlider />
      <RelatedStockList />
      {stockName}
    </ResultDiv>
  );
};

export default Result;
