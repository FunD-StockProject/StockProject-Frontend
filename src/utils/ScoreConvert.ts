import { theme } from '@styles/themes';
import { stockScoreImage, stockScoreTitle } from '../constants/stockScore';

const scoreToImage = (score: number): string => {
  let resultLink: string = '';

  if (score >= 70) {
    resultLink = stockScoreImage.excellent;
  } else if (score >= 50) {
    resultLink = stockScoreImage.good;
  } else if (score >= 40) {
    resultLink = stockScoreImage.normal;
  } else if (score >= 30) {
    resultLink = stockScoreImage.poor;
  } else {
    resultLink = stockScoreImage.bad;
  }

  return resultLink;
};

const scoreToText = (score: number): string => {
  let resultText: string = '';

  if (score >= 70) {
    resultText = stockScoreTitle.excellent;
  } else if (score >= 50) {
    resultText = stockScoreTitle.good;
  } else if (score >= 40) {
    resultText = stockScoreTitle.normal;
  } else if (score >= 30) {
    resultText = stockScoreTitle.poor;
  } else {
    resultText = stockScoreTitle.bad;
  }

  return resultText;
};

const scoreToIndex = (score: number): number => {
  let result: number = 0;

  if (score >= 70) {
    result = 4;
  } else if (score >= 50) {
    result = 3;
  } else if (score >= 40) {
    result = 2;
  } else if (score >= 30) {
    result = 1;
  } else {
    result = 0;
  }

  return result;
};

const deltaScoreToColor = (deltaScore: number): string | null => {
  if (deltaScore > 0) {
    return theme.colors.sub_red;
  } else if (deltaScore < 0) {
    return theme.colors.sub_blue5;
  } else {
    return null;
  }
};

const diffToValue = (diff: number): string => {
  const diffSign = diff > 0 ? '+' : diff < 0 ? '-' : '';
  return diffSign + Math.abs(diff).toLocaleString();
};

const diffToPercent = (
  value: number,
  diff: number,
  option: { fixed?: number; sign?: boolean } = { fixed: 2, sign: true },
): string => {
  const diffSign = option.sign ? (diff > 0 ? '+' : diff < 0 ? '-' : '') : '';

  return diffSign + (Math.abs(value / (value - diff) - 1) * 100).toFixed(option.fixed) + '%';
};

export { scoreToImage, scoreToText, scoreToIndex, deltaScoreToColor, diffToValue, diffToPercent };
