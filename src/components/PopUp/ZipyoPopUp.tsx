import LogoSVG from '@assets/logo_blue.svg?react';
import badPNG from '../../assets/stockScore/bad.png';
import {
  Backdrop,
  CloseButton,
  ConfirmButton,
  PopUpContainer,
  PopUpContent,
  PopUpDetail,
  PopUpDetailContainer,
  PopUpDetailNumber,
  PopUpImage,
  PopUpTitle,
} from './ZipyoPopUp.style';

const ZipyoPopUp = ({ onClose }: { onClose: () => void }) => (
  <>
    <Backdrop onClick={onClose} />
    <PopUpContainer>
      <CloseButton onClick={onClose}>✖</CloseButton>
      <PopUpTitle>
        <LogoSVG />
        점수란
      </PopUpTitle>
      <PopUpContent>
        인간지표만의 알고리즘을 사용하여 주식 관련 커뮤니티의 댓글을 분석해 민심을 점수화했어요. 점수는 하루에 한 번씩
        업데이트돼요.
        <PopUpImage>
          <div>
            <PopUpDetailNumber color={'grayscale80'}>1</PopUpDetailNumber>
            <p>"극대노"</p>
          </div>
          <div>
            <PopUpDetailNumber color={'grayscale80'}>2</PopUpDetailNumber>
            <img src={badPNG} alt="민심 이미지" />
          </div>
          <div>
            <PopUpDetailNumber color={'grayscale80'}>3</PopUpDetailNumber>
            <p style={{ fontSize: '4em' }}>14</p>
          </div>
        </PopUpImage>
        <PopUpDetailContainer>
          <PopUpDetail>
            <PopUpDetailNumber>1</PopUpDetailNumber>
            <span>민심 점수를 한 단어로 설명하는 키워드에요</span>
          </PopUpDetail>
          <PopUpDetail>
            <PopUpDetailNumber>2</PopUpDetailNumber>
            <span>민심 점수에 해당하는 이미지에요.</span>
          </PopUpDetail>
          <PopUpDetail>
            <PopUpDetailNumber>3</PopUpDetailNumber>
            <span>
              인간지표만의 알고리즘으로 도출된 종목에 대한 민심 점수에요. <br />
              점수가 높을수록 현재 개미들의 민심이 좋다는 것을 의미해요.
            </span>
          </PopUpDetail>
        </PopUpDetailContainer>
      </PopUpContent>
      <ConfirmButton onClick={onClose}>이해했어요</ConfirmButton>
    </PopUpContainer>
  </>
);

export default ZipyoPopUp;
