import { atom } from 'recoil';
import { RawFood, PetInfo } from '@lib/types';

//input-data1
export const scrollIndexState = atom<number>({
  key: 'scrollIndexState',
  default: 0,
});

export const petInfoState = atom<PetInfo[]>({
  key: 'petInfoState',
  default: [
    {
      petId: 0,
      name: '김백순',
      age: 3,
      weight: 9,
      activity: 'ACTIVE',
      neutering: 'NEUTERED',
    },
  ],
});
