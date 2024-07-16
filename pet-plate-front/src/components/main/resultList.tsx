'use client'

import styled from "styled-components"
import Image from "next/image"

import nextIcon from "@public/svg/arrow-right.svg?url"

export default function resultList() {
  return (
    <>
    <ResultListWrapper>
        <ResultInfo>
            <DateInfo>2024. 06. 21 분석 결과</DateInfo>
            <Nutrients><span>지방, 비타민 A가</span> 부족해요!</Nutrients>
        </ResultInfo>
        <NextIcon src={nextIcon} alt="next-icon"/>
    </ResultListWrapper>
    <ResultListWrapper>
    <ResultInfo>
        <DateInfo>2024. 06. 21 분석 결과</DateInfo>
        <Nutrients><span>나트륨, 비타민 A가</span> 부족해요!</Nutrients>
    </ResultInfo>
    <NextIcon src={nextIcon} alt="next-icon"/>
</ResultListWrapper>
</>
  )
}

const ResultListWrapper = styled.div`
    width: 19.5rem;
    padding: 1.031rem 1.25rem;
    margin-bottom: 0.813rem;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    border: solid 1px ${(props)=>props.theme.colors['grey3']};
    border-radius: 0.5rem;
`

const ResultInfo = styled.div`
    width: 14rem;

    display: flex;
    flex-direction: column;
`
const DateInfo = styled.div`
    font-size: 0.75rem;
    font-weight: 400;
    line-height: 160%;
    color: ${(props)=>props.theme.colors['grey7']}
`

const Nutrients = styled.h1`
    span{
        color: ${(props)=>props.theme.colors['symentic-red-400']}
    }
`
const NextIcon = styled(Image)`
    width: 1.5rem;
`