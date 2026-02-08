import LoadingGIF from '@assets/loading.gif';
import { Container } from './Common';

const LoadingComponent = () => {
  return (
    <Container>
      <img src={LoadingGIF} />
    </Container>
  );
};

export default LoadingComponent;
