import { useEffect, useState } from 'react';
import { DEFAULT_STOCK_IMAGE, resolveStockImageUrl } from '@utils/stockImage';

interface StockImageProps {
  stockId: number;
  imageUrl?: string | null;
  alt?: string;
  className?: string;
  style?: React.CSSProperties;
  onError?: () => void;
}

/**
 * 주식 이미지 컴포넌트
 * 이미지 로딩 실패 시 자동으로 기본 이미지로 fallback
 */
const StockImage = ({
  stockId,
  imageUrl,
  alt = 'Stock image',
  className,
  style,
  onError: customOnError,
}: StockImageProps) => {
  const [imageError, setImageError] = useState(false);
  const [imageSrc, setImageSrc] = useState(resolveStockImageUrl(stockId, imageUrl));

  // stockId나 imageUrl이 변경되면 이미지 URL 재설정
  useEffect(() => {
    const newUrl = resolveStockImageUrl(stockId, imageUrl);
    setImageSrc(newUrl);
    setImageError(false);
  }, [stockId, imageUrl]);

  // 이미지 로딩 실패 시 기본 이미지로 변경
  const handleImageError = () => {
    if (!imageError) {
      setImageError(true);
      setImageSrc(DEFAULT_STOCK_IMAGE);
      customOnError?.();
    }
  };

  return <img src={imageSrc} alt={alt} onError={handleImageError} className={className} style={style} />;
};

export default StockImage;
