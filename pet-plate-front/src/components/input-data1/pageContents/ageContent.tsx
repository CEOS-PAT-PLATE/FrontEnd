'use client'

import { useRecoilState } from 'recoil';
import styled from "styled-components";
import InputField from "@components/input-data1/inputField";
import { petInfoState } from '@lib/atoms';

export default function AgeContent() {
    const [petInfo, setPetInfo] = useRecoilState(petInfoState);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const newAge = value !== '' && !isNaN(Number(value)) ? Number(value.trim()) : undefined;
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
                value={petInfo.age !== undefined ? petInfo.age.toString() : ''} 
                onChange={handleChange}
            />
        </ContentWrapper>
    );
}

const ContentWrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Title = styled.h1`
    font-size: 1.25rem;
    font-weight: bold;
    line-height: 160%;
    margin-bottom: 0.5rem;
    width: 100%;
    padding-left: 1.563rem;
`;

const Text = styled.div`
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 160%;
    color: #AFB8C1;
    margin-bottom: 1.125rem;
    width: 100%;
    padding-left: 1.563rem;
`;
