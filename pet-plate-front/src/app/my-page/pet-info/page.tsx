'use client'

import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { petInfoState } from '@lib/atoms';
import styled from "styled-components"
import Link from "next/link"
import Image from "next/image"
import backIcon from "@public/svg/back-button.svg?url"
import InputField from "@components/input-data1/inputField"
import RadioCheck from "@components/my-page/radioCheck"
import NextButton from '@components/input-data1/nextButton'
import { petAPI } from '@api/petAPI';

export default function Page() {
  
  const [petInfo, setPetInfo] = useRecoilState(petInfoState);

  // 로컬 스토리지에서 초기 상태 설정
  useEffect(() => {
    const storedPetInfo = localStorage.getItem('petInfo');
    if (storedPetInfo) {
      setPetInfo(JSON.parse(storedPetInfo));
    }
  }, [setPetInfo]);

  const nameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    const updatedPetInfo = { ...petInfo, name: newName };
    setPetInfo(updatedPetInfo);
  };

  const weightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const newWeight = value === '' ? undefined : parseInt(value.trim(), 10);
    const updatedPetInfo = { ...petInfo, weight: newWeight };
    setPetInfo(updatedPetInfo);
  };

  const ageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const newAge = value === '' ? undefined : parseInt(value.trim(), 10);
    const updatedPetInfo = { ...petInfo, age: newAge };
    setPetInfo(updatedPetInfo);
  };

  const neuteredChange = (value : string) => {
    const updatedPetInfo = { ...petInfo, neutering: value };
    setPetInfo(updatedPetInfo);
  };

  const activenessChange = (value : string) => {
    const updatedPetInfo = { ...petInfo, activity: value };
    setPetInfo(updatedPetInfo);
  };

  const handleSave = async () => {
    try {
      const response = await petAPI.putPetInfo(petInfo.petId, petInfo);
      console.log('Pet info updated:', response);
    } catch (error) {
      console.error('Failed to update pet info', error);
    }
  };

  const radioOptionsActivness = [
    { name: "activity", value: "VERY_ACTIVE", text: "초활발" },
    { name: "activity", value: "ACTIVE", text: "활발" },
    { name: "activity", value: "SOMEWHAT_ACTIVE", text: "보통" },
    { name: "activity", value: "INACTIVE", text: "차분" }
  ];

  const radioOptionsNeutering = [
    { name: "neutering", value: "INTACT", text: "중성화 안했어요" },
    { name: "neutering", value: "NEUTERED", text: "중성화 했어요" },
  ];

  return (
      <PageWrapper>
        <MypageHeader>
          <BackIconWrapper href={"/my-page"}>
            <BackIcon src={backIcon} alt="go back"/>
          </BackIconWrapper>
          반려견 정보 수정
        </MypageHeader>

        <ContentWrapper>
          <Title>반려견의 이름</Title>
          <InputField
            placeholder="이름"
            width="19.5rem"
            value={petInfo.name}
            onChange={nameChange}
          />
        </ContentWrapper>
      
        <RowContainer>
          <ContentHalfWrapper>
            <Title>나이</Title>
            <RowContainer>
              <InputField
                  placeholder="추정나이"
                  width="6.5rem"
                  value={petInfo.age !== undefined ? petInfo.age.toString() : ''} 
                  onChange={ageChange}
              />    
             <Title>세</Title>
            </RowContainer>
          </ContentHalfWrapper>
          <ContentHalfWrapper>
            <Title>몸무게</Title>
            <RowContainer>
              <InputField
                  placeholder="몸무게"
                  width="6.5rem"
                  value={petInfo.weight !== undefined ? petInfo.weight.toString() : ''} 
                  onChange={weightChange}
              />    
              <Title>kg</Title>
            </RowContainer>
          </ContentHalfWrapper>
        </RowContainer>

        <ContentWrapper>
          <Title>활동량</Title>
          {radioOptionsActivness.map((option, index) => (
                <RadioCheck
                    key={index}
                    name={option.name}
                    value={option.value}
                    text={option.text}
                    onChange={() => activenessChange(option.value)}
                />
            ))}
        </ContentWrapper>

        <ContentWrapper>
          <Title>중성화 여부</Title>
          {radioOptionsNeutering.map((option, index) => (
                <RadioCheck
                    key={index}
                    name={option.name}
                    value={option.value}
                    text={option.text}
                    onChange={() => neuteredChange(option.value)}
                />
            ))}
        </ContentWrapper>

        <FixedButtonContainer>
          <NextButton onClick={handleSave} />
        </FixedButtonContainer>
      </PageWrapper>  
  )
}

const PageWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const MypageHeader = styled.h1`
  width: 100%;
  height: 3.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
`

const BackIconWrapper = styled(Link)`
  
`
const BackIcon = styled(Image)`
  
`
const ContentWrapper = styled.div`
  width: 100%;
`

const ContentHalfWrapper = styled.div`
  width: 50%;
`

const RowContainer = styled.div`
  display: flex;
  flex-direction: row;
`

const Title = styled.h1`
  
`
const FixedButtonContainer = styled.div`
  position: absolute;
  bottom: 2rem;
  width: 100%;
  display: flex;
  justify-content: center;
`;
