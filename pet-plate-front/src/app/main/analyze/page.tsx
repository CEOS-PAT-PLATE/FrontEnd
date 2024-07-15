'use client'

import styled from "styled-components"
import Image from "next/image"

import MainHeader from "@components/main/mainHeader"
import LinkButton from "@components/main/linkBtn"
import infoCard from "@public/svg/analyze-result-card.svg?url"


export default function page() {
  const buttonContent = (
    <><span style={{color:"#fff"}}>분석하러 가기</span></>
  );

  return (
    <PageWrapper>
      <MainHeader/>
      <InfoCardContainer>
        <InfoCard src={infoCard} alt="info"/>
        <FixedBtnWrapper>
          <LinkButton href="/input-data1" //login 여부에 따라 수정
            backgroundColor = {(props) => props.theme.colors.green}
            hoverBackgroundColor= {(props) => props.theme.colors.green}
            hoverButtonContentColor= "#fff"
            buttonContent = {buttonContent}
          />
        </FixedBtnWrapper>
        
      </InfoCardContainer>
      <ResultListContainer>

      </ResultListContainer>
    </PageWrapper>
)
}

const PageWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const InfoCardContainer = styled.div`
  width: 100%;
  height: min-content;
  background-color: ${(props)=>props.theme.colors["green-200"]};

  position: relative;
`

const InfoCard = styled(Image)`
  position: absolute;
  top: 0;
`

const FixedBtnWrapper = styled.div`
  position: absolute;
  top: 7.688rem;
  left: 1.5rem;
`

const ResultListContainer = styled.div`
  
`

