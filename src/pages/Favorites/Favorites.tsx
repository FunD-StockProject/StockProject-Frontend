import { useEffect, useState } from 'react';
import { deltaScoreToColor } from '@utils/ScoreConvert';
import {
  Modal,
  ModalButton,
  ModalButtonPrimary,
  ModalButtons,
  ModalContent,
  ModalDescription,
  ModalOverlay,
  ModalTitle,
} from '@components/Modal/Common.Style';
import NoLoginWrapper from '@components/NoLoginWrapper/NoLoginWrapper';
import { FavoriteStock } from '@controllers/api.Type';
import { useBookmarkListQuery } from '@controllers/query/favorites';
import BellSVG from '@assets/icons/bell.svg?react';
import EditSVG from '@assets/icons/edit.svg?react';
import SearchSVG from '@assets/icons/search.svg?react';
import NoResultSVG from '@assets/noResult.svg?react';
import {
  ActionButtonPrimary,
  ActionButtons,
  Checkbox,
  Container,
  Content,
  DeleteButton,
  EditButton,
  EmptyState,
  Header,
  HeaderContainer,
  HeaderTitle,
  NotificationIcon,
  SVGContainer,
  StockChange,
  StockContainer,
  StockInfo,
  StockItem,
  StockList,
  StockName,
  StockPrice,
  StockPriceRow,
  StockScore,
  StockScoreChange,
  StockScoreRow,
  UpdateInfo,
} from './Favorites.Style';

const Favorites = () => {
  const isLogin = !!localStorage.getItem('access_token');
  const { data } = useBookmarkListQuery();
  const [isEditMode, setIsEditMode] = useState(false);
  const [stocks, setStocks] = useState<FavoriteStock[]>([]);

  useEffect(() => {
    setStocks(data ?? []);
  }, [data]);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [selectedStockId, setSelectedStockId] = useState<string | null>(null);

  const selectedCount = stocks.filter((stock) => stock.isSelected).length;
  const isEmpty = stocks.length === 0;
  console.log(isEmpty);
  const handleEditToggle = () => {
    setIsEditMode(!isEditMode);
    if (isEditMode) {
      setStocks(stocks.map((stock) => ({ ...stock, isSelected: false })));
    }
  };

  const handleStockSelect = (stockId: string) => {
    setStocks(stocks.map((stock) => (stock.id === stockId ? { ...stock, isSelected: !stock.isSelected } : stock)));
  };

  const handleNotificationToggle = (notification: boolean, stockId: string) => {
    setSelectedStockId(stockId);
    if (notification) setShowNotificationModal(true);
    else handleNotificationConfirm();
  };

  const handleDelete = () => {
    setStocks(stocks.filter((stock) => !stock.isSelected));
    setShowDeleteModal(false);
    setIsEditMode(false);
  };

  const handleNotificationConfirm = () => {
    if (selectedStockId) {
      setStocks(
        stocks.map((stock) =>
          stock.id === selectedStockId ? { ...stock, isNotificationOn: !stock.isNotificationOn } : stock,
        ),
      );
    }
    setShowNotificationModal(false);
    setSelectedStockId(null);
  };

  return (
    <>
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
      <Container>
        <Header>
          <HeaderTitle>
            <HeaderContainer>
              <span> 관심 종목 ({stocks.length})</span>
              {!isEmpty && (
                <EditButton onClick={handleEditToggle}>
                  <EditSVG />
                </EditButton>
              )}
            </HeaderContainer>
            {!isEmpty && (
              <UpdateInfo>
                국내 종목: 오후 5시, 해외 종목: 오전 6시 (공휴일 제외)인간지표 점수는 매일 오전 6시에 업데이트
                됩니다.이렇게 인간지표 점수는 매일 오전 6시에 업데이트 됩니다.
              </UpdateInfo>
            )}
          </HeaderTitle>
        </Header>

        <Content>
          {isEmpty ? (
            <EmptyState>
              <SVGContainer>
                <NoResultSVG />
              </SVGContainer>
              {isLogin && (
                <ActionButtons>
                  <ActionButtonPrimary>
                    <SearchSVG /> 다양한 종목 둘러보기
                  </ActionButtonPrimary>
                </ActionButtons>
              )}
            </EmptyState>
          ) : (
            <>
              <StockList>
                {stocks.map((stock) => {
                  const concurrency = stock.country === 'KOREA' ? '₩' : '$';
                  return (
                    <StockContainer key={stock.id}>
                      {isEditMode && (
                        <Checkbox
                          type="checkbox"
                          checked={stock.isSelected}
                          onChange={() => handleStockSelect(stock.id)}
                        />
                      )}
                      <StockItem key={stock.id}>
                        <StockInfo>
                          <StockName>
                            {stock.symbolName}
                            {!isEditMode && (
                              <NotificationIcon
                                isActive={stock.isNotificationOn}
                                onClick={() => handleNotificationToggle(stock.isNotificationOn, stock.id)}
                              >
                                <BellSVG />
                              </NotificationIcon>
                            )}
                          </StockName>
                          <StockPriceRow>
                            <StockPrice>
                              {concurrency} {stock.price.toLocaleString()}
                            </StockPrice>
                            <StockChange style={{ color: deltaScoreToColor(stock.priceDiffPerCent) ?? 'white' }}>
                              {stock.priceDiffPerCent}%
                            </StockChange>
                          </StockPriceRow>
                          <StockScoreRow>
                            <StockScore>{stock.score}점</StockScore>
                            <StockScoreChange style={{ color: deltaScoreToColor(stock.diff) ?? 'white' }}>
                              {stock.diff > 0 ? '+' : ''}
                              {stock.diff}
                            </StockScoreChange>
                          </StockScoreRow>
                        </StockInfo>
                      </StockItem>
                    </StockContainer>
                  );
                })}
              </StockList>
              {isEditMode && selectedCount > 0 && (
                <DeleteButton onClick={() => setShowDeleteModal(true)}>삭제하기 {selectedCount}</DeleteButton>
              )}
            </>
          )}
        </Content>

        {/* 알림 해제 모달 */}
        {showNotificationModal && (
          <Modal>
            <ModalOverlay onClick={() => setShowNotificationModal(false)} />
            <ModalContent>
              <ModalTitle>알람을 해제할까요?</ModalTitle>
              <ModalDescription>관심 종목은 유지된 채, 알림만 해제돼요</ModalDescription>
              <ModalButtons>
                <ModalButton onClick={() => setShowNotificationModal(false)}>취소</ModalButton>
                <ModalButtonPrimary onClick={handleNotificationConfirm}>해제하기</ModalButtonPrimary>
              </ModalButtons>
            </ModalContent>
          </Modal>
        )}

        {/* 삭제 확인 모달 */}
        {showDeleteModal && (
          <Modal>
            <ModalOverlay onClick={() => setShowDeleteModal(false)} />
            <ModalContent>
              <ModalTitle>정말 삭제하시겠어요?</ModalTitle>
              <ModalDescription>관심 종목 내역까지 삭제가 됩니다</ModalDescription>
              <ModalButtons>
                <ModalButton onClick={() => setShowDeleteModal(false)}>취소</ModalButton>
                <ModalButtonPrimary onClick={handleDelete}>삭제</ModalButtonPrimary>
              </ModalButtons>
            </ModalContent>
          </Modal>
        )}
      </Container>
    </>
  );
};

export default Favorites;
