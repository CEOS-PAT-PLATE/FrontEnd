'use client'
import styled from "styled-components"
import InputDataFirstHeader from "@components/input-data1/inputDataFirstHeader"

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <Container>
            <Padding></Padding> 
            <InputDataFirstHeader/>
            <Contents>{children}</Contents>
        </Container>
    )
  }

  const Container = styled.div`
    width: 100%;
    height: 100%;
  `
  const Padding = styled.div`
    width: 100%;
    height: 44px;
    //상단 탭 임의 설정
  `
 const Contents = styled.div`
    width: 100%;
 `
