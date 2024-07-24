import { atom } from 'recoil';
import { PetInfo } from '@lib/types';

//input-data1
export const scrollIndexState = atom<number>({
  key: 'scrollIndexState',
  default: 0,
});

export const petInfoState = atom<PetInfo>({
  key: 'petInfoState',
  default: {
    name: '', // 기본값 설정 예시
    age: undefined,
    weight: undefined,
    activity: '',
    neutering: '',
  },
});
