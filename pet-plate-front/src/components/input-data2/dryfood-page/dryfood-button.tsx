'use client';

import StoreButton from '@components/input-data2/StoreButton';
import { useAddDirectlyToDailyMeals } from '@hooks/useAddDirectlyToDailyMeals';
import { useRecoilValue, useRecoilState } from 'recoil';
import { isFormValidState, formDataState, RequiredInputState } from '@recoil/nutrientAtoms';
import { useRouter } from 'next/navigation';

const dummyFeedData = {
  serving: 100,
  name: '테스트를 위한 사료 데이터',
  kcal: 350,
  carbonHydratePercent: 50,
  proteinPercent: 25,
  fatPercent: 15,
  calciumPercent: 1.5,
  phosphorusPercent: 1.2,
  vitaminAPercent: 0.01,
  vitaminDPercent: 0.005,
  vitaminEPercent: 0.02,
};

export default function DryFoodButton() {
  const { addFeed } = useAddDirectlyToDailyMeals();
  const router = useRouter();
  const isValid = useRecoilValue(isFormValidState);
  const [formData, setFormData] = useRecoilState(formDataState);
  const [requiredInputState, setRequiredInputState] = useRecoilState(RequiredInputState);

  const handleClick = () => {
    if (!isValid) {
      alert('입력 양식을 확인해 주세요.');
      return;
    }

    addFeed.mutate(
      { petId: 3, feedData: dummyFeedData },
      {
        onSuccess: () => {
          alert('하루 식사에 사료가 저장되었습니다.');
         
          setFormData({
            field1: '',
            field2: '',
            field3: '',
            field4: '',
          });
         
          setRequiredInputState([
            { index:1, isRequired: false },
            {  index:2, isRequired: false },
            {  index:3, isRequired: false },
            { index:4, isRequired: false },
          ]);
          router.push('/201', { scroll: false });
        },
        onError: () => {
          alert('저장 중 오류가 발생했습니다.');
        }
      }
    );
  };

  return <StoreButton onClick={handleClick} />;
}
