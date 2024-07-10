'use Client'

import styled from "styled-components"
import RadioLists from "@components/input-data1/radioLists"

export default function activenessContent() {
// 라디오 버튼에 대한 객체 배열
const radioOptions = [
    { name: "activity", value: "VERY_ACTIVE", text: "초활발 | 평균보다 매우 많이 움직여요" },
    { name: "activity", value: "ACTIVE", text: "활발 | 평균보다 더 많이 움직여요" },
    { name: "activity", value: "SOMEWHAT_ACTIVE", text: "보통 | 하루 평균 산책량을 준수해요" },
    { name: "activity", value: "INACTIVE", text: "차분 | 평균보다 적게 움직여요" }
];

  return (
    <ContentWrapper>
        <Title>얼마나 활발한가요?</Title>
        <Text>
            반려견의 나이에 맞는 하루 평균 산책량이 있어요. <br/>
            어린 반려견 (생후 8~12개월) : 15분 <br/>
            성견 (1~7살) : 30분~120분 <br/>
            노견 (7살 이상) : 30분~60분 <br/>
        </Text>
        {radioOptions.map((option, index) => (
                <RadioLists
                    key={index}
                    name={option.name}
                    value={option.value}
                    text={option.text}
                />
            ))}
    </ContentWrapper>
  )
}

const ContentWrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`
const Title = styled.h1`
    font-size: 1.25rem;
    font-weight: bold;
    line-height: 160%;
    
    margin-bottom: 0.5rem;
    width: 100%;
    padding-left: 1.563rem;
`

const Text = styled.div`
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 160%;
    color: #AFB8C1;
    
    margin-bottom: 1.125rem;
    width: 100%;
    padding-left: 1.563rem;
`