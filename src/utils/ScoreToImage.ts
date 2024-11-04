import defaultImageLink from '../assets/default.svg';
import soarImageLink from '../assets/soar.svg';
import dropImageLink from '../assets/drop.svg';

const scoreToImage = (score: number): string => {
  let resultLink: string = defaultImageLink;

  if (score >= 80) {
    resultLink = soarImageLink;
  } else if (score >= 60) {
    resultLink = soarImageLink;
  } else if (score >= 40) {
    resultLink = defaultImageLink;
  } else if (score >= 20) {
    resultLink = dropImageLink;
  } else {
    resultLink = dropImageLink;
  }

  return resultLink;
};

export { scoreToImage };
