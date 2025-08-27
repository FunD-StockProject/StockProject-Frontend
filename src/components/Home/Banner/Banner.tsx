import {
  HomeAdContainer,
  HomeAdItem,
  HomeAdItemButton,
  HomeAdItemContent,
  HomeAdItemDescription,
  HomeAdItemIndex,
  HomeAdItemTitle,
} from './Banner.Style';

const Banner = () => {
  return (
    <HomeAdContainer>
      {Array.from({ length: 5 }).map((_, index, arr) => (
        <HomeAdItem key={index}>
          <HomeAdItemContent>
            <div>
              <HomeAdItemTitle>인간지표 앱 출시</HomeAdItemTitle>
              <HomeAdItemDescription>보다 더 편리하게 사용해보세요</HomeAdItemDescription>
            </div>
            <HomeAdItemButton>인간지표 SNS →</HomeAdItemButton>
          </HomeAdItemContent>
          <HomeAdItemIndex>
            <b>{index + 1}</b> / {arr.length}
          </HomeAdItemIndex>
          <span />
          <span />
          <span />
        </HomeAdItem>
      ))}
    </HomeAdContainer>
  );
};
export default Banner;
