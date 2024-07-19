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
        setPets(response.data.data); 
      } catch (error) {
        console.error('Failed to fetch pets', error);
      }
    };

    fetchPets();
  }, []);

  console.log(pets)

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
