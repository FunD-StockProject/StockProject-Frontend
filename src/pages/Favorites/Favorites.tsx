import styled from '@emotion/styled';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StockCountryKey } from '@ts/StockCountry';
import { deltaScoreToColor, diffToValue } from '@utils/ScoreConvert';
import { webPath } from '@router/index';
import ConfirmModal from '@components/Modal/Confirm/ConfirmModal';
import NoLoginWrapper from '@components/NoLoginWrapper/NoLoginWrapper';
import { FavoriteStock } from '@controllers/api.Type';
import {
  useBookmarkListQuery,
  useDeleteBookmarkMutation,
  useToggleNotificationMutation,
} from '@controllers/query/favorites';
import { theme } from '@styles/themes';
import CheckSVG from '@assets/check.svg?react';
import BellSVG from '@assets/icons/bell.svg?react';
import EditSVG from '@assets/icons/edit.svg?react';
import SearchSVG from '@assets/icons/search.svg?react';
import NoFavoritesPNG from '@assets/noFavorites.png';

const Favorites = () => {
  const isLogin = !!localStorage.getItem('access_token');
  const { data } = useBookmarkListQuery();
  const [stocks, setStocks] = useState<FavoriteStock[]>([]);
  const { mutate: deleteBookmark } = useDeleteBookmarkMutation();
  useEffect(() => {
    setStocks(isLogin ? (data ?? []) : []);
  }, [data]);

  const isEmpty = stocks.length === 0;

  const navigate = useNavigate();

  const handleClickMore = () => {
    navigate('/');
  };

  const { mutate: toggleNotification } = useToggleNotificationMutation();
  const [isEditMode, setIsEditMode] = useState(false);

  const handleNotificationToggle = () => {
    console.log(currentNotificationItemRef.current);
    if (!currentNotificationItemRef.current) return;
    toggleNotification(currentNotificationItemRef.current);
    closeOffNotificationModal();
  };

  const [OffNotificationModal, openOffNotificationModal, closeOffNotificationModal] = ConfirmModal({
    title: '알림을 해제할까요?',
    description: '관심 종목은 유지된 채, 알림만 해제돼요',
    onConfirm: handleNotificationToggle,
    isInverse: true,
    actionText: ['해제하기', '취소'],
  });

  const currentNotificationItemRef = useRef<number>();

  const handleClickItemNotification = (stockId: number, isNotification: boolean) => (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    currentNotificationItemRef.current = stockId;

    if (isNotification) {
      openOffNotificationModal();
    } else {
      handleNotificationToggle();
    }
  };

  const handleClickFavoriteItem = (stockName: string, country: StockCountryKey) => () => {
    if (isEditMode) return;
    navigate(webPath.search(), {
      state: {
        symbolName: stockName,
        country: country,
      },
    });
  };

  const handleEditToggle = () => {
    if (isEditMode) {
      setCheckedList([]);
    }
    setIsEditMode((prev) => !prev);
  };

  const [checkedList, setCheckedList] = useState<number[]>([]);

  const handleChangeSelect = (stockId: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;

    if (checked) {
      setCheckedList((prev) => [...prev, stockId]);
    } else {
      setCheckedList((prev) => prev.filter((e) => e != stockId));
    }
  };

  const handleDeleteFavorites = async () => {
    await Promise.all(checkedList.map((id) => deleteBookmark(id)));
    closeDeleteFavoritesModal();
    setCheckedList([]);
  };

  const [DeleteFavoritesModal, openDeleteFavoritesModal, closeDeleteFavoritesModal] = ConfirmModal({
    title: '정말 삭제하시겠어요?',
    description: '관심내역에서 삭제되고 변동 알림이 중단됩니다',
    onConfirm: handleDeleteFavorites,
    isInverse: true,
    actionText: ['삭제', '취소'],
  });

  return (
    <FavoritesContainer>
      <OffNotificationModal />
      <DeleteFavoritesModal />
      {!isLogin && (
        <NoLoginWrapper
          title={
            <>
              지금 로그인을 하고
              <br />
              관심종목의 심리가 어떻게 변하는지
              <br />
              알림을 받아보아요
            </>
          }
          description={
            <>
              👋 로그인을 하면 심리가 급등/급락할 때
              <br />
              알림을 받을 수 있어요
            </>
          }
          buttonText="회원가입 / 로그인 하기"
        />
      )}

      <FavoritesTitleContainer>
        <p>관심종목 ({stocks.length})</p>
        {!isEmpty && <EditSVG onClick={handleEditToggle} />}
      </FavoritesTitleContainer>

      {isEmpty ? (
        <FavoritesEmptyContainer>
          <img src={NoFavoritesPNG} />
          <button onClick={handleClickMore}>
            <SearchSVG />
            <p>다양한 종목 둘러보기</p>
          </button>
        </FavoritesEmptyContainer>
      ) : (
        <FavoritesContents>
          <p>
            국내 종목: 오후 5시, 해외 종목: 오전 6시 (공휴일 제외)
            <br />
            인간지표 점수는 매일 오전 6시에 업데이트 됩니다.
          </p>
          <FavoritesListContainer>
            {stocks.map((e) => (
              <FavoritesItemContainer key={`FAVORITES_${e.stockId}`}>
                <input
                  type="checkbox"
                  checked={checkedList.some((b) => b == e.stockId)}
                  onChange={handleChangeSelect(e.stockId)}
                />
                {isEditMode && <CheckSVG />}
                <div onClick={handleClickFavoriteItem(e.symbolName, e.country)}>
                  <div className="title">
                    <p>{e.symbolName}</p>
                    <FavoritesItemBellContainer
                      isActive={e.isNotificationOn}
                      onClick={handleClickItemNotification(e.stockId, e.isNotificationOn)}
                    >
                      <BellSVG />
                    </FavoritesItemBellContainer>
                  </div>
                  <div className="sub">
                    <FavoritesItemSubtextContainer delta={e.priceDiffPerCent}>
                      {e.price.toLocaleString()}원<span>{diffToValue(e.priceDiffPerCent)}%</span>
                    </FavoritesItemSubtextContainer>
                    <FavoritesItemSubtextContainer delta={e.diff}>
                      {e.score}점<span>{diffToValue(e.diff)}</span>
                    </FavoritesItemSubtextContainer>
                  </div>
                </div>
              </FavoritesItemContainer>
            ))}
          </FavoritesListContainer>
          {isEditMode && !!checkedList.length && (
            <FavoritesDeleteButton onClick={openDeleteFavoritesModal}>삭제하기 {1}</FavoritesDeleteButton>
          )}
        </FavoritesContents>
      )}
    </FavoritesContainer>
  );
};

const FavoritesContainer = styled.div({
  flexGrow: '1',
  display: 'flex',
  flexDirection: 'column',
  padding: '20px 20px 40px',
  gap: '12px',
  boxSizing: 'border-box',
  overflow: 'hidden',
});

const FavoritesTitleContainer = styled.div({
  display: 'flex',
  gap: '10px',
  alignItems: 'center',

  ['>p']: {
    margin: '0',
    ...theme.font.title20Semibold,
    color: theme.colors.sub_white,
  },

  ['>svg']: {
    fill: theme.colors.sub_gray6,
    width: '20px',
    height: 'auto',
    aspectRatio: '1 / 1',
    cursor: 'pointer',
  },
});

const FavoritesEmptyContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',

  ['>img']: {
    width: '100%',
    height: '120px',
    objectFit: 'contain',
    background: theme.colors.sub_gray11,
    borderRadius: '10px',
    padding: '40px 0px',
  },

  ['>button']: {
    display: 'flex',
    gap: '10px',
    padding: '12px 20px',
    background: theme.colors.sub_gray2,
    alignItems: 'center',
    outline: 'none',
    border: 'none',
    borderRadius: '10px',
    justifyContent: 'center',

    ['>svg']: {
      width: '24px',
      height: 'auto',
      aspectRatio: '1 / 1',
      fill: theme.colors.sub_black,
    },
    ['>p']: {
      margin: '0',
      ...theme.font.body18Semibold,
      color: theme.colors.sub_black,
    },
  },
});

const FavoritesContents = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '36px',

  ['>p']: {
    margin: '0',
    ...theme.font.body14Medium,
    color: theme.colors.sub_gray6,
  },
});

const FavoritesListContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
});

const FavoritesItemContainer = styled.label({
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
  boxSizing: 'border-box',

  ['>input[type="checkbox"]']: {
    display: 'none',
  },

  ['>svg']: {
    stroke: 'transparent',
    width: '18px',
    height: 'auto',
    aspectRatio: '1 / 1',
    borderRadius: '2px',
    border: '2px solid #525658',
    boxSizing: 'border-box',
    flexShrink: '0',
  },

  ['> input[type="checkbox"]:checked + svg']: {
    border: 'none',
    background: '#F6F6F6',
    stroke: '#101010',

    ['>svg']: {
      display: 'block',
    },
  },

  ['>div']: {
    width: '100%',
    boxSizing: 'border-box',
    background: theme.colors.sub_gray11,
    borderRadius: '10px',
    padding: '20px',
    gap: '10px',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',

    ['>div.title']: {
      display: 'flex',

      ['>p']: {
        margin: '0',
        ...theme.font.title20Semibold,
        color: theme.colors.sub_white,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        width: '100%',
      },
    },

    ['>div.sub']: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
    },
  },
});

const FavoritesItemBellContainer = styled.div(
  ({ isActive }: { isActive?: boolean }) => ({
    ['>svg']: {
      fill: isActive ? theme.colors.sub_blue6 : theme.colors.sub_gray9,
    },
  }),
  {
    ['>svg']: {
      flexShrink: '0',
      width: '30px',
      height: 'auto',
      aspectRatio: '1 / 1',
    },
  },
);

const FavoritesItemSubtextContainer = styled.p(
  ({ delta }: { delta: number }) => ({
    ['>span']: {
      color: deltaScoreToColor(delta) ?? theme.colors.sub_gray1,
    },
  }),
  {
    margin: '0',
    display: 'flex',
    gap: '6px',
    ...theme.font.body16Medium,
    color: theme.colors.sub_gray4,
    alignItems: 'center',

    ['>span']: {
      ...theme.font.body14Semibold,
    },
  },
);

const FavoritesDeleteButton = styled.button({
  position: 'fixed',
  bottom: 'calc(96px + 24px)',
  left: '20px',
  right: '20px',
  borderRadius: '10px',
  padding: '10px 0px',
  border: 'none',
  background: theme.colors.sub_gray1,
  ...theme.font.body18Semibold,
  color: theme.colors.sub_black,
});

export default Favorites;
