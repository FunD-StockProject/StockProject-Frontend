import { STOCK_COUNTRY_MAP, StockCountryKey } from '@ts/StockCountry';

export const getPriceText = (
  country: StockCountryKey,
  price: number,
  option: { currencyText?: boolean; space?: boolean } = { currencyText: false, space: true },
) => {
  const priceText = price.toLocaleString();
  const currency = option.currencyText ? STOCK_COUNTRY_MAP[country].currencyText : STOCK_COUNTRY_MAP[country].currency;

  return option.currencyText ? `${priceText}${currency}` : `${currency}${option.space ? ' ' : ''}${priceText}`;
};

export const getDiffText = ({
  valueDiff,
  percentDiff,
  option = { percentFixed: 2 },
}: {
  valueDiff?: number;
  percentDiff?: number;
  option?: { percentFixed: number };
}) => {
  const sign = ((diff) => {
    return !diff ? '' : diff > 0 ? '+' : '-';
  })(valueDiff ?? percentDiff ?? 0);
  const valueDiffText = valueDiff !== undefined ? Math.abs(valueDiff).toLocaleString() : '';
  const percentDiffText = percentDiff !== undefined ? `${Math.abs(percentDiff).toFixed(option.percentFixed)}%` : '';

  if (valueDiff !== undefined) {
    if (percentDiff !== undefined) {
      return `${sign}${valueDiffText}(${percentDiffText})`;
    }
    return `${sign}${valueDiffText}`;
  }

  if (percentDiff !== undefined) {
    return `${sign}${percentDiffText}`;
  }

  return '';
};
