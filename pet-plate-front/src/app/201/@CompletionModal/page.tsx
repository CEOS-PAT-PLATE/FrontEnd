'use client';

// 완료 모달

import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import Button from '@components/modal/button';
import { useRouter } from 'next/navigation';
import { dailyMealsAPI } from '@api/dailyMealsAPI';
import { usePathname } from 'next/navigation';

import { useRecoilState } from 'recoil';
import { isCompleteModalOpenState } from '@recoil/atoms';

const getTodayDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1 필요
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const storeNutrientDataInLocalStorage = (petId:number, dailyMealId:number, nutrientData:any) => {
  const key = `${petId}-${dailyMealId}`;
  localStorage.setItem(key, JSON.stringify(nutrientData));
  localStorage.setItem('selectedDate', getTodayDate());
};

const fetchdailyMealId = async (petId: number, date?: string) => {
  const response = await dailyMealsAPI.getPetDailyMeals(petId, date);
  console.log('fetchdailyMealId response:', response);
  return response.data;
};

export default function Page() {
  const pathname = usePathname();
  const [petId, setPetId] = useState<number | null>(null);
  const [dailyMealId, setDailyMealId] = useState<number | null>(null);
  const [isCompleteModalOpen, setIsCompleteModalOpen] = useRecoilState(isCompleteModalOpenState);

  const router = useRouter();

  const handleModalCancel = () => {
    setIsCompleteModalOpen(false);
    // router.push('/201'); // 201로
  };

  const handleModalConfirm = () => {
    if (petId !== null && dailyMealId !== null) {
      // 예시: nutrientData를 설정하는 부분 (실제로는 해당 데이터를 가지고 있어야 함)
      const nutrientData = {}; // 실제 데이터로 변경 필요
      storeNutrientDataInLocalStorage(petId, dailyMealId, nutrientData);
      router.push(`/result/${petId}/${dailyMealId}`);
    }
  };

  const getPetIdFromLocalStorage = () => {
    if (typeof window === undefined) return null;
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

  useEffect(() => {
    const fetchDailyMeals = async () => {
      const petIdFromStorage = getPetIdFromLocalStorage();
      if (petIdFromStorage === null) return;
      setPetId(petIdFromStorage);
      const date = getTodayDate();
      try {
        const dailyMealResponse = await fetchdailyMealId(petIdFromStorage, date);
        if (dailyMealResponse && dailyMealResponse.data && dailyMealResponse.data.length > 0) {
          const dailyMealId = dailyMealResponse.data[0].dailyMealId;
          console.log('dailyMealId:', dailyMealId);
          setDailyMealId(dailyMealId);
        }
      } catch (e) {
        console.error(e); // 에러
      }
    };

    fetchDailyMeals();
  }, [pathname]);

  if (!isCompleteModalOpen) return null;

  const color1 = true; //grey
  const color2 = false; //primary

  return (
    <Overlay>
      <Modal>
        <Header>이 식단으로 분석 요청하시겠어요?</Header>
        <Content>한번 분석한 식단은 수정할 수 없어요.</Content>
        <ButtonContainer>
          <Button color={color1} onClick={handleModalCancel}>
            다시 볼게요
          </Button>
          <Button color={color2} onClick={handleModalConfirm}>
            네
          </Button>
        </ButtonContainer>
      </Modal>
    </Overlay>
  );
}
export const Overlay = styled.div`
  position: absolute;
  z-index: 1000;
  display: flex;
  justify-content: center;
  top: 0;
  left: 0;
  width: 360px;
  height: 800px;
  backdrop-filter: blur(4px); /* 배경 블러 처리 */
  background: rgba(75, 147, 125, 0.3); /* 투명도 80% 적용 */
  color: var(--white, #fff);
  align-items: center;
`;

export const Modal = styled.div`
  display: inline-flex;
  padding: 0px 24px 24px 24px;
  flex-direction: column;
  gap: 14px;
  align-items: center;
  height: 225px;
  width: 290px;
  justify-content: center;
  border-radius: 12px;
  background: #fff;
  box-shadow: 2px 2px 6px 0px rgba(153, 159, 165, 0.2);
  position: relative;
`;

export const Header = styled.h2`
  color: var(--grey9, #64696e);
  height: 28px;

  /* title1_semibold_18pt */
  font-family: SUIT;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 160%; /* 28.8px */
  letter-spacing: -0.2px;
`;

export const Content = styled.p`
  width: 213px;
  color: var(--grey9, #64696e);
  text-align: center;
  display: flex;
  flex-direction: column;
  height: 44px;

  /* body2_regular_14pt */
  font-family: SUIT;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 160%; /* 22.4px */
`;

export const ButtonContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;
  position: absolute;
  bottom: 24px;
`;
