'use client'

import styled from "styled-components"
import NavbarFooter from "@components/main/navbarFooter"


export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <Container>
            <Padding></Padding> 
            <Contents>{children}</Contents>
            <NavbarFooter/>
        </Container>
    )
  }

  const Container = styled.div`
    width: 100%;
    height: 800px;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
  `
  const Padding = styled.div`
    width: 100%;
    height: 44px;
    background-color: transparent;
    //상단 탭 임의 설정
  `
 const Contents = styled.div`
    width: 100%;
    height: 42.063rem;
    overflow: scroll;
 `