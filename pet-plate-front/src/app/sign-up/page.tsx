'use client'

import styled from "styled-components"
import Image from "next/image"
import Link from 'next/link'

import signUpGraphic from "@public/svg/signup1.svg?url"
import mainLogo from "@public/svg/main-logo.svg?url"
import NaverLogo from "@public/svg/Naver.svg?url"
import GapButton from "@components/main/gapbtn"


export default function page() {
const handleOnclick = () =>{}
const buttonContent = (
  <>
      <Image src={NaverLogo} alt="Naver-logo"/>
      <span style={{color : "#fff", marginLeft : "1.438rem"}}>네이버로 시작하기</span>
  </>
);
  return (
    <PageWrapper>
      <Padding/>
      <ContentWrapper>
        <Text>하루 10분, 펫플레이트로 건강 체크!</Text>
        <MainLogo src={mainLogo} alt="mainLogo"/>
        <SignUpGraphic src={signUpGraphic} alt="signUpGraphic"/>
      </ContentWrapper>
      <ButtonWrapper>
        <GapButton onClick={handleOnclick}
          backgroundColor= "#03C75A" 
          hoverBackgroundColor= "#03C75A" 
          hoverButtonContentColor= "#fff"
          buttonContent = {buttonContent}
        />
        <TextLink href="/main">로그인 없이 둘러보기</TextLink>
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
  margin-top: 4rem;
`

const ButtonWrapper = styled.div`
  position: absolute;
  bottom: 4.25rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
`


const Text = styled.div`
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 160%;
  color: ${(props) => props.theme.colors['grey9']};
`

const TextLink = styled(Link)`
  font-size: 0.625rem;
  font-weight: 400;
  line-height: 160%;
  color: ${(props) => props.theme.colors['grey9']};
`

const SignUpGraphic = styled(Image)`
  
`
const MainLogo = styled(Image)`
  margin-top: 0.625rem;
  margin-bottom: 2.644rem;
`