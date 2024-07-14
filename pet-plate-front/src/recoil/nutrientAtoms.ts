import { atom, selector } from 'recoil';

// 포장 간식
export const RequiredInputState = atom<any[]>({
  key: 'isRequiredInputValid',
  default: [
    { index: 1,  value: '' },
    { index: 2, value: '' },
    { index: 3,  value: '' },
    { index: 4,  value: '' },
    { index: 5,  value: '' },
    { index: 6, value: '' },
    { index: 7,  value: '' },
    { index: 8,  value: '' },
    { index: 9, value: '' },
    { index: 10, value: '' },

  ],
});

export const NutrientNameState = atom({
  key: 'nutreintName',
  default: '',
});


export const isFormValidState = selector({
  key: 'isFormValidState',
  get: ({ get }) => {
    const requiredInputState = get(RequiredInputState);
    const nutrientNameState = get(NutrientNameState);

    return checkRequiredInputState(requiredInputState, nutrientNameState );
  },
});

function checkRequiredInputState(requiredInputState: any[], nutrientNameState: string) {
  return nutrientNameState.trim() !== '' && requiredInputState.slice(0, 4).every((input) => {
    return input.value.trim() !== '';
  });
}


// 자연식 
export const RawFoodFormState = atom({
  key: 'rawFoodName',
  default: {
    rawId: '',
    serving:'' ,
  },
});
