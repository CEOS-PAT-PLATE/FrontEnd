'use client';
import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Navbar from '@components/result/navbar';
import styled from 'styled-components';
import Wrapper from '@style/input-data2/Wrapper';

import { dailyMealsAPI } from '@api/dailyMealsAPI';

interface ResultProps {
  params: { petId: number; dailyMealId: number };
}

export default function Layout({
  children,
  params: { petId, dailyMealId },
}: {
  children: React.ReactNode;
  params: ResultProps['params'];
}) {
  const [deficientCount, setDeficientCount] = useState(0);
  const [excessCount, setExcessCount] = useState(0);
  const pathname = usePathname();

  console.log(petId, dailyMealId);

  const fetchData = async () => {
    try {
      const [excessNutrients, properNutrients, deficientNutrients] = await Promise.all([
        dailyMealsAPI.getExcessNutrients(petId, dailyMealId),
        dailyMealsAPI.getProperNutrients(petId, dailyMealId),
        dailyMealsAPI.getDeficientNutrients(petId, dailyMealId),
      ]);

      const deficientCount = deficientNutrients.data.data.length / 2; // 배열 길이를 2로 나눔
      const excessCount = excessNutrients.data.data.length;

      setDeficientCount(deficientCount);
      setExcessCount(excessCount);
      
      console.log('부족', deficientCount);
    } catch (error) {
    }
  };

  useEffect(() => {
    fetchData();
  }, [petId, dailyMealId, pathname]);

  console.log('답변', petId, dailyMealId);

  return (
    <Wrapper>
      <Title>분석 결과</Title>
      <Navbar deficientCount={deficientCount} excessCount={excessCount} params={{ petId, dailyMealId }} />
      <Content>{children}</Content>
    </Wrapper>
  );
}

const Content = styled.div`
  flex: 1;
  overflow-y: auto;
`;

const Title = styled.h1`
  font-family: SUIT;
  font-size: 18px;
  font-weight: 600;
  top: 44px;
  position: absolute;
  width: 360px;
  margin-bottom: 15px;
  left: 40%;
`;
