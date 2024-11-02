const scoreToImage = (score: number): string => {
  const defaultString = '';
  let resultLink: string = defaultString;

  if (score >= 80) {
    resultLink = '80 ~ 100 일때 표시할 이미지의 링크';
  } else if (score >= 60) {
    resultLink = '60 ~ 80 일떄표시할 이미지의 링크';
  } else if (score >= 40) {
    resultLink = '40 ~ 60 일떄표시할 이미지의 링크';
  } else if (score >= 20) {
    resultLink = '20 ~ 40 일떄표시할 이미지의 링크';
  } else {
    resultLink = '0 ~ 20 일떄표시할 이미지의 링크';
  }

  return resultLink;
};

export { scoreToImage };
