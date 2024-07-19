'use client'

import styled from "styled-components"
import Link from "next/link"
import Image from "next/image"
import LinkButton from "@components/main/linkBtn"
import profileCard from "@public/svg/card_mypage.svg?url"
import profileIcon from "@public/svg/profile_grey.svg?url"
import NavbarFooter from "@components/main/navbarFooter"

export default function page() {
  const buttonContent = (
    <>
        <Image src={profileIcon} alt="profile-icon"/>
        <span style={{color : "#fff", marginLeft : "0.25rem"}}>계정 관리</span>
    </>
  );
  return (
    <PageWrapper>
      <MypageHeader>마이페이지</MypageHeader>
      <ProfileImgWrapper href={'/my-page/pet-info'}>
        <CardMypage src={profileCard} alt="profile-image"/>
      </ProfileImgWrapper>
      <LinkButton
        href="/my-page/user-account"
        backgroundcolor={(props) => props.theme.colors['grey10']}
        hoverbackgroundcolor={(props) => props.theme.colors['grey10']}
        hoverbuttoncontentcolor="#fff"
        buttonContent = {buttonContent}
      />      
      <LinkWrapper>
        <LinkMainPage href={'/main'}>펫플레이트 알아보기</LinkMainPage>
        <LinklInfo href={'/my-page/policy'}>개인정보 처리 약관</LinklInfo>
        <LinklInfo href={'/my-page/policy'}>서비스 이용 약관</LinklInfo>
      </LinkWrapper>
      <NavbarFooter/>
    </PageWrapper>
  )
}

const PageWrapper = styled.div`
  width: 100%;
  height: 47.25rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`

const MypageHeader = styled.h1`
  width: 100%;
  height: 3.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
`

const ProfileImgWrapper = styled(Link)`
  width: fit-content;
  height: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
`
const CardMypage = styled(Image)`
  
`
const LinkWrapper = styled.div`
  width: 19.5rem;
  display: flex;
  flex-direction: column;
  margin-top: 1.5rem;
  gap : 1rem;
`

const LinkMainPage = styled(Link)`
  text-decoration: none;
  font-size: 0.938rem;
  font-weight: 400;
  line-height: 160%;
  color: ${(props)=>props.theme.colors['grey11']};
`

const LinklInfo = styled(Link)`
  text-decoration: none;
  font-size: 0.938rem;
  font-weight: 400;
  line-height: 160%;
  color: ${(props)=>props.theme.colors['grey7']}
  `