/**
 * 주식 이미지 URL 생성 함수
 * @param stockId 주식 ID
 * @returns 이미지 URL
 */
export const getStockImageUrl = (stockId: number): string => {
  return `https://humanzipyobucket.s3.ap-northeast-2.amazonaws.com/stock-images/${stockId}.png`;
};

/**
 * 기본 이미지 URL (이미지가 없거나 로딩 실패 시 사용)
 */
export const DEFAULT_STOCK_IMAGE = '/default-stock-image.png';

/**
 * 주식 이미지 URL 결정 함수
 * @param stockId 주식 ID
 * @param imageUrl 백엔드에서 제공한 imageUrl (선택적)
 * @returns 최종 이미지 URL
 */
export const resolveStockImageUrl = (stockId: number, imageUrl?: string | null): string => {
  return imageUrl || getStockImageUrl(stockId);
};
