'use client'

import React from 'react';
import styled from "styled-components"
import Image from 'next/image'
import BackButton from '@public/svg/back-button.svg?url'
import ExitButton from '@public/svg/exit-button.svg?url'
import { useRouter } from 'next/navigation';

const InputDataFirstHeader = () => {

const router = useRouter();    
const handleExit = () => {
    localStorage.setItem('enrollPet', 'true');
    router.push('/main')
}

  return (
    <HeaderWrapper>
      <Header>반려견 정보 확인</Header>
      <ButtonWrapper onClick={handleExit}>
        <ExitButtonImage src={ExitButton} alt="exit-button" />
      </ButtonWrapper>
    </HeaderWrapper>
  )
}

export default InputDataFirstHeader;

const HeaderWrapper = styled.div`
  width: 100%;
  height: 3.25rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5.188rem;
`;


const ExitButtonImage = styled(Image)`
`;

const Header = styled.h2`
  font-size: 1rem;
  font-weight: bold;
  margin-left: 7.938rem;
`;

const ButtonWrapper = styled.div`
  cursor: pointer;
`;
