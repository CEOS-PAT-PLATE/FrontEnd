'use client';

import StoreButton from '@components/input-data2/common/StoreButton';
import { useAddDirectlyToDailyMeals } from '@hooks/useAddDirectlyToDailyMeals';
import { useRecoilValue, useSetRecoilState, useRecoilState } from 'recoil';
import { isValidState } from '@recoil/atoms';
import { useRouter } from 'next/navigation';

import { RawFoodFormState } from '@recoil/nutrientAtoms';

import { noticeState } from '@recoil/atoms';
import { useState, useEffect } from 'react';


export default function NaturalFoodButton() {




  const getPetIdFromLocalStorage = () => {
    if (typeof window === 'undefined') return null;
    const petInfoString = localStorage.getItem('petInfo');
    console.log('petInfoString:', petInfoString);
    if (!petInfoString) {
      console.error('No petInfo found in localStorage');
      return null;
    }
    try {
      const petInfo = JSON.parse(petInfoString);
      return petInfo.petId;
    } catch (error) {
      console.error('Error parsing petInfo from localStorage', error);
      return null;
    }
  };


  const [petId, setPetId] = useState<number>(0);


  const { addRawMeal } = useAddDirectlyToDailyMeals();

  const setIsValid = useSetRecoilState(isValidState);
  const router = useRouter();

  const isValid = useRecoilValue(isValidState);
  const [rawFoodForm, setRawFoodForm] = useRecoilState(RawFoodFormState);

  const setNotice = useSetRecoilState(noticeState);

  useEffect(() => {
    const petIdFromStorage = getPetIdFromLocalStorage();
    setPetId(petIdFromStorage);
  }, [])

  const handleClick = () => {
    if (!isValid) {
      //  alert('입력 양식을 확인해 주세요.');
      setNotice({ isVisible: true, message: '미입력된 정보가 있어요!' });

      return;
    }

    const rawData = {
      rawId: rawFoodForm.rawId,
      serving: rawFoodForm.serving,
      name: rawFoodForm.name,
    };

    addRawMeal.mutate(
      { petId: petId, rawData: { rawId: rawData.rawId, serving: rawData.serving } },
      {
        onSuccess: () => {
          //   alert('하루 식사에 자연식이 저장되었습니다.');
          setNotice({ isVisible: true, message: '식단에 추가됐어요!' });

          setIsValid(false);
          setRawFoodForm({
            rawId: NaN,
            serving: NaN,
            name: '',
          });
          router.push('/201', { scroll: false });
        },
        onError: () => {
          //   alert('저장 중 오류가 발생했습니다.');
        },
      },
    );
  };

  return <StoreButton onClick={handleClick} />;
}
