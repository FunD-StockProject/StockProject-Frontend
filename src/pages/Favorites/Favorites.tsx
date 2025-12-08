import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StockCountryKey } from '@ts/StockCountry';
import { diffToValue } from '@utils/ScoreConvert';
import { webPath } from '@router/index';
import ConfirmModal from '@components/Modal/Confirm/ConfirmModal';
import NoLoginWrapper from '@components/NoLoginWrapper/NoLoginWrapper';
import {
  useBookmarkListQuery,
  useDeleteBookmarkMutation,
  useToggleNotificationMutation,
} from '@controllers/preference/query';
import CheckSVG from '@assets/check.svg?react';
import BellSVG from '@assets/icons/bell.svg?react';
import EditSVG from '@assets/icons/edit.svg?react';
import PlusSVG from '@assets/icons/plus.svg?react';
import SearchSVG from '@assets/icons/search.svg?react';
import NoFavoritesPNG from '@assets/noFavorites.png';
import {
  FavoritesAddButtonContainer,
  FavoritesContainer,
  FavoritesContents,
  FavoritesDeleteButton,
  FavoritesEmptyContainer,
  FavoritesItemBellContainer,
  FavoritesItemContainer,
  FavoritesItemSubtextContainer,
  FavoritesListContainer,
  FavoritesTitleContainer,
} from './Favorites.Style';

const Favorites = () => {
  const navigate = useNavigate();

  const { data: bookmarkList = [], isLoading } = useBookmarkListQuery();
  const { mutate: deleteBookmark } = useDeleteBookmarkMutation();
  const { mutate: toggleNotification } = useToggleNotificationMutation();

  const isEmpty = bookmarkList.length === 0;
  const currentNotificationItemRef = useRef<number>();
  const [isEditMode, setIsEditMode] = useState(false);
  const [checkedList, setCheckedList] = useState<number[]>([]);

  const handleClickMore = () => {
    navigate('/');
  };

  const handleOpenSearchModal = () => {
    navigate('/', {
      state: {
        search: {
          type: 'STOCK',
          value: '',
        },
      },
    });
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

  const handleNotificationToggle = () => {
    console.log(currentNotificationItemRef.current);
    if (!currentNotificationItemRef.current) return;
    toggleNotification(currentNotificationItemRef.current);
    closeOffNotificationModal();
  };

  const handleEditToggle = () => {
    if (isEditMode) {
      setCheckedList([]);
    }
    setIsEditMode((prev) => !prev);
  };

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

  const [OffNotificationModal, openOffNotificationModal, closeOffNotificationModal] = ConfirmModal({
    title: '알림을 해제할까요?',
    description: (
      <>
        관심 종목은 유지된 채, <wbr />
        알림만 해제돼요
      </>
    ),
    onConfirm: handleNotificationToggle,
    isInverse: true,
    actionText: ['해제하기', '취소'],
  });

  const [DeleteFavoritesModal, openDeleteFavoritesModal, closeDeleteFavoritesModal] = ConfirmModal({
    title: '정말 해제하시겠어요?',
    description: (
      <>
        관심내역에서 삭제되고 <wbr />
        변동 알림이 중단됩니다
      </>
    ),
    onConfirm: handleDeleteFavorites,
    isInverse: true,
    actionText: ['삭제', '취소'],
  });

  if (isLoading) {
    // return;
  }

  return (
    <FavoritesContainer>
      <OffNotificationModal />
      <DeleteFavoritesModal />
      <NoLoginWrapper
        title={
          <>
            지금 로그인을 하고 <br />
            관심종목의 심리가 어떻게 변하는지 <br />
            알림을 받아보아요
          </>
        }
        description={
          <>
            👋 로그인을 하면 심리가 급등/급락할 때 <br />
            알림을 받을 수 있어요
          </>
        }
        buttonText="회원가입/로그인 하기"
        hasNavbar
      />

      <FavoritesTitleContainer>
        <p>관심종목 ({bookmarkList.length})</p>
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
            {bookmarkList.map((e) => (
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
            <FavoritesAddButtonContainer onClick={handleOpenSearchModal}>
              <PlusSVG />
              <p>종목 직접 추가하기</p>
            </FavoritesAddButtonContainer>
          </FavoritesListContainer>
          {isEditMode && !!checkedList.length && (
            <FavoritesDeleteButton onClick={openDeleteFavoritesModal}>삭제하기 {1}</FavoritesDeleteButton>
          )}
        </FavoritesContents>
      )}
    </FavoritesContainer>
  );
};

export default Favorites;
