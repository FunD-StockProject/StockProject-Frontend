import styled from '@emotion/styled';
import useRouter from '@router/useRouter';
import { theme } from '@styles/themes';
import DictSVG from '@assets/footer/footer_dict.svg?react';

const GuideBannerContainer = styled.div({
  display: 'flex',
  alignItems: 'center',
  padding: '12px 14px',
  background: theme.colors.sub_gray11,
  borderRadius: '6px',
  gap: '16px',
  cursor: 'pointer',

  ['>svg']: {
    width: '24px',
    height: 'auto',
    aspectRatio: '1 / 1',
    fill: theme.colors.sub_gray1,
    padding: '12px',
    background: theme.colors.sub_gray10,
    borderRadius: '999px',
    flexShrink: '0',
  },
});

const GuideBannerTextGroup = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '2px',

  ['>p']: {
    margin: '0',

    ['&.title']: {
      ...theme.font.body16Semibold,
      color: theme.colors.sub_gray3,
    },

    ['&.description']: {
      ...theme.font.body14Medium,
      color: theme.colors.sub_gray6,
      whiteSpace: 'nowrap',
    },
  },
});

const GuideBanner = () => {
  const { navToAbout } = useRouter();

  return (
    <GuideBannerContainer onClick={navToAbout}>
      <DictSVG />
      <GuideBannerTextGroup>
        <p className="title">도대체 인간지표가 뭐지?</p>
        <p className="description">
          내가 사면 떨어지고, <wbr />
          내가 팔면 오르는 마법??
        </p>
      </GuideBannerTextGroup>
    </GuideBannerContainer>
  );
};

export default GuideBanner;
