import excellentPNG from '../assets/stockScore/excellent.png';
import goodPNG from '../assets/stockScore/good.png';
import normalPNG from '../assets/stockScore/normal.png';
import poorPNG from '../assets/stockScore/poor.png';
import badPNG from '../assets/stockScore/bad.png';

const stockScoreTitle = {
  perfect: '"s"',
  excellent: '"대호황"',
  good: '"호황"',
  normal: '"어?"',
  poor: '"곰탕"',
  bad: '"대곰탕"',
  fuck: '""',
};

const stockScoreImage = {
  perfect: undefined,
  excellent: excellentPNG,
  good: goodPNG,
  normal: normalPNG,
  poor: poorPNG,
  bad: badPNG,
  fuck: undefined,
};

const ARRAY_STOCK_SCORE_TITLE = [stockScoreTitle.bad, stockScoreTitle.poor, stockScoreTitle.normal, stockScoreTitle.good, stockScoreTitle.excellent];
const ARRAY_STOCK_SCORE_IMAGE = [stockScoreImage.bad, stockScoreImage.poor, stockScoreImage.normal, stockScoreImage.good, stockScoreImage.excellent];

export { stockScoreTitle, stockScoreImage, ARRAY_STOCK_SCORE_TITLE, ARRAY_STOCK_SCORE_IMAGE };
