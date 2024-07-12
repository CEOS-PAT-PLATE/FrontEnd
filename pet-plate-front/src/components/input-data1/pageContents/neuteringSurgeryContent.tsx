'use Client'

import styled from "styled-components"
import RadioLists from "@components/input-data1/radioLists"

export default function neuteringSurgeryContent() {
  const radioOptions = [
    { name: "neutering", value: "INTACT", text: "중성화 수술을 하지 않았어요" },
    { name: "neutering", value: "NEUTERED", text: "중성화 수술을 했어요" },
];

  return (
  <ContentWrapper>
        <Title>중성화 수술을 했나요?</Title>
        <Text>반려견의 중성화 수술 여부를 확인해주세요.</Text>
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