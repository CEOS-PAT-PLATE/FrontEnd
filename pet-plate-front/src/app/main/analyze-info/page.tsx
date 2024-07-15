'use client'
import styled from "styled-components"
import Carousel from "@components/main/carousel"
import LinkButton from "@components/main/linkBtn"

export default function page() {
  const buttonContent = (
    <><span style={{color:"#fff"}}>분석하러 가기</span></>
  );

  return (
    <PageWrapper>
    <ContentWrapper>
      <Carousel/>
    </ContentWrapper>
    <ButtonWrapper>
      <LinkButton href="/input-data1" //login 여부에 따라 수정
        backgroundColor = {(props) => props.theme.colors.green}
        hoverBackgroundColor= {(props) => props.theme.colors.green}
        hoverButtonContentColor= "#fff"
        buttonContent = {buttonContent}
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


const ContentWrapper = styled.div`
display: flex;
flex-direction: column;
align-items: center;
margin-top: 3rem;
`

const ButtonWrapper = styled.div`
position: absolute;
bottom: 3.125rem;
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
