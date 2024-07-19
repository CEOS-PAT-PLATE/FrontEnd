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
    rawId: NaN,
    serving: NaN,
    name:'',
  },
});


// 결과 - 부족 영양소 : 영양제 추천 모달


export const isModalVisibleState = atom<boolean>({
  key: 'isModalVisibleState',
  default: false,
});

interface Supplement {
  id: number;
  name: string;
  englishName: string;
  vendor: string;
  drugImgPath: string;

}

export const selectedSupplementState = atom<{ supplement: Supplement | null, nutrient: string | null }>({
  key: 'selectedSupplementState',
  default: { supplement: null, nutrient: null },
});





// 분석 영양소 관련


export const nutrientDataState = atom({
  key: 'nutrientDataState',
  default: {
    excessNutrients: [],
    properNutrients: [],
    deficientNutrients: [],
    todayNutrients: [],
    todayKcal: 0,
    todaykcalRatio: 0,
    todayProperKcal: 0,
  },
});

export const dailyMealsState = atom({
  key: 'dailyMealState',
  default: 0,
});
