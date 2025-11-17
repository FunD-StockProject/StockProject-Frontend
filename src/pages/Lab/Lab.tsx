import styled from '@emotion/styled';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ExperimentItem } from '@ts/Interfaces';
import { webPath } from '@router/index';
import { StatusTitle } from '@components/Lab/Common.Style';
import ExperimentList from '@components/Lab/StockRecordSheet/ExperimentList/ExpermentList';
import LabResult from '@components/LabResult/LabResult';
import { useExperimentQuery } from '@controllers/query/portfolio';
import { theme } from '@styles/themes';
import AddStockSVG from '@assets/icons/addStock.svg?react';
import LeftChevronSVG from '@assets/icons/chevronLeftNarrow.svg?react';
import SamsungLogoSVGURL from '@assets/sangsung.svg?url';
import {
  AddStockButton,
  AddStockButtonWrapper,
  Container,
  GuideBox,
  GuideButton,
  GuideText,
  GuideTitle,
  MessageLink,
  StatusMessage,
  StatusSection,
  SummaryCard,
  SummaryCardContainer,
  SummaryLabel,
  SummarySection,
  SummaryTitle,
  SummaryValue,
  Tab,
  TabContainer,
} from './Lab.Style';

const mocksummaryMetrics = [
  { label: '총 실험 수', value: 12 },
  { label: '성공률', value: 62.5 },
  { label: '평균 수익률', value: 1.26 },
];

const mockExperiments: ExperimentItem[] = [
  {
    id: 1,
    name: '삼성전자',
    logo: SamsungLogoSVGURL,
    buyPrice: 50000,
    buyScore: 50,
    currentPrice: 60000,
    currentScore: 60,
    autoSellIn: 3,
    buyDate: '24.11.01',
  },
  {
    id: 2,
    name: 'Deloitte',
    logo: SamsungLogoSVGURL,
    buyPrice: 50000,
    buyScore: 50,
    currentPrice: 60000,
    currentScore: 60,
    autoSellIn: 2,
    buyDate: '24.11.05',
  },
  {
    id: 3,
    name: '애플',
    logo: SamsungLogoSVGURL,
    buyPrice: 70000,
    buyScore: 65,
    currentPrice: 80000,
    currentScore: 68,
    autoSellIn: 1,
    buyDate: '24.11.10',
  },
  {
    id: 4,
    name: '테슬라',
    logo: SamsungLogoSVGURL,
    buyPrice: 90000,
    buyScore: 72,
    currentPrice: 88000,
    currentScore: 70,
    autoSellIn: 0,
    buyDate: '24.11.15',
  },
  {
    id: 5,
    name: '네이버',
    logo: SamsungLogoSVGURL,
    buyPrice: 1000,
    buyScore: 80,
    currentPrice: 1300,
    currentScore: 85,
    autoSellIn: 2,
    buyDate: '24.11.18',
  },
  {
    id: 6,
    name: '카카오',
    logo: SamsungLogoSVGURL,
    buyPrice: 600,
    buyScore: 47,
    currentPrice: 60000,
    currentScore: 45,
    autoSellIn: 3,
    buyDate: '24.11.',
  },
  {
    id: 7,
    name: '현대차',
    logo: SamsungLogoSVGURL,
    buyPrice: 95000,
    buyScore: 66,
    currentPrice: 99000,
    currentScore: 70,
    autoSellIn: 4,
    buyDate: '24.11.23',
  },
  {
    id: 8,
    name: 'LG화학',
    logo: SamsungLogoSVGURL,
    buyPrice: 500000,
    buyScore: 85,
    currentPrice: 510000,
    currentScore: 87,
    autoSellIn: 0,
    buyDate: '24.11.26',
  },
  {
    id: 9,
    name: '마이크로소프트',
    logo: SamsungLogoSVGURL,
    buyPrice: 310000,
    buyScore: 78,
    currentPrice: 330000,
    currentScore: 82,
    autoSellIn: 5,
    buyDate: '24.11.28',
  },
  {
    id: 10,
    name: '엔비디아',
    logo: SamsungLogoSVGURL,
    buyPrice: 450000,
    buyScore: 90,
    currentPrice: 470000,
    currentScore: 92,
    autoSellIn: 1,
    buyDate: '24.12.01',
  },
  {
    id: 11,
    name: '아마존',
    logo: SamsungLogoSVGURL,
    buyPrice: 180000,
    buyScore: 58,
    currentPrice: 176000,
    currentScore: 56,
    autoSellIn: 2,
    buyDate: '24.12.03',
  },
  {
    id: 12,
    name: '구글',
    logo: SamsungLogoSVGURL,
    buyPrice: 200000,
    buyScore: 62,
    currentPrice: 2000,
    currentScore: 67,
    autoSellIn: 4,
    buyDate: '24.12.05',
  },
];

// const LabContainer = styled.div({
//   flexGrow: '1',
//   display: 'flex',
//   flexDirection: 'column',
//   boxSizing: 'border-box',
//   overflow: 'hidden',
// });

type EXPERIMENT_TAB = 'STATUS' | 'RESULT';
const experimentTabText: Record<EXPERIMENT_TAB, string> = {
  STATUS: '매수현황',
  RESULT: '매수결과',
};

// const experimentTabList: { key: EXPERIMENT_TAB; text: string }[] = [
//   { key: 'STATUS', text: experimentTabText.STATUS },
//   { key: 'RESULT', text: experimentTabText.RESULT },
// ];

// const LabFirstTimeContainer = styled.div({
//   background: theme.colors.sub_blue6,
//   borderRadius: '8px',
//   padding: '30px 24px',
//   display: 'flex',
//   flexDirection: 'column',
//   gap: '34px',
//   alignItems: 'flex-start',

//   ['>div']: {
//     display: 'flex',
//     flexDirection: 'column',
//     gap: '6px',

//     ['>p']: {
//       margin: '0',

//       ['&.title']: {
//         ...theme.font.title20Semibold,
//         color: theme.colors.sub_white,
//       },

//       ['&.desc']: {
//         ...theme.font.body14Medium,
//         color: theme.colors.sub_white,
//       },
//     },
//   },

//   ['>button']: {
//     ...theme.font.detail12Semibold,
//     color: theme.colors.sub_blue6,
//     background: theme.colors.sub_white,
//     borderRadius: '8px',
//     display: 'flex',
//     alignItems: 'center',
//     padding: '6px 10px',
//     margin: '0',
//     border: 'none',
//     gap: '4px',

//     ['>svg']: {
//       width: 'auto',
//       height: '18px',
//     },
//   },
// });

const Lab = () => {
  //   const navigate = useNavigate();
  //   const [selectedTab, setSelectedTab] = useState<EXPERIMENT_TAB>('STATUS');

  //   const handleClickTutorial = () => {
  //     navigate(webPath.labPurchase(), { state: { step: 0 } });
  //   };

  //   const { data: experiment } = useExperimentQuery();
  //   console.log(experiment);

  //   const handleClickAddExperiment = () => {
  //     navigate(webPath.labPurchase(), { state: { step: 1 } });
  //   };

  //   const statusList = [
  //     {
  //       title: '총 실험 수',
  //       value: `${experiment?.totalTradeCount}회`,
  //     },
  //     {
  //       title: '성공률',
  //       value: `${experiment?.successRate}%`,
  //     },
  //     {
  //       title: '평균 수익률',
  //       value: `${experiment?.avgRoi}%`,
  //     },
  //   ];

  //   return (
  //     <LabContainer>
  //       <div
  //         style={{
  //           borderBottom: `1px solid ${theme.colors.sub_gray8}`,
  //           padding: '24px 20px 0px',
  //           display: 'flex',
  //           gap: '4px',
  //         }}
  //       >
  //         {experimentTabList.map(({ key, text }) => (
  //           <span
  //             style={{
  //               paddingBottom: '6px',
  //               width: '92px',
  //               textAlign: 'center',
  //               ...theme.font.body16Semibold,
  //               color: key == selectedTab ? theme.colors.sub_gray1 : theme.colors.sub_gray6,
  //               borderBottom: `2px solid ${key == selectedTab ? theme.colors.sub_gray4 : 'transparent'}`,
  //             }}
  //             onClick={() => setSelectedTab(key)}
  //           >
  //             {text}
  //           </span>
  //         ))}
  //       </div>
  //       <div
  //         style={{
  //           display: 'flex',
  //           flexDirection: 'column',
  //           gap: '36px',
  //           padding: '32px 20px',
  //           flexGrow: '1',
  //         }}
  //       >
  //         <LabFirstTimeContainer>
  //           <div>
  //             <p className="title">실험실이 처음이신가요?</p>
  //             <p className="desc">평소 눈여겨 본 종목이 있다면, 모의매수를 통해 시장 타이밍을 잡아보세요!</p>
  //           </div>
  //           <button onClick={handleClickTutorial}>
  //             모의매수 시작
  //             <LeftChevronSVG />
  //           </button>
  //         </LabFirstTimeContainer>
  //         <LabStatusContainer>
  //           <p>모의 매수 현황</p>
  //           {experiment && (
  //             <div>
  //               {statusList.map((e) => (
  //                 <div>
  //                   <p className="title">{e.title}</p>
  //                   <p className="value">{e.value}</p>
  //                 </div>
  //               ))}
  //             </div>
  //           )}
  //         </LabStatusContainer>
  //         <LabExperimentContainer>
  //           <p>진행중인 실험</p>
  //           {experiment &&
  //             (experiment.progressExperiments.length ? (
  //               <LabExperimentEmptyContainer>
  //                 <p className="title">아직 진행중인 실험이 없어요 😭</p>
  //                 <p className="desc" onClick={handleClickAddExperiment}>
  //                   궁금한 종목 모의매수 하러가기 &gt;
  //                 </p>
  //               </LabExperimentEmptyContainer>
  //             ) : (
  //               <div></div>
  //             ))}
  //         </LabExperimentContainer>
  //       </div>
  //     </LabContainer>
  //   );
  // };

  // const LabExperimentEmptyContainer = styled.div({
  //   display: 'flex',
  //   flexGrow: '1',
  //   flexDirection: 'column',
  //   justifyContent: 'center',
  //   alignItems: 'center',

  //   ['>p']: {
  //     margin: '0',

  //     ['&.title']: {
  //       ...theme.font.body18Medium,
  //       color: theme.colors.sub_gray7,
  //     },
  //     ['&.desc']: {
  //       ...theme.font.body14Medium,
  //       colot: theme.colors.sub_gray6,
  //       textDecoration: 'underline',
  //     },
  //   },
  // });

  // const LabExperimentContainer = styled.div({
  //   display: 'flex',
  //   flexGrow: '1',
  //   flexDirection: 'column',
  //   gap: '8px',

  //   ['>p']: {
  //     margin: '0',
  //     ...theme.font.title20Medium,
  //     color: theme.colors.sub_white,
  //   },
  // });

  // const LabStatusContainer = styled.div({
  //   display: 'flex',
  //   flexDirection: 'column',
  //   gap: '8px',

  //   ['>p']: {
  //     margin: '0',
  //     ...theme.font.title20Medium,
  //     color: theme.colors.sub_white,
  //   },

  //   ['>div']: {
  //     display: 'flex',
  //     gap: '12px',

  //     ['>div']: {
  //       display: 'flex',
  //       flexDirection: 'column',
  //       gap: '6px',
  //       flexGrow: '1',
  //       background: theme.colors.sub_gray11,
  //       alignItems: 'center',
  //       padding: '12px 0px',
  //       borderRadius: '8px',

  //       ['>p']: {
  //         margin: '0',
  //         whiteSpace: 'nowrap',

  //         ['&.title']: {
  //           color: theme.colors.sub_white,
  //           ...theme.font.body14Semibold,
  //         },
  //         ['&.value']: {
  //           color: theme.colors.sub_gray5,
  //           ...theme.font.body14Medium,
  //         },
  //       },
  //     },
  //   },
  // });

  const navigate = useNavigate();
  const isFirstTime = false;
  const [selectedTab, setSelectedTab] = useState<'현황' | '결과'>('현황');

  const { data: experiment } = useExperimentQuery();

  const handleIntroClick = (step: number) => () => {
    navigate(webPath.labPurchase(), { state: { step: step } });
  };

  const statusList = [
    {
      label: '총 실험 수',
      value: `${experiment?.totalTradeCount}회`,
    },
    {
      label: '성공률',
      value: `${experiment?.successRate}%`,
    },
    {
      label: '평균 수익률',
      value: `${experiment?.avgRoi}%`,
    },
  ];

  return (
    <Container>
      <TabContainer>
        <div onClick={() => setSelectedTab('현황')}>
          <Tab selected={selectedTab === '현황'}>매수현황</Tab>
        </div>
        <div onClick={() => setSelectedTab('결과')}>
          <Tab selected={selectedTab === '결과'}>매수결과</Tab>
        </div>
      </TabContainer>

      {experiment &&
        (selectedTab === '현황' ? (
          <>
            {isFirstTime ? (
              <>
                <GuideBox>
                  <GuideTitle>실험실이 처음이신가요?</GuideTitle>
                  <GuideText>
                    평소 눈여겨 본 종목이 있다면, 모의매수를 <br />
                    통해 시장 타이밍을 잡아보세요!
                  </GuideText>
                  <GuideButton onClick={handleIntroClick(0)}>모의매수 시작 &gt;</GuideButton>
                </GuideBox>

                <SummarySection>
                  <SummaryTitle>모의 매수 현황</SummaryTitle>
                  <SummaryCardContainer>
                    {statusList.map((item, idx) => (
                      <SummaryCard key={idx}>
                        <SummaryLabel>{item.label}</SummaryLabel>
                        <SummaryValue>{item.value}</SummaryValue>
                      </SummaryCard>
                    ))}
                  </SummaryCardContainer>
                </SummarySection>

                <StatusSection>
                  <StatusTitle>진행중인 실험</StatusTitle>
                  <StatusMessage>
                    아직 진행중인 실험이 없어요 😢
                    <br />
                    <MessageLink onClick={handleIntroClick(1)}>궁금한 종목 모의매수 하러가기 &gt;</MessageLink>
                  </StatusMessage>
                </StatusSection>
              </>
            ) : (
              <>
                <SummarySection>
                  <SummaryTitle>모의 매수 현황</SummaryTitle>
                  <SummaryCardContainer>
                    {statusList.map((item, idx) => (
                      <SummaryCard key={idx} onClick={() => (idx == 0 ? navigate(webPath.labStockRecordSheet()) : {})}>
                        <SummaryLabel>{item.label}</SummaryLabel>
                        <SummaryValue>{item.value}</SummaryValue>
                      </SummaryCard>
                    ))}
                  </SummaryCardContainer>
                </SummarySection>

                <StatusSection>
                  <StatusTitle>진행중인 실험 {experiment.progressExperiments.length} 회</StatusTitle>
                  <ExperimentList experiment={experiment.progressExperiments} />
                  <AddStockButtonWrapper>
                    <AddStockButton onClick={handleIntroClick(1)}>
                      <AddStockSVG />
                    </AddStockButton>
                  </AddStockButtonWrapper>
                </StatusSection>
              </>
            )}
          </>
        ) : (
          <LabResult></LabResult>
        ))}
    </Container>
  );
};

export default Lab;
