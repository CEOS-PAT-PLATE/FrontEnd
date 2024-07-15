'use client';

import { useEffect, useState } from 'react';
import InfoLayout from '@components/input-data2/common/info-layout';
import FavoriteContainer from '@components/input-data2/favorite-page/favorite-container';
import FavoriteContainerWrapper from '@style/input-data2/favorite-container-wrapper';
import FavoritesButton from '@components/input-data2/favorite-page/favoritefood-button';
import bookmarkAPI from '@api/bookmarkAPI';
import { useRecoilValue } from 'recoil';
import { isBookmarkUpdated } from '@recoil/atoms';


interface Foodlist {
  id: number;
  type: string;
  name: string;
}

export default function Page() {
  const [favoritesFoodList, setFavoritesFoodList] = useState<Foodlist[]>([]);
  const bookmarkUpdated = useRecoilValue(isBookmarkUpdated);
  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const [response1, response2, response3] = await Promise.all([
          bookmarkAPI.getBookmarkRaws(),
          bookmarkAPI.getBookmarkFeeds(),
          bookmarkAPI.getBookmarkPackagedSnacks(),
        ]);

        const rawList = response1.data.data.map((item: any) => ({
          id: item.bookMarkedRawId,
          type: '자연식',
          name: item.name,
        }));

        const feedList = response2.data.data.map((item: any) => ({
          id: item.bookMarkedFeedId,
          type: '사료',
          name: item.name,
        }));

        const snackList = response3.data.data.map((item: any) => ({
          id: item.bookMarkedPackagedSnackId,
          type: '포장 간식',
          name: item.name,
        }));

        setFavoritesFoodList([...rawList, ...feedList, ...snackList]);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBookmarks();
  }, [bookmarkUpdated]);

  return (
    <>
      <InfoLayout
        title="익숙한 식단은 여기서 골라주세요"
        description="반려견에게 이전과 같은 사료를, 같은 양만큼 급여 중이라면 이전 기록을 사용해주세요!"
      />
      <FavoriteContainerWrapper>
        {favoritesFoodList.map((item) => (
          <FavoriteContainer key={item.id + item.type} id={item.id} type={item.type} name={item.name} />
        ))}
      </FavoriteContainerWrapper>
      <FavoritesButton />
    </>
  );
}
