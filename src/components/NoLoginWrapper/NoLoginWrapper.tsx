import { ReactNode } from 'react';
import { Description, Overlay, PrimaryButton, Title } from './NoLoginWrapper.style';
import { useNavigate } from 'react-router-dom';
import { webPath } from '@router/index';

export interface NoLoginWrapperProps {
  title: ReactNode;
  description: string | ReactNode;
  buttonText: string;
  children?: ReactNode;
  className?: string;
}

const NoLoginWrapper = ({
  title,
  description,
  buttonText,
  children,
  className,
}: NoLoginWrapperProps) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(webPath.login());
  }
  return (
    <Overlay className={className} aria-live="polite" role="dialog" aria-modal="true">
      <Title>{title}</Title>
      <Description>{description}</Description>
      {children}
      <PrimaryButton type="button" onClick={handleClick}>
        {buttonText}
      </PrimaryButton>
    </Overlay>
  );
};

export default NoLoginWrapper;