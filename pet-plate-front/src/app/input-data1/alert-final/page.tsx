'use client'

import styled from "styled-components"
import Link from "next/link";
import Image from "next/image";
import alertGraphic from "@public/svg/alert-graphic.svg?url"
import alertTip from "@public/svg/alert-final-tip.svg?url"


export default function page() {
  return (
    <PageContainer>
        <AlertWrapper>
            <Text1>이제 얼마 안남았어요!</Text1>
            <AlertGraphic src={alertGraphic} alt="alert-graphic"/>
            <Text2>오늘의 식단을 입력해주시면 <br/> 맞춤형 영양정보를 알려드릴게요.</Text2>
            <AlertTip src={alertTip} alt="tip"/>
            <ContinueBtn href="/input-data2">다음으로</ContinueBtn>
        </AlertWrapper>
    </PageContainer>
);
}

const PageContainer = styled.div`
width: 100%;
height: 47.25rem;
background-color: aliceblue;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
`

const AlertWrapper = styled.div`
width: 18.125rem;
height: 27.688rem;
border: none;
border-radius: 0.75rem;
background-color: white;

display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
`

const Text1 = styled.div`
font-size: 1.125rem;
font-weight: 600;
line-height: 160%;
color: ${(props)=>props.theme.colors['grey10']};
margin-bottom: 0.5rem;
`

const Text2 = styled.div`
font-size: 0.75rem;
font-weight: 400;
line-height: 160%;
color: ${(props)=>props.theme.colors['grey9']};
text-align: center;
margin-top: 0.5rem;
`

const AlertGraphic = styled(Image)`
    
`

const AlertTip = styled(Image)`
    margin-top: 1.375rem;
`

const ContinueBtn = styled(Link)`
width: 14rem;
height: 3rem;
border: none;
border-radius: 0.5rem;
background-color: ${(props)=>props.theme.colors.green};
color: #fff;

font-size: 0.875rem;
font-weight: 600;
line-height: 160%;
text-decoration: none;

display: flex;
align-items: center;
justify-content: center;
`