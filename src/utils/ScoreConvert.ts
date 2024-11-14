import greatBoomImageLink from '../assets/greatBoom.svg';
import boomImageLink from '../assets/boom.svg';
import uhImageLink from '../assets/uh.svg';
import depressionImageLink from '../assets/depression.svg';
import greatDepressionImageLink from '../assets/greatDepression.svg';

const scoreToImage = (score: number): string => {
  let resultLink: string = '';

  if (score >= 80) {
    resultLink = greatBoomImageLink;
  } else if (score >= 60) {
    resultLink = boomImageLink;
  } else if (score >= 40) {
    resultLink = uhImageLink;
  } else if (score >= 20) {
    resultLink = depressionImageLink;
  } else {
    resultLink = greatDepressionImageLink;
  }

  return resultLink;
};

const scoreToText = (score: number): string => {
  let resultText: string = '';

  if (score >= 80) {
    resultText = '대호항';
  } else if (score >= 60) {
    resultText = '호항';
  } else if (score >= 40) {
    resultText = '어?';
  } else if (score >= 20) {
    resultText = '곰탕';
  } else {
    resultText = '대곰탕';
  }

  return resultText;
};

export { scoreToImage, scoreToText };
