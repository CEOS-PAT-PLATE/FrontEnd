'use client';

import StoreButton from '@components/input-data2/common/StoreButton';
import { useAddDirectlyToDailyMeals } from '@hooks/useAddDirectlyToDailyMeals';
import { useRecoilValue, useRecoilState } from 'recoil';
import { isFormValidState, formDataState, RequiredInputState } from '@recoil/nutrientAtoms';
import { useRouter } from 'next/navigation';

const dummySnackData = {
  serving: 50,
  name: '테스트를 위한 포장 간식 데이터',
  kcal: 200,
  carbonHydratePercent: 60,
  proteinPercent: 20,
  fatPercent: 10,
  calciumPercent: 0.5,
  phosphorusPercent: 0.4,
  vitaminAPercent: 0.02,
  vitaminDPercent: 0.01,
  vitaminEPercent: 0.03,
};

export default function PackagedSnackButton() {
  const { addPackagedSnack } = useAddDirectlyToDailyMeals();
  const router = useRouter();
  const isValid = useRecoilValue(isFormValidState);
  const [formData, setFormData] = useRecoilState(formDataState);
  const [requiredInputState, setRequiredInputState] = useRecoilState(RequiredInputState);

  const handleClick = () => {
    if (!isValid) {
      alert('입력 양식을 확인해 주세요.');
      return;
    }

    addPackagedSnack.mutate(
      { petId: 3, snackData: dummySnackData },
      {
        onSuccess: () => {
          alert('하루 식사에 포장 간식이 저장되었습니다.');

          setFormData({
            field1: '',
            field2: '',
            field3: '',
            field4: '',
          });

          setRequiredInputState([
            { index: 1, isRequired: false },
            { index: 2, isRequired: false },
            { index: 3, isRequired: false },
            { index: 4, isRequired: false },
          ]);

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
