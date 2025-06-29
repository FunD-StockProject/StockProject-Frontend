import { useSearchParams } from 'react-router-dom';

const Callback = () => {
  const [searchParams] = useSearchParams();

  console.log(searchParams.get('code'));

  return <div>asd</div>;
};

export default Callback;
