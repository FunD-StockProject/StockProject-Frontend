import styled from '@emotion/styled';
import { theme } from '@styles/themes';
import AlertSVG from '@assets/icons/alert.svg?react';
import LoadingGIF from '@assets/loading.gif';

const ShortViewEmptyContainer = styled.div({
  position: 'relative',

  ['>svg']: {
    position: 'absolute',
  },
});

const ShortViewEmptyContent = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '16px',
  ['>p']: {
    margin: '0',
    ...theme.font.body16Semibold,
    color: theme.colors.sub_gray4,
  },
  ['>button']: {
    ...theme.font.body14Bold,
    color: theme.colors.sub_gray4,
    background: theme.colors.sub_gray10,
    borderRadius: '8px',
    padding: '4px 12px',
    marginTop: '-8px',
    border: 'none',
    cursor: 'pointer',
  },
  ['>svg, >img']: {
    width: '80px',
    height: 'auto',
    aspectRatio: '1 / 1',
    fill: theme.colors.sub_blue6,
  },
});

const ShortViewEmpty = ({
  isShow,
  isLoading,
  fetchMore,
}: {
  isShow: boolean;
  isLoading: boolean;
  fetchMore: () => void;
}) => {
  const LoadingComponent = () => (
    <ShortViewEmptyContent>
      <img src={LoadingGIF} />
      <p>새로운 종목을 불러오는 중...</p>
    </ShortViewEmptyContent>
  );

  const ErrorComponent = () => (
    <ShortViewEmptyContent>
      <AlertSVG />
      <p>종목을 불러오는 데 실패했어요😭</p>
      <button onClick={fetchMore}>다시 불러오기</button>
    </ShortViewEmptyContent>
  );

  if (!isShow) return null;

  return <ShortViewEmptyContainer>{isLoading ? <LoadingComponent /> : <ErrorComponent />}</ShortViewEmptyContainer>;
};

export default ShortViewEmpty;
