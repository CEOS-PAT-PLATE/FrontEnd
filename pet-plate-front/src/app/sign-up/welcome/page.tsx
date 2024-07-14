'use client'

import styled from "styled-components"
import Image from "next/image"
import Link from 'next/link'

import LinkButton from "@components/main/linkBtn"
import welcomeGraphic from "@public/svg/signup2.svg?url"

export default function Page() {
  const buttonContent1 = (
    <>
        <span style={{color : "#fff"}}>분석하러 가기</span>
    </>
  );

  const buttonContent2 = (
    <>
        <span style={{color : "#fff"}}>홈으로</span>
    </>
  );
    return (
      <PageWrapper>
        <ContentWrapper>
          <Text>회원가입을 축하드려요</Text>
          <WelcomeGraphic src={welcomeGraphic} alt="signUpGraphic"/>
        </ContentWrapper>
        <ButtonWrapper>
          <LinkButton href="/main/analyze-info" //login 여부에 따라 수정
            backgroundColor = {(props) => props.theme.colors.green}
            hoverBackgroundColor= {(props) => props.theme.colors.green}
            hoverButtonContentColor= "#fff"
            buttonContent = {buttonContent1}
          />
          <LinkButton href="/main"
            backgroundColor = {(props) => props.theme.colors['grey10']}
            hoverBackgroundColor= {(props) => props.theme.colors['grey10']}
            hoverButtonContentColor= "#fff"
            buttonContent = {buttonContent2}
          />
        </ButtonWrapper>
      </PageWrapper>
    )
}

const PageWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`
const Padding = styled.div`
  width: 100%;
  height: 44px;
  //상단 탭 임의 설정
`
const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 3rem;
`

const ButtonWrapper = styled.div`
  position: absolute;
  bottom: 2rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.438rem;
`


const Text = styled.h1`
  color: ${(props) => props.theme.colors['grey11']};
  width: 100%;
  text-align: left;
`

const WelcomeGraphic = styled(Image)`
  margin-top: 2.582rem;
`