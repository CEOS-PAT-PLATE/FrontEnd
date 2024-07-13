import { atom, selector } from 'recoil';

export const RequiredInputState = atom<any[]>({
  key: 'isRequiredInputValid',
  default: [
    { index: 1, isRequired: false },
    { index: 2, isRequired: false },
    { index: 3, isRequired: false },
    { index: 4, isRequired: false },
  ],
});

export const formDataState = atom<Record<string, any>>({
  key: 'formDataState',
  default: {
    field1: '',
    field2: '',
    field3: '',
    field4: '',
  },
});

export const isFormValidState = selector({
  key: 'isFormValidState',
  get: ({ get }) => {
    const requiredInputState = get(RequiredInputState);
    return requiredInputState.every(Boolean);
  },
});
