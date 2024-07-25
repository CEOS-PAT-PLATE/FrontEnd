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
  }})


  //userData
  interface userData {
    loginMethod: string,
    name: string,
    email: string,
    receiveAd: boolean    
  }

  export const userDataState = atom<userData>({
    key: 'userDataState',
    default: {
      loginMethod: '로그인 해주세요',
      name: '로그인 해주세요',
      email: '로그인 해주세요',
      receiveAd: false   
    }})