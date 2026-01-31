import { Fragment } from 'react/jsx-runtime';
import { theme } from '@styles/themes';
import DownCaretSVG from '@assets/icons/downCaret.svg?react';
import UpCaretSVG from '@assets/icons/upCaret.svg?react';
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

const deltaToColor = (delta: number): string | undefined => {
  return delta ? theme.colors[delta > 0 ? 'sub_red' : 'sub_blue5'] : undefined;
};

const deltaToCaret = (delta: number): React.FC => {
  return delta ? (delta > 0 ? UpCaretSVG : DownCaretSVG) : Fragment;
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

export { scoreToImage, scoreToText, scoreToIndex, deltaToColor, deltaToCaret, diffToValue, diffToPercent };
