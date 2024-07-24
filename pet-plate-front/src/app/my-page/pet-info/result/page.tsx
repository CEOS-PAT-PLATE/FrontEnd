'use client';

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import InputDataFirstHeader from '@components/input-data1/inputDataFirstHeader';
import Progressbar from '@components/input-data1/progressbar';
import LinkButton from "@components/main/linkBtn";
import ResultList from '@components/input-data1/resultList';
import { petAPI } from '@api/petAPI';
import ResultHeader from '@components/input-data1/resultHeader'

interface Pet {
  petId: number;
  name: string;
  age: number;
  weight: number;
  activity: string;
  neutering: string;
  profileImgPath: string | null;
}

export default function Page() {
  const buttonContent = (
    <><span style={{ color: "#fff" }}>수정완료</span></>
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

  const getActivityDescription = (activity: string) => {
    switch (activity) {
      case 'INACTIVE':
        return '차분';
      case 'SOMEWHAT_ACTIVE':
        return '보통';
      case 'ACTIVE':
        return '활발';
      case 'VERY_ACTIVE':
        return '초활발';
      default:
        return activity;
    }
  };

  const getNeuteringDescription = (neutering: string) => {
    switch (neutering) {
      case 'INTACT':
        return '중성화 안했어요';
      case 'NEUTERED':
        return '중성화 했어요';
      default:
        return neutering;
    }
  };

  return (
    <>
      <Header>반려견 정보 수정</Header>
      <PageContainer>
        {pets.length > 0 && (
          <React.Fragment key={pets[0].petId}>
             <ResultList title="반려견의 이름" value={pets[0]?.name} />
            <ResultList title="나이" value={`${pets[0]?.age}세`} />
            <ResultList title="몸무게" value={`${pets[0]?.weight}kg`} />
            <ResultList title="활동량" value={getActivityDescription(pets[0]?.activity)} />
            <ResultList title="중성화 여부" value={getNeuteringDescription(pets[0]?.neutering)} />
          </React.Fragment>
        )}
        <Text>반려견 정보 수정 탭에서 언제든지 바꿀 수 있어요</Text>

        <FixedButtonContainer>
          <LinkButton
            href="/my-page"
            backgroundcolor={(props) => props.theme.colors.green}
            hoverbackgroundcolor={(props) => props.theme.colors.green}
            hoverbuttoncontentcolor="#fff"
            buttonContent={buttonContent}
          />
        </FixedButtonContainer>
      </PageContainer>
    </>
  );
}

const Header = styled.div`
  width: 100%;
  height: 3.25rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5.188rem;
  margin-bottom: 1rem;
  font-size: 1rem;
  font-weight: 400;
  margin-left: 7.938rem;
`;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  height: 42rem;
  overflow: hidden;
`;

const FixedButtonContainer = styled.div`
  position: absolute;
  bottom: 2rem;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Text = styled.div`
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 160%;
  color: ${(props) => props.theme.colors['grey6']};
`;
