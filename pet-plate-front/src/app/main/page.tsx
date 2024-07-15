'use client'
import styled from "styled-components"
import Image from "next/image"

import mainGraphic from "@public/svg/mainGraphic.svg?url"
import nextIcon from "@public/svg/arrow-left-line.svg?url"
import MainHeader from "@components/main/mainHeader"
import ScrollCarousel from "@components/main/scrollCarousel"
import GapButton from "@components/main/gapbtn"


export default function page() {
const handleOnclick = () => {

}
const buttonContent = (
  <>
  <span style={{color : "#fff"}}>반려견 영양분석 하러가기</span>
  <Image style={{ marginLeft : "3.938rem"}} src={nextIcon} alt="next-icon"/>
</>
)

  return (
    <PageWrapper>
      <MainInfoContainer>
        <MainGraphic src={mainGraphic} alt="mainGraphic"/>
      </MainInfoContainer>

      <GapButton onClick={handleOnclick}
          backgroundColor= {(props) => props.theme.colors.green}
          hoverBackgroundColor= {(props) => props.theme.colors.green}
          hoverButtonContentColor= "#fff"
          buttonContent = {buttonContent}
        />
      <InfoContainer>
        <Title>우리 아이의 건강을 위한 하루 10분!</Title>
        <>
          평균 수명 10-13살인 저희 가족, 반려견들의 건강<br/>
          적신호는 <span>영양 불균형</span>부터 시작됩니다.<br/>
          <br/>
          하루 24시간 중 단 <span>10분만을 투자</span>하여 우리 아이의<br/>
          건강을 지켜주세요!<br/>
          <br/>
          아이의 정보와 식단을 입력하면 영양분석을 통해<br/>
          과잉 / 부족 / 적정 상태의 영양소를 확인할 수 있어요.<br/>
          맞춤형 영양 분석 후, 영양 불균형으로 인해 나타날 수<br/>
          있는 증상과 영양제를 추천받아보세요. 
        </>
      </InfoContainer>

      <ScrollCarouselContatiner>
        <Text>
          펫플레이트의<br/>
          <span>반려견 영양분석 과정</span>
        </Text>
        <ScrollCarousel/>
      </ScrollCarouselContatiner>

    </PageWrapper>
  )
}

const PageWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`
const MainInfoContainer = styled.div`
  width: 100%;
`

const MainGraphic = styled(Image)`
  margin-bottom: 1rem;
`

const InfoContainer = styled.div`
  width: 100%;
  height: 20.75rem;
  padding-left: 1.5rem;

  font-size: 0.875rem;
  font-weight: 400;
  line-height: 160%;
  color: ${(props) => props.theme.colors['grey11']};

  span{
    font-weight: 900;
  }
`

const Title = styled.h1`
  margin-top: 2rem;
  margin-bottom: 1rem;
`

const ScrollCarouselContatiner = styled.div`
  width: 100%;
  height: 29.688rem;
  padding-left: 1.5rem;
  background-color: ${(props) => props.theme.colors['grey1']};

`
const Text = styled.div`
  margin-top: 2rem;
  margin-bottom: 1rem;
  font-size: 1.25rem;
  font-weight: 900;
  line-height: 160%;
  color: ${(props) => props.theme.colors['grey11']};

  span{
    color: ${(props) => props.theme.colors['green']};
  }
`