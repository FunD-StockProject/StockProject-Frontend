import { useState } from 'react';
import EditSVG from '@assets/icons/edit.svg?react';
import BellSVG from '@assets/icons/bell.svg?react';
import { Container, Header, HeaderTitle, UpdateInfo, EditButton, Content, EmptyState, ActionButtons, ActionButton, ActionButtonPrimary, StockList, StockItem, Checkbox, StockInfo, StockName, StockPriceRow, StockPrice, StockChange, StockScoreRow, StockScore, StockScoreChange, NotificationIcon, DeleteButton, Modal, ModalOverlay, ModalContent, ModalTitle, ModalDescription, ModalButtons, ModalButton, ModalButtonPrimary, SVGContainer } from './Favorites.Style';
import NoResultSVG from '@assets/noResult.svg?react';

interface Stock {
  id: string;
  name: string;
  price: string;
  change: string;
  score: string;
  scoreChange: string;
  isNotificationOn: boolean;
  isSelected?: boolean;
}

const Favorites = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [stocks, setStocks] = useState<Stock[]>([
    {
      id: '1',
      name: '테슬라',
      price: '20,300원',
      change: '-2.91%',
      score: '46점',
      scoreChange: '+23',
      isNotificationOn: false
    },
    {
      id: '2',
      name: '테슬라',
      price: '20,300원',
      change: '-2.91%',
      score: '46점',
      scoreChange: '+23',
      isNotificationOn: true
    }
  ]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [selectedStockId, setSelectedStockId] = useState<string | null>(null);

  const selectedCount = stocks.filter(stock => stock.isSelected).length;

  const handleEditToggle = () => {
    setIsEditMode(!isEditMode);
    if (isEditMode) {
      // 편집 모드 종료 시 선택 상태 초기화
      setStocks(stocks.map(stock => ({ ...stock, isSelected: false })));
    }
  };

  const handleStockSelect = (stockId: string) => {
    setStocks(stocks.map(stock =>
      stock.id === stockId
        ? { ...stock, isSelected: !stock.isSelected }
        : stock
    ));
  };

  const handleNotificationToggle = (stockId: string) => {
    setSelectedStockId(stockId);
    setShowNotificationModal(true);
  };

  const handleDelete = () => {
    setStocks(stocks.filter(stock => !stock.isSelected));
    setShowDeleteModal(false);
    setIsEditMode(false);
  };

  const handleNotificationConfirm = () => {
    if (selectedStockId) {
      setStocks(stocks.map(stock =>
        stock.id === selectedStockId
          ? { ...stock, isNotificationOn: !stock.isNotificationOn }
          : stock
      ));
    }
    setShowNotificationModal(false);
    setSelectedStockId(null);
  };

  const isEmpty = stocks.length !== 0;

  return (
    <Container>
      <Header>
        <HeaderTitle>
          <span>관심 종목 ({stocks.length})</span>
          {!isEmpty && (
            <EditButton onClick={handleEditToggle}>
              <EditSVG />
            </EditButton>
          )}
          {!isEmpty && (
            <UpdateInfo>
              국내 종목은 오후 5시, 해외종목/인간지표 점수는 매일 오전 6시에 업데이트 됩니다.
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
            <ActionButtons>
              <ActionButton>
                + 종목 직접 추가하기
              </ActionButton>
              <ActionButtonPrimary>
                Q 다양한 종목 둘러보기
              </ActionButtonPrimary>
            </ActionButtons>
          </EmptyState>
        ) : (
          <>
            <StockList>
              {stocks.map((stock) => (
                <StockItem key={stock.id}>
                  {isEditMode && (
                    <Checkbox
                      type="checkbox"
                      checked={stock.isSelected}
                      onChange={() => handleStockSelect(stock.id)}
                    />
                  )}
                  <StockInfo>
                    <StockName>{stock.name}</StockName>
                    <StockPriceRow>
                      <StockPrice>{stock.price}</StockPrice>
                      <StockChange>{stock.change}</StockChange>
                    </StockPriceRow>
                    <StockScoreRow>
                      <StockScore>{stock.score}</StockScore>
                      <StockScoreChange>{stock.scoreChange}</StockScoreChange>
                    </StockScoreRow>
                  </StockInfo>
                  {!isEditMode && (
                    <NotificationIcon
                      isActive={stock.isNotificationOn}
                      onClick={() => handleNotificationToggle(stock.id)}
                    >
                      <BellSVG />
                    </NotificationIcon>
                  )}
                </StockItem>
              ))}
            </StockList>
            <ActionButtons>
              <ActionButton>
                + 종목 직접 추가하기
              </ActionButton>
            </ActionButtons>
            {isEditMode && selectedCount > 0 && (
              <DeleteButton onClick={() => setShowDeleteModal(true)}>
                삭제하기 {selectedCount}
              </DeleteButton>
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
            <ModalDescription>
              관심 종목은 유지된 채, 알림만 해제돼요
            </ModalDescription>
            <ModalButtons>
              <ModalButton onClick={() => setShowNotificationModal(false)}>
                취소
              </ModalButton>
              <ModalButtonPrimary onClick={handleNotificationConfirm}>
                해제하기
              </ModalButtonPrimary>
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
            <ModalDescription>
              관심 종목 내역까지 삭제가 됩니다
            </ModalDescription>
            <ModalButtons>
              <ModalButton onClick={() => setShowDeleteModal(false)}>
                취소
              </ModalButton>
              <ModalButtonPrimary onClick={handleDelete}>
                삭제
              </ModalButtonPrimary>
            </ModalButtons>
          </ModalContent>
        </Modal>
      )}
    </Container>
  );
};

export default Favorites; 