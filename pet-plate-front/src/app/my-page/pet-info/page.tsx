'use client'

import { useEffect, useState } from 'react';
import styled from "styled-components"
import Link from "next/link"
import Image from "next/image"
import backIcon from "@public/svg/back-button.svg?url"
import InputField from "@components/input-data1/inputField"
import RadioCheck from "@components/my-page/radioCheck"
import GapButton from '@components/main/gapbtn';
import { petAPI } from '@api/petAPI';
import { useRouter } from 'next/navigation';

interface Pet {
  petId: number;
  name: string;
  age: number | undefined;
  weight: number | undefined;
  activity: string;
  neutering: string;
  profileImgPath: string | null;
}

export default function Page() {
  const router = useRouter();
  const [petInfo, setPetInfo] = useState<Pet | null>(null);

  useEffect(() => {
    const storedPetInfo = localStorage.getItem('petInfo');
    if (storedPetInfo) {
      setPetInfo(JSON.parse(storedPetInfo));
    }
  }, []);

  const nameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (petInfo) {
      const newName = e.target.value;
      const updatedPetInfo = { ...petInfo, name: newName };
      setPetInfo(updatedPetInfo);
    }
  };

  const weightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (petInfo) {
      const value = e.target.value;
      const newWeight = value === '' ? undefined : parseInt(value.trim(), 10);
      const updatedPetInfo = { ...petInfo, weight: newWeight };
      setPetInfo(updatedPetInfo);
    }
  };

  const ageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (petInfo) {
      const value = e.target.value;
      const newAge = value === '' ? undefined : parseInt(value.trim(), 10);
      const updatedPetInfo = { ...petInfo, age: newAge };
      setPetInfo(updatedPetInfo);
    }
  };

  const neuteredChange = (value: string) => {
    if (petInfo) {
      const updatedPetInfo = { ...petInfo, neutering: value };
      setPetInfo(updatedPetInfo);
    }
  };

  const activenessChange = (value: string) => {
    if (petInfo) {
      const updatedPetInfo = { ...petInfo, activity: value };
      setPetInfo(updatedPetInfo);
    }
  };

  const handleBackButton = () => {
    const enrollPet = localStorage.getItem('enrollPet');
    if (enrollPet === 'false') {
      router.push('/input-data1/result');
    } else {
      router.push('/my-page');
    }
  }

  const handleSave = async () => {
    if (petInfo) {
      try {
        await petAPI.putPetInfo(petInfo.petId, petInfo);
        localStorage.setItem('petInfo', JSON.stringify(petInfo));
        console.log('정보가 성공적으로 수정되었습니다.');
        
        const enrollPet = localStorage.getItem('enrollPet');
        if (enrollPet === 'false') {
          router.push('/input-data1/result');
        } else {
          router.push('/my-page/pet-info/result');
        }
      } catch (error) {
        console.error('펫 정보 수정 실패', error);
        console.log('정보 수정에 실패했습니다.');
      }
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

  const buttonContent = (
    <>
      <span style={{ color: '#fff' }}>입력완료</span>
    </>
  );

  return (
    <PageWrapper>
      <MypageHeader>
        <BackIconWrapper onClick={handleBackButton}>
          <BackIcon src={backIcon} alt="go back" />
        </BackIconWrapper>
        반려견 정보 수정
      </MypageHeader>

      {petInfo && (
        <>
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
                checked={petInfo.activity === option.value}
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
                checked={petInfo.neutering === option.value}
                onChange={() => neuteredChange(option.value)}
              />
            ))}
          </ContentWrapper>

          <FixedButtonContainer>
            <GapButton
              onClick={handleSave}
              backgroundColor={(props) => props.theme.colors['grey10']}
              hoverBackgroundColor={(props) => props.theme.colors['grey10']}
              hoverButtonContentColor="#fff"
              buttonContent={buttonContent}
            />         
          </FixedButtonContainer>
        </>
      )}
    </PageWrapper>
  );
}

const PageWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MypageHeader = styled.h2`
  width: 100%;
  height: 3.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.theme.colors['grey11']};
`;

const BackIconWrapper = styled.div`
`;

const BackIcon = styled(Image)`
`;

const ContentWrapper = styled.div`
  width: 100%;
`;

const ContentHalfWrapper = styled.div`
  width: 50%;
`;

const RowContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const Title = styled.h2`
  color: ${(props) => props.theme.colors['grey11']};

`;

const FixedButtonContainer = styled.div`
  position: absolute;
  bottom: 2rem;
  width: 100%;
  display: flex;
  justify-content: center;
`;
