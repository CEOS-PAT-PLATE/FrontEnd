'use client'

import styled from "styled-components"
import InputDataFirstHeader from "@components/input-data1/inputDataFirstHeader"
import NextButton from "@components/input-data1/nextButton"
import Progressbar from "@components/input-data1/progressbar"

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <Container>
            <Padding></Padding> 
            <InputDataFirstHeader/>
            <Progressbar/>
            <Contents>{children}</Contents>
            <NextButton/>
        </Container>
    )
  }

  const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  `
  const Padding = styled.div`
    width: 100%;
    height: 44px;
    //상단 탭 임의 설정
  `
 const Contents = styled.div`
    width: 100%;
 `
