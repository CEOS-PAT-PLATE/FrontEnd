'use client';

import React from 'react';
import styled, { css } from 'styled-components';

export default function Page() {
  const isOpen = true;
  if (!isOpen) return null;

  const color1 = true; //grey
  const color2 = false; //primary

  return (
    <Overlay>
      <Modal>
        <Header>식단 입력을 종료하시겠어요?</Header>
        <Content>지금 종료하면 이제까지 작성한 내용이 저장되지 않고 모두 사라져요.</Content>
        <ButtonContainer>
          <Button $color={color1}>다시 볼게요</Button>
          <Button $color={color2}>네</Button>
        </ButtonContainer>
      </Modal>
    </Overlay>
  );
}

export const Overlay = styled.div`
  cursor: pointer;
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
`;

export const Modal = styled.div`
  display: inline-flex;
  padding: 36px 24px 24px 24px;
  flex-direction: column;
  gap: 14px;

  align-items: center;
  height: 225px;
  width: 290px;

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

export const Button = styled.button<{ $color: boolean }>`
  display: flex;
  width: 113px;
  height: 48px;
  padding: 14px 24px;
  justify-content: center;
  align-items: center;
  gap: 10px;

  border-radius: 8px;
  background: ${(props) => (props.$color ? 'var(--grey2, #ECEEF0)' : 'var(--primary, #40C97F)')};
  border: none;

  cursor: pointer;

  &:hover {
    background: ${(props) => (props.$color ? 'var(--grey3, #DDE0E4)' : 'var(--600, #33A165)')};
  }

  ${({ $color }) =>
    $color &&
    css`
      color: var(--grey11, #36393c);
      text-align: center;

      /* body2_semibold_14pt */
      font-family: SUIT;
      font-size: 14px;
      font-style: normal;
      font-weight: 600;
      line-height: 160%; /* 22.4px */
    `}

  ${({ $color }) =>
    !$color &&
    css`
      color: var(--white, #fff);
      text-align: center;

      /* body2_semibold_14pt */
      font-family: SUIT;
      font-size: 14px;
      font-style: normal;
      font-weight: 600;
      line-height: 160%; /* 22.4px */
    `}
`;
