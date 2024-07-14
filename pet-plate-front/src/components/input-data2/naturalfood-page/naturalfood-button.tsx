'use client';

import StoreButton from '@components/input-data2/common/StoreButton';
import { useAddDirectlyToDailyMeals } from '@hooks/useAddDirectlyToDailyMeals';
import { useRecoilValue, useSetRecoilState, useRecoilState } from 'recoil';
import { isValidState } from '@recoil/atoms';
import { useRouter } from 'next/navigation';

import {RawFoodFormState } from '@recoil/nutrientAtoms';




export default function NaturalFoodButton() {
  const { addRawMeal } = useAddDirectlyToDailyMeals();

  const setIsValid = useSetRecoilState(isValidState);
  const router = useRouter();

  const isValid = useRecoilValue(isValidState);
  const [rawFoodForm, setRawFoodForm] = useRecoilState(RawFoodFormState);


  const handleClick = () => {
    if (!isValid) {
      alert('입력 양식을 확인해 주세요.');
      return;
    }

    const rawData = {
      rawId: rawFoodForm.rawId,
      serving: rawFoodForm.serving,
    };

    addRawMeal.mutate(
      { petId: 3, rawData: rawData },
      {
        onSuccess: () => {
          alert('하루 식사에 자연식이 저장되었습니다.');
          setIsValid(false);
          setRawFoodForm( {
            rawId: NaN,
            serving: NaN,
          })
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
