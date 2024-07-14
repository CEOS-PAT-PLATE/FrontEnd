'use client';

import StoreButton from '@components/input-data2/common/StoreButton';
import { useAddDirectlyToDailyMeals } from '@hooks/useAddDirectlyToDailyMeals';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { isValidState } from '@recoil/atoms';
import { useRouter } from 'next/navigation';

const dummyRawData = {
  rawId: 1,
  serving: 100,
};

export default function NaturalFoodButton() {
  const { addRawMeal } = useAddDirectlyToDailyMeals();
  const setIsValid = useSetRecoilState(isValidState);
  const router = useRouter();
  const isValid = useRecoilValue(isValidState);

  const handleClick = () => {
    if (!isValid) {
      alert('입력 양식을 확인해 주세요.');
      return;
    }

    addRawMeal.mutate(
      { petId: 3, rawData: dummyRawData },
      {
        onSuccess: () => {
          alert('하루 식사에 자연식이 저장되었습니다.');
          setIsValid(false);
          router.push('/201', { scroll: false });
        },
        onError: () => {
          alert('저장 중 오류가 발생했습니다.');
        },
      },
    );
  };

  return <StoreButton onClick={handleClick} />;
}
