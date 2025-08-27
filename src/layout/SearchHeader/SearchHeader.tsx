

import styled from '@emotion/styled';
import HeartIcon from '@assets/icons/heart.svg?react'
import BellSVG from '@assets/icons/bell.svg?react';
import MoreIcon from '@assets/icons/detail.svg?react'
import BackIcon from '@assets/backLogo.svg?react';
import { useNavigate } from 'react-router-dom';

const SearchHeaderWrapper = styled.header({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  padding: '12px 20px',
  boxSizing: 'border-box',
});

const LeftSection = styled.div({
  display: 'flex',
  alignItems: 'center',
});

const RightSection = styled.div({
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
});

const IconButton = styled.button({
  background: 'none',
  border: 'none',
  padding: 0,
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const SearchHeader = ({ heartColor, bellColor, onHeartClick, onBellClick }: { heartColor: string, bellColor: string, onHeartClick: () => void, onBellClick: () => void }) => {
  const navigate = useNavigate();

  return (
    <SearchHeaderWrapper>
      <LeftSection>
        <IconButton>
          <BackIcon onClick={() => navigate(-1)} />
        </IconButton>
      </LeftSection>
      <RightSection>
        <IconButton>
          <HeartIcon onClick={onHeartClick} fill={heartColor} />
        </IconButton>
        <IconButton>
          <BellSVG onClick={onBellClick} fill={bellColor} />
        </IconButton>
        <IconButton>
          <MoreIcon />
        </IconButton>
      </RightSection>
    </SearchHeaderWrapper>
  );
};

export default SearchHeader;