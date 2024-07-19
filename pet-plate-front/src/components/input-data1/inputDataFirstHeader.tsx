'use client'

import React from 'react';
import styled from "styled-components"
import Image from 'next/image'
import BackButton from '@public/svg/back-button.svg?url'
import ExitButton from '@public/svg/exit-button.svg?url'
import Link from 'next/link';

interface InputDataFirstHeaderProps {
  onClickBackButton: () => void;
}

const InputDataFirstHeader: React.FC<InputDataFirstHeaderProps> = ({ onClickBackButton }) => {
  return (
    <HeaderWrapper>
      <BackButtonImage src={BackButton} alt="back-button" onClick={onClickBackButton}/>
      <Header>반려견 정보 입력</Header>
      <ExitButtonWrapper href={'/main/analyze-info'}>
        <ExitButtonImage src={ExitButton} alt="exit-button" />
      </ExitButtonWrapper>
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
  justify-content: center;
  gap: 5.188rem;
`;

const BackButtonImage = styled(Image)`
  cursor: pointer;
`;

const ExitButtonImage = styled(Image)`
`;

const Header = styled.h2`
  font-size: 1rem;
  font-weight: bold;
`;

const ExitButtonWrapper = styled(Link)`
  //나중에 클릭시 작성중이던 정보 삭제로 수정
`