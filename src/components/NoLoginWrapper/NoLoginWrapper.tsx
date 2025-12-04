import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { webPath } from '@router/index';
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
}

const NoLoginWrapper = (props: NoLoginWrapperProps) => {
  const isLogin = !!localStorage.getItem('access_token');

  const navigate = useNavigate();

  const { title, description, buttonText, children, className, SecondaryButtonText, hasHeader, hasNavbar } = props;

  const handleClick = () => {
    navigate(webPath.login());
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
    </Overlay>
  );
};

export default NoLoginWrapper;
