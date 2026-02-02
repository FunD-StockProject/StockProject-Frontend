import styled from '@emotion/styled';
import { SearchCategoryKey } from '@ts/SearchCategory';
import useAuthInfo from '@hooks/useAuthInfo';
import useRouter from '@router/useRouter';
import { useUnreadCountQuery } from '@controllers/notification/query';
import { theme } from '@styles/themes';
import AlarmSVG from '@assets/icons/alarm.svg?react';
import QuestionMarkCircleSVG from '@assets/icons/question_mark_circle.svg?react';
import SearchSVG from '@assets/icons/search.svg?react';
import FullLogoWhiteSVG from '@assets/logo/full_logo_white.svg?react';

const HomeHeaderContainer = styled.div({
  display: 'flex',
  padding: '8px 20px',
  width: '100%',
  boxSizing: 'border-box',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '8px',

  ['>svg']: {
    width: '100px',
    height: 'auto',
    fill: theme.colors.sub_white,
    marginRight: 'auto',
  },
});

const HomeHeaderButton = styled.div({
  display: 'flex',
  gap: '10px',
  position: 'relative',

  ['>svg']: {
    width: '36px',
    height: 'auto',
    aspectRatio: '1 / 1',
    cursor: 'pointer',
    fill: theme.colors.sub_gray7,
  },

  ['&.enable']: {
    ['::after']: {
      content: '""',
      position: 'absolute',
      top: '0',
      right: '0',
      margin: '5px',
      display: 'block',
      width: '5px',
      height: 'auto',
      aspectRatio: '1 / 1',
      background: theme.colors.sub_red,
      borderRadius: '50%',
    },
  },
});

const HomeHeader = ({
  openSearchBarModal,
}: {
  openSearchBarModal: ({ type, value }?: { type?: SearchCategoryKey; value?: string }) => () => void;
}) => {
  const { data: notificationCount } = useUnreadCountQuery();
  const { navToAbout, navToNotification } = useRouter();
  const { isLogin } = useAuthInfo();

  const handleQuestionMarkClick = () => {
    navToAbout();
  };

  const handleNotificationClick = () => {
    navToNotification();
  };

  return (
    <HomeHeaderContainer>
      <FullLogoWhiteSVG />
      <HomeHeaderButton onClick={handleQuestionMarkClick}>
        <QuestionMarkCircleSVG />
      </HomeHeaderButton>
      <HomeHeaderButton
        className={!isLogin || notificationCount?.unreadCount ? 'enable' : ''}
        onClick={handleNotificationClick}
      >
        <AlarmSVG />
      </HomeHeaderButton>
      <HomeHeaderButton onClick={openSearchBarModal()}>
        <SearchSVG />
      </HomeHeaderButton>
    </HomeHeaderContainer>
  );
};

export default HomeHeader;
