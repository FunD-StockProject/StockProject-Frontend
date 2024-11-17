import { ReactComponent as LogoSVG } from '../../assets/logo_white.svg';
import dictSVG from '../../assets/footer_dict.svg';
import commentSVG from '../../assets/footer_comment.svg';
import developerSVG from '../../assets/footer_developer.svg';
import { ButtonDiv, FlexDiv, ImgDiv } from '../Common';
import { Text, TextHeading, TextTitle } from '../Text';
import { FooterButtonContainer, FooterContainer, FooterContents } from './Footer.Style';

const FooterButton = ({ img, str }: { img: string; str: string }) => {
  return (
    <ButtonDiv background="primary0" padding="18px 24px" radius="15px">
      <FlexDiv alignItems="center" gap="12px">
        <ImgDiv src={img} height="36px" />
        <TextTitle size="Large" color="primary100">
          {str}
        </TextTitle>
      </FlexDiv>
    </ButtonDiv>
  );
};

const Footer = () => {
  return (
    <>
      <FooterContainer>
        <FooterContents>
          <FlexDiv alignItems="center" gap="18px">
            <TextHeading color="primary0">About</TextHeading>
            <LogoSVG />
          </FlexDiv>
          <Text color="grayscale30" weight="Bold">
            개미들이 원하던 서비스! '인간지표'가 2025년 1월 11일에 공식 오픈이 예정되어있어요! 😊
            <br />
            '인간지표'를 사용하면서 불편한 부분이나 추가로 원하는 기능이 있으면 언제든지 피드백해주세요 :)
          </Text>

          <FooterButtonContainer>
            <FooterButton img={dictSVG} str="인간지표 백과사전" />
            <FooterButton img={commentSVG} str="서비스 의견 남기기" />
            <FooterButton img={developerSVG} str="만든이들" />
          </FooterButtonContainer>
        </FooterContents>
      </FooterContainer>
    </>
  );
};

export default Footer;
