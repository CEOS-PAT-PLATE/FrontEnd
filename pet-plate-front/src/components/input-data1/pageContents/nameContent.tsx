'use Client'

import styled from "styled-components"
import InputField from "@components/input-data1/inputField"

export default function nameContent() {
  return (
    <ContentWrapper>
        <Title>강아지의 이름은 무엇인가요?</Title>
        <InputField
            placeholder="이름"
            width="19.5rem"
        />
    </ContentWrapper>
  )
}


const ContentWrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const Title = styled.h1`
    font-size: 1.25rem;
    font-weight: bold;
    line-height: 160%;
    
    margin-bottom: 1.125rem;
    width: 100%;
    padding-left: 25px;
`