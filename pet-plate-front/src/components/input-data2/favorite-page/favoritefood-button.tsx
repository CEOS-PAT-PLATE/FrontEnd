'use client';

import StoreButton from '@components/input-data2/common/StoreButton';
import { useAddBookmarkToDailyMeals } from '@hooks/useAddBookmarkToDailyMeals';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { selectedItemState } from '@recoil/favoritePageAtoms';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';


import { noticeState } from '@recoil/atoms';

export default function FavoriteButton() {
  const { addBookmarkRaw, addBookmarkFeed, addBookmarkPackagedSnack } = useAddBookmarkToDailyMeals();
  const router = useRouter();
  const selectedItem = useRecoilValue(selectedItemState);

  const setNotice = useSetRecoilState(noticeState);


  const handleClick = () => {
    if (!selectedItem) {
      //   alert('입력 양식을 확인해 주세요.');
      setNotice({ isVisible: true, message: '식단을 선택해주세요!' });

      return;
    }

    switch (selectedItem.type) {
      case '자연식':
        addBookmarkRaw.mutate(
          { petId: 3, bookMarkedRawId: selectedItem.id },
          {
            onSuccess: () => {
              //   alert('하루 식단에 저장되었습니다.');
              setNotice({ isVisible: true, message: '식단에 추가됐어요!' });

              router.push('/201', { scroll: false });
            },
            onError: () => {
              //   alert('저장 중 오류가 발생했습니다.');
            },
          },
        );
        break;

      case '사료':
        addBookmarkFeed.mutate(
          { petId: 3, bookMarkedFeedId: selectedItem.id },
          {
            onSuccess: () => {
              //       alert('하루 식단에 저장되었습니다.');
              setNotice({ isVisible: true, message: '식단에 추가됐어요!' });

              router.push('/201', { scroll: false });
            },
            onError: () => {
              //    alert('저장 중 오류가 발생했습니다.');
            },
          },
        );
        break;

      case '포장 간식':
        addBookmarkPackagedSnack.mutate(
          { petId: 3, bookMarkedPackagedSnackId: selectedItem.id },
          {
            onSuccess: () => {
              //     alert('하루 식단에 저장되었습니다.');
              setNotice({ isVisible: true, message: '식단에 추가됐어요!' });

              router.push('/201', { scroll: false });
            },
            onError: () => {
              //    alert('저장 중 오류가 발생했습니다.');
            },
          },
        );
        break;

      default:
      //   alert('알 수 없는 음식 유형입니다.');
    }
  };

  return (
    <ButtonWrapper>
      <StoreButton onClick={handleClick} />
    </ButtonWrapper>
  );
}

const ButtonWrapper = styled.div`
  position: absolute;
  top: 0px;
`;
