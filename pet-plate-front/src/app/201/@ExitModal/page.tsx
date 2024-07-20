'use client';

// 종료 모달

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Button from '@components/modal/button';
import { useRecoilState } from 'recoil';
import { isExitModalOpenState } from '@recoil/atoms';
import { useRouter } from 'next/navigation';
import { handleDeleteAllMeals } from '@lib/apiService';

const getTodayDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1 필요
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const getPetIdFromLocalStorage = () => {
  if (typeof window === undefined) return null;
  const petInfoString = localStorage.getItem('petInfo');
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

const getDailyMealIdFromLocalStorage = () => {
  const dailyMealIdString = localStorage.getItem('dailyMealId');
  if (!dailyMealIdString) {
    console.error('No dailyMealId found in localStorage');
    return null;
  }
  return parseInt(dailyMealIdString, 10);
};

export default function Page() {
  const [isExitModalOpen, setIsExitModalOpen] = useRecoilState(isExitModalOpenState);
  const [petId, setPetId] = useState<number | null>(null);
  const [dailyMealId, setDailyMealId] = useState<number | null>(null);

  const router = useRouter();

  useEffect(() => {
    const petIdFromStorage = getPetIdFromLocalStorage();
    const dailyMealIdFromStorage = getDailyMealIdFromLocalStorage();
    setPetId(petIdFromStorage);
    setDailyMealId(dailyMealIdFromStorage);
  }, [isExitModalOpen]);

  if (!isExitModalOpen) return null;

  const handleModalCancel = () => {
    setIsExitModalOpen(false);
  };

  const handleModalConfirm = () => {
    if (petId !== null && dailyMealId !== null) {
      console.log('petId:', petId);
      console.log('dailyMealId:', dailyMealId);
      router.push('/main/analyze');
      handleDeleteAllMeals(petId, dailyMealId);
      setIsExitModalOpen(false);
    } else {
      console.error('Cannot proceed without valid petId and dailyMealId');
    }
  };

  const color1 = true; //grey
  const color2 = false; //primary

  return (
    <Overlay>
      <Modal>
        <Header>식단 입력을 종료하시겠어요?</Header>
        <Content>지금 종료하면 이제까지 작성한 내용이 저장되지 않고 모두 사라져요.</Content>
        <ButtonContainer>
          <Button color={color1} onClick={handleModalConfirm}>
            종료 할래요
          </Button>
          <Button color={color2} onClick={handleModalCancel}>
            다시 볼게요
          </Button>
        </ButtonContainer>
      </Modal>
    </Overlay>
  );
}

export const Overlay = styled.div`
  position: absolute;
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
  z-index: 1000;
`;

export const Modal = styled.div`
  display: inline-flex;
  padding: 36px 24px 24px 24px;
  flex-direction: column;
  height: 203px;
  width: 290px;
  align-items: center;
  gap: 10px;
  border-radius: 12px;
  background: #fff;
  box-shadow: 2px 2px 6px 0px rgba(153, 159, 165, 0.2);
  position: relative;
`;

export const Header = styled.h2`
  color: var(--grey9, #64696e);
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
