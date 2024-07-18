// app/recommend/layout.tsx
'use client';
import React from 'react';
import { usePathname } from 'next/navigation';
import Navbar from '@components/result/navbar';
import styled from 'styled-components';
import Wrapper from '@style/input-data2/Wrapper';

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
  const deficientCount = 5; // 실제 데이터로 대체 -> 흠 -> 넘겨받기 
  const excessCount = 3; // 실제 데이터로 대체

  console.log('답변', petId, dailyMealId);
  return (
    <Wrapper>
      <Title>분석 결과</Title>
      <Navbar deficientCount={deficientCount} excessCount={excessCount} params={{ petId, dailyMealId }} />
      <Content>{children}</Content>
      <div>{petId + dailyMealId}</div>
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
