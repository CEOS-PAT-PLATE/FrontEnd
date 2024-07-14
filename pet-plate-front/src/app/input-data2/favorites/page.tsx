import InfoLayout from '@components/input-data2/common/info-layout';
import FavoriteContainer from '@components/input-data2/favorite-page/favorite-container';
import FavoriteContainerWrapper from '@style/input-data2/favorite-container-wrapper';
import FavoritesButton from '@components/input-data2/favorite-page/favoritefood-button';

const favoritesFoodList = [
  { type: '자연식', name: '바나나' },
  { type: '사료', name: '나우 어덜트 스몰브리드' },
  { type: '사료', name: '로얄 캐닌 어덜트 인도어' },
  { type: '포장 간식', name: '흑미고구마칩' },
];

interface Foodlist {
  type: string;
  name: string;
}

export default function Page() {
  return (
    <>
      <InfoLayout
        title="익숙한 식단은 여기서 골라주세요"
        description="반려견에게 이전과 같은 사료를, 같은 양만큼 급여 중이라면 이전 기록을 사용해주세요!"
      />
      <FavoriteContainerWrapper>
        {favoritesFoodList.map((item, index) => (
          <FavoriteContainer key={index} type={item.type} name={item.name} />
        ))}
      </FavoriteContainerWrapper>
      <FavoritesButton />
    </>
  );
}
