'use client';

// 종료 모달

import React from 'react';
import styled, { css } from 'styled-components';
import Button from '@components/modal/button';

import { useRecoilState } from 'recoil';

import { isExitModalOpenState } from '@recoil/atoms';
import { useRouter } from 'next/navigation';

export default function Page() {
  const isOpen = true;
  if (!isOpen) return null;

  const color1 = true; //grey
  const color2 = false; //primary

  const router = useRouter();

  const [isExitModalOpen, setIsExitModalOpen] = useRecoilState(isExitModalOpenState);

  const handleModalCancel = () => {
    setIsExitModalOpen(false);
    // router.push('/201'); // 201로
    // 계속 남아있음
  };

  const handleModalConfirm = () => {
    router.push('/main'); // 201로
    setIsExitModalOpen(false);
    // 아예 입력 취소하고 나가게끔!
  };

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
