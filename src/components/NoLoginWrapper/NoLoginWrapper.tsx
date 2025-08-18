import { ReactNode } from 'react';
import { Description, Overlay, PrimaryButton, SecondaryButton, Title } from './NoLoginWrapper.style';
import { useNavigate } from 'react-router-dom';
import { webPath } from '@router/index';

export interface NoLoginWrapperProps {
  title: ReactNode;
  description: string | ReactNode;
  buttonText: string;
  children?: ReactNode;
  className?: string;
  SecondaryButtonText?: string;
}

const NoLoginWrapper = ({
  title,
  description,
  buttonText,
  children,
  className,
  SecondaryButtonText,
}: NoLoginWrapperProps) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(webPath.login());
  }
  const handleSecondaryClick = () => {
    navigate('/');
  }

  return (
    <Overlay className={className} aria-live="polite" role="dialog" aria-modal="true">
      <Title>{title}</Title>
      <Description>{description}</Description>
      {children}
      <PrimaryButton type="button" onClick={handleClick}>
        {buttonText}
      </PrimaryButton>
      {SecondaryButtonText && <SecondaryButton type="button" onClick={handleSecondaryClick}>
        {SecondaryButtonText}
      </SecondaryButton>}
    </Overlay>
  );
};

export default NoLoginWrapper;