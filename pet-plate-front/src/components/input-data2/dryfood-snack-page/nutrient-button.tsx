'use client';

import StoreButton from '@components/input-data2/common/StoreButton';
import { useAddDirectlyToDailyMeals } from '@hooks/useAddDirectlyToDailyMeals';
import { useRecoilValue, useRecoilState } from 'recoil';
import { isFormValidState, RequiredInputState, NutrientNameState } from '@recoil/nutrientAtoms';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

import { useSetRecoilState } from 'recoil';
import { noticeState } from '@recoil/atoms';

export default function NutrientButton() {

  
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



  const { addFeed, addPackagedSnack } = useAddDirectlyToDailyMeals();
  const router = useRouter();
  const isValid = useRecoilValue(isFormValidState);
  const [petId, setPetId] = useState<number>(0);


  const [requiredInputState, setRequiredInputState] = useRecoilState(RequiredInputState);
  const [nutrientName, setNutrientName] = useRecoilState(NutrientNameState);
  const pathName = usePathname();

  const setNotice = useSetRecoilState(noticeState);

  
  useEffect(() => {
    const petIdFromStorage = getPetIdFromLocalStorage();
    setPetId(petIdFromStorage);
  }, []);


  const apiCall = pathName === '/input-data2/dry-food' ? addFeed : addPackagedSnack;

  const nutrientData = {
    serving: parseInt(requiredInputState.find((item) => item.index === 1)?.value || '0', 10),
    name: nutrientName,
    kcal: parseInt(requiredInputState.find((item) => item.index === 2)?.value || '0', 10),
    carbonHydratePercent: parseInt(requiredInputState.find((item) => item.index === 3)?.value || '0', 10),
    proteinPercent: parseInt(requiredInputState.find((item) => item.index === 4)?.value || '0', 10),
    fatPercent: parseInt(requiredInputState.find((item) => item.index === 5)?.value || '0', 10),
    calciumPercent: parseInt(requiredInputState.find((item) => item.index === 6)?.value || '0', 10),
    phosphorusPercent: parseInt(requiredInputState.find((item) => item.index === 7)?.value || '0', 10),
    vitaminAPercent: parseInt(requiredInputState.find((item) => item.index === 8)?.value || '0', 10),
    vitaminDPercent: parseInt(requiredInputState.find((item) => item.index === 9)?.value || '0', 10),
    vitaminEPercent: parseInt(requiredInputState.find((item) => item.index === 10)?.value || '0', 10),
  };

  const handleClick = () => {
    if (!isValid) {
      //  alert('입력 양식을 확인해 주세요.');
      setNotice({ isVisible: true, message: '미입력된 정보가 있어요!' });

      return;
    }

    apiCall.mutate(
      { petId: petId, data: nutrientData },
      {
        onSuccess: () => {
          //    alert('하루 식사에 저장되었습니다.');
          setNotice({ isVisible: true, message: '식단에 추가됐어요!' });

          setRequiredInputState([
            { index: 1, value: '' },
            { index: 2, value: '' },
            { index: 3, value: '' },
            { index: 4, value: '' },
            { index: 5, value: '' },
            { index: 6, value: '' },
            { index: 7, value: '' },
            { index: 8, value: '' },
            { index: 9, value: '' },
            { index: 10, value: '' },
          ]);
          setNutrientName('');

          router.push('/201', { scroll: false });
        },
        onError: () => {
          //    alert('저장 중 오류가 발생했습니다.');
          setNotice({ isVisible: true, message: '양식에 맞게 입력해주세요!' });
        },
      },
    );
  };

  return <StoreButton onClick={handleClick} />;
}
