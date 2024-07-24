'use client';

import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import Progressbar from '@components/input-data1/progressbar';
import LinkButton from "@components/main/linkBtn";
import ResultList from '@components/input-data1/resultList';
import { petAPI } from '@api/petAPI';
import ResultHeader from '@components/input-data1/resultHeader';
import Image from "next/image";
import alertTip from "@public/svg/alert-result-tip.svg?url";

interface Pet {
  petId: number;
  name: string;
  age: number;
  weight: number;
  activity: string;
  neutering: string;
  profileImgPath: string | null;
}

// Bounce 애니메이션 정의
const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-30px);
  }
  60% {
    transform: translateY(-15px);
  }
`;

export default function Page() {
  const buttonContent = (
    <><span style={{ color: "#fff" }}>다음으로</span></>
  );

  const changeButtonContent = (
    <><span style={{ color: "#fff" }}>수정하기</span></>
  );

  const [pets, setPets] = useState<Pet[]>([]);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await petAPI.getAllPetsInfo();
        const petData = response.data.data;
        setPets(petData);

        if (petData.length > 0) {
          const petInfo = petData[0];
          localStorage.setItem('petInfo', JSON.stringify(petInfo));

          // 서버에 petInfo를 저장하는 요청
          fetch('/api', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ petInfo }),
          })
            .then((response) => response.json())
            .then((data) => {
              console.log('펫 정보 서버에 저장', data);
            })
            .catch((error) => {
              console.error('펫 정보 서버 저장 실패', error);
            });
        }
      } catch (error) {
        console.error('펫 정보 조회 실패', error);
      }
    };

    fetchPets();
  }, []);

  const activityDescriptions: { [key: string]: string } = {
    INACTIVE: '차분',
    SOMEWHAT_ACTIVE: '보통',
    ACTIVE: '활발',
    VERY_ACTIVE: '초활발',
  };
  
  const neuteringDescriptions: { [key: string]: string } = {
    INTACT: '중성화 안했어요',
    NEUTERED: '중성화 했어요',
  };
  
  const getActivityDescription = (activity: string) => {
    return activityDescriptions[activity] || activity;
  };
  
  const getNeuteringDescription = (neutering: string) => {
    return neuteringDescriptions[neutering] || neutering;
  };
  
  return (
    <>
      <ResultHeader />
      <Progressbar />
      <PageContainer>
        <Info>정보를 다시 한번 확인해주세요</Info>
        {pets.length > 0 && (
          <React.Fragment key={pets[0]?.petId}>
            <ResultList title="반려견의 이름" value={pets[0]?.name} />
            <ResultList title="나이" value={`${pets[0]?.age}세`} />
            <ResultList title="몸무게" value={`${pets[0]?.weight}kg`} />
            <ResultList title="활동량" value={getActivityDescription(pets[0]?.activity)} />
            <ResultList title="중성화 여부" value={getNeuteringDescription(pets[0]?.neutering)} />
          </React.Fragment>
        )}
        <Text>반려견 정보 수정 탭에서 언제든지 바꿀 수 있어요</Text>

        <FixedButtonContainer>
          <AlertTip src={alertTip} alt="tip" />
          <LinkButton
            href="/my-page/pet-info"
            backgroundcolor={(props) => props.theme.colors.green}
            hoverbackgroundcolor={(props) => props.theme.colors.green}
            hoverbuttoncontentcolor="#fff"
            buttonContent={changeButtonContent}
          />
          <LinkButton
            href="/input-data1/alert-final"
            backgroundcolor={(props) => props.theme.colors['grey10']}
            hoverbackgroundcolor={(props) => props.theme.colors['grey10']}
            hoverbuttoncontentcolor="#fff"
            buttonContent={buttonContent}
          />
        </FixedButtonContainer>
      </PageContainer>
    </>
  );
}

const Info = styled.div`
  width: 312px;
  font-size: 1.25rem;
  font-weight: 600;
  line-height: 160%;
  color: ${(props) => props.theme.colors['grey11']};
  margin-bottom: 1.438rem;
`;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  height: 42rem;
  width: 100%;
  overflow: hidden;
`;

const AlertTip = styled(Image)`
  animation: ${bounce} 2s ease infinite;
`;

const FixedButtonContainer = styled.div`
  position: absolute;
  bottom: 2rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

const Text = styled.div`
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 160%;
  color: ${(props) => props.theme.colors['grey6']}
`;
