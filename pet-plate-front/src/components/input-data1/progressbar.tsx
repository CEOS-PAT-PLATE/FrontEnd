'use client'

import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { usePathname } from 'next/navigation';
import { scrollIndexState } from '@lib/atoms';
import styled from 'styled-components';

const ProgressBar = () => {
  const [currentIndex, setCurrentIndex] = useRecoilState(scrollIndexState);
  const pathname = usePathname();
  
  useEffect(() => {
    if (pathname === '/201') {
      setCurrentIndex(5);
    }
  }, [pathname, setCurrentIndex]);

  const totalSteps = 6; // 총 단계 수

  return (
    <ProgressContainer>
      {Array.from({ length: totalSteps }).map((_, index) => (
        <ProgressStep key={index} $filled={index <= currentIndex} />
      ))}
    </ProgressContainer>
  );
};

const ProgressContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 0.313rem;
  width: 100%;
  margin-bottom: 1.75rem;
`;

const ProgressStep = styled.div<{ $filled: boolean }>`
  width: 3rem;
  height: 0.25rem;
  border-radius: 1.25rem;
  background-color: ${({ $filled, theme }) => ($filled ? theme.colors.green : theme.colors['grey4'])};
  transition: background-color 0.3s;
`;

export default ProgressBar;
