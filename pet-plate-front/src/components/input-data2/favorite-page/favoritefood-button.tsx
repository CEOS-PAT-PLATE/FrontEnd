'use client';

import StoreButton from '@components/input-data2/common/StoreButton';
import { useAddBookmarkToDailyMeals } from '@hooks/useAddBookmarkToDailyMeals';
import { useRecoilValue } from 'recoil';
import { isFormValidState } from '@recoil/nutrientAtoms';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';

export default function FavoriteButton() {
  const { addBookmarkFeed } = useAddBookmarkToDailyMeals();
  const router = useRouter();
  const isValid = useRecoilValue(isFormValidState);

  const handleClick = () => {
    if (!isValid) {
      alert('입력 양식을 확인해 주세요.');
      return;
    }

    addBookmarkFeed.mutate(
      { petId: 3, bookMarkedFeedId: 1 },
      {
        onSuccess: () => {
          alert('즐겨찾기에 저장되었습니다.');
          router.push('/201', { scroll: false });
        },
        onError: () => {
          alert('저장 중 오류가 발생했습니다.');
        },
      },
    );
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
