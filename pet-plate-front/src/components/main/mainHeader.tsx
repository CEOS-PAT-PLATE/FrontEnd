'use client'
import styled from "styled-components"
import Image from "next/image"
import Link from "next/link"

import mainLogo from "@public/svg/main-logo.svg?url"
import mypageIcon from "@public/svg/profile.svg?url"

export default function mainHeader() {
  return (
    <MainHeaderWrapper>
        <MainLogo src={mainLogo} alt="main-logo"/>
        <MypageIcon src={mypageIcon} alt="mypage-icon"/>
    </MainHeaderWrapper>
  )
}

const MainHeaderWrapper = styled.div`
    width: 100%;
    height: 3.25rem;
    background-color: transparent;
    top: 44px; //상단 인디케이터

    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0 1.5rem;
    gap: 9.875rem;
`
const MainLogo = styled(Image)`
    width: 7.25rem;
    height: fit-content;
`
const MypageIcon = styled(Image)`
`