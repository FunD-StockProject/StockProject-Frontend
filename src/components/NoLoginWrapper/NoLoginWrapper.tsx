import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthInfo from '@hooks/useAuthInfo';
import { ButtonContainer, Overlay, TitleContainer } from './NoLoginWrapper.style';

export interface NoLoginWrapperProps {
  title: ReactNode;
  description: string | ReactNode;
  buttonText: string;
  children?: ReactNode;
  className?: string;
  SecondaryButtonText?: string;
  hasHeader?: boolean;
  hasNavbar?: boolean;
  returnState?: unknown; // 로그인 후 돌아올 때 복원할 state
}

const NoLoginWrapper = (props: NoLoginWrapperProps) => {
  const { isLogin, handleNavigateLogin } = useAuthInfo();
  const navigate = useNavigate();

  const {
    title,
    description,
    buttonText,
    children,
    className,
    SecondaryButtonText,
    hasHeader,
    hasNavbar,
    returnState,
  } = props;

  const handleClick = () => {
    handleNavigateLogin({ returnState });
  };

  const handleSecondaryClick = () => {
    navigate('/');
  };

  if (isLogin) return null;

  return (
    <Overlay
      className={className}
      aria-live="polite"
      role="dialog"
      aria-modal="true"
      hasHeader={hasHeader}
      hasNavbar={hasNavbar}
    >
      <div>
        <TitleContainer>
          <p className="title">{title}</p>
          <p className="description">{description}</p>
        </TitleContainer>
        {children}
        <ButtonContainer>
          <button className="primary" onClick={handleClick}>
            {buttonText}
          </button>
          {SecondaryButtonText && (
            <button className="secondary" onClick={handleSecondaryClick}>
              {SecondaryButtonText}
            </button>
          )}
        </ButtonContainer>
      </div>
    </Overlay>
  );
};

export default NoLoginWrapper;
