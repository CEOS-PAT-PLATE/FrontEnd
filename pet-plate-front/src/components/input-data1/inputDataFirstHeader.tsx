'use client'

import styled from "styled-components"
import Image from 'next/image'
import BackButton from '@public/svg/back-button.svg?url'
import ExitButton from '@public/svg/exit-button.svg?url'

export default function inputDataFirstHeader() {
  return (
    <HeaderWrapper>
        <BackButtonImage src={BackButton} alt="back-botton" />
        <Header>반려견 정보 입력</Header>
        <ExitButtonImage src={ExitButton} alt="exit-button" />
    </HeaderWrapper>
  )
}


const HeaderWrapper = styled.div`
    width: 100%;
    height: 3.25rem;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 5.188rem;
`

const BackButtonImage = styled(Image)`
    
`

const ExitButtonImage = styled(Image)`
`

const Header = styled.h2`
    
`
