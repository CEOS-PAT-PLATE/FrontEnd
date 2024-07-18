'use Client'

import { useRecoilState } from 'recoil';
import styled from "styled-components"
import InputField from "@components/input-data1/inputField"
import {InputFieldProps} from "@lib/types"
import { petInfoState } from '@lib/atoms';




export default function ageContent() {
    const [petInfo, setPetInfo] = useRecoilState(petInfoState);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const newAge = value === '' ? undefined : parseInt(value.trim(), 10); // 입력값을 정수로 파싱하거나 비어 있으면 undefined로 설정
        const updatedPetInfo = { ...petInfo, age: newAge };
        setPetInfo(updatedPetInfo);
      };


    return (
    <ContentWrapper>
        <Title>우리 아이가 몇 살인지 알려주세요</Title>
        <Text>나이에 따라 필요한 영양소를 분석해드릴게요</Text>
        <InputField
            placeholder="추정나이"
            width="19.5rem"
            value={petInfo.age !== undefined ? petInfo.age.toString() : ''} // 숫자를 문자열로 변환하여 전달
            onChange={handleChange}
        />
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