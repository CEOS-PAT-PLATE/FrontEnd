'use client';

import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import BackButton from '@public/svg/back-button.svg?url';
import ExitButton from '@public/svg/exit-button.svg?url';
import { useResetRecoilState } from 'recoil';
import { petInfoState } from '@lib/atoms';
import { useRouter } from 'next/navigation';

interface InputDataFirstHeaderProps {
  onClickBackButton: () => void;
}

export default function InputDataFirstHeader({ onClickBackButton }: InputDataFirstHeaderProps) {
  const router = useRouter();

  const handleOnclick = () => {
    router.push('/main/analyze');
  };

  return (
    <HeaderWrapper>
      <BackButtonImage src={BackButton} alt="back-button" onClick={handleOnclick} />
      <Header>반려견 식단 입력</Header>
      {/*
      <ExitButtonWrapper onClick={handleOnclick}>
        <ExitButtonImage src={ExitButton} alt="exit-button" />
      </ExitButtonWrapper>* */}
    </HeaderWrapper>
  );
}

const HeaderWrapper = styled.div`
  position: absolute;
  margin-top: 48px;
  display: flex;
  width: 360px;
  height: 52px;
  padding: 13px 20px;
  justify-content: center;
  align-items: flex-start;
  gap: 83px;
  flex-shrink: 0;
  left: -55px;
  z-index: 100;
`;

const BackButtonImage = styled(Image)`
  cursor: pointer;
`;

const ExitButtonImage = styled(Image)``;

const Header = styled.h2`
  color: var(--black, #191919);
  text-align: center;

  /* title2_regular_16pt */
  font-family: SUIT;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 160%; /* 25.6px */
`;

const ExitButtonWrapper = styled.div`
  cursor: pointer;
`;
