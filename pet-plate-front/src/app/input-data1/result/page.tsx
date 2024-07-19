'use client';

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import InputDataFirstHeader from '@components/input-data1/inputDataFirstHeader';
import Progressbar from '@components/input-data1/progressbar';
import NextButton from '@components/input-data1/nextButton';
import ResultList from '@components/input-data1/resultList';
import { petAPI } from '@api/petAPI';

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

  console.log(pets);

  const navigate = () => {};

  const handleAlert = () => {};

  return (
    <>
      <InputDataFirstHeader onClickBackButton={navigate} />
      <Progressbar />
      <PageContainer>
        <React.Fragment key={pets[0]?.petId}>
          <ResultList title="반려견의 이름" value={pets[0]?.name} />
          <ResultList title="나이" value={`${pets[0]?.age}세`} />
          <ResultList title="몸무게" value={`${pets[0]?.weight}kg`} />
          <ResultList title="활동량" value={pets[0]?.activity} />
          <ResultList title="중성화 여부" value={pets[0]?.neutering} />
        </React.Fragment>

        <FixedButtonContainer>
          <NextButton onClick={handleAlert} />
        </FixedButtonContainer>
      </PageContainer>
    </>
  );
}

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
