import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useExperimentQuery } from '@controllers/query/portfolio';
import BackLogoSVG from '@assets/backLogo.svg?react';
import { BackIcon, Container, InnerContainer, StatusTitle, TopBar, TopBarTitle } from '../Common.Style';
import ExperimentList from './ExperimentList/ExpermentList';
import { FilterContainer, FilterTab, FilterTabs, SortDropdown, TitleContainer } from './StockRecordSheet.Style';

const StockRecordSheet = () => {
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState<'active' | 'completed'>('active');
  const [sortOption, setSortOption] = useState<'latest' | 'oldest' | 'gain'>('latest');

  const { data: experiment } = useExperimentQuery();
  console.log(experiment);

  if (!experiment) return null;

  const filteredExperiments = (
    statusFilter == 'active' ? experiment.progressExperiments : experiment.completeExperiments
  ).sort((a: any, b: any) => {
    if (sortOption === 'latest') return b.experimentId - a.experimentId;
    if (sortOption === 'oldest') return a.experimentId - b.experimentId;

    const returnRateA = (a.currentPrice - a.buyPrice) / a.buyPrice;
    const returnRateB = (b.currentPrice - b.buyPrice) / b.buyPrice;

    if (sortOption === 'gain') return returnRateB - returnRateA;
    return 0;
  });

  return (
    <Container>
      <TopBar statusRate={0}>
        <BackIcon onClick={() => navigate(-1)}>
          <BackLogoSVG />
        </BackIcon>
        <TopBarTitle>매수 기록지</TopBarTitle>
      </TopBar>
      <InnerContainer style={{ padding: '12px' }}>
        <TitleContainer>
          <StatusTitle>총 실험 {filteredExperiments.length} 회</StatusTitle>
          <SortDropdown
            value={sortOption}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setSortOption(e.target.value as 'latest' | 'oldest' | 'gain')
            }
          >
            <option value="latest">최신순</option>
            <option value="oldest">오래된 순</option>
            <option value="gain">수익률 순</option>
          </SortDropdown>
        </TitleContainer>
        <FilterContainer>
          <FilterTabs>
            <FilterTab selected={statusFilter === 'active'} onClick={() => setStatusFilter('active')}>
              실험중
            </FilterTab>
            <FilterTab selected={statusFilter === 'completed'} onClick={() => setStatusFilter('completed')}>
              실험완료
            </FilterTab>
          </FilterTabs>
        </FilterContainer>
        <ExperimentList experiment={filteredExperiments} />
      </InnerContainer>
    </Container>
  );
};

export default StockRecordSheet;
