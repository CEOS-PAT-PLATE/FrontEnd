'use client'
import React, { useRef, useState } from 'react';
import styled from "styled-components"
import NextButton from "@components/input-data1/nextButton"
import ageContent from '@components/input-data1/pageContents/ageContent';
import nameContent from '@components/input-data1/pageContents/nameContent';
import weightContent from '@components/input-data1/pageContents/weightContent';
import activenessContent from '@components/input-data1/pageContents/activenessContent';
import neuteringSurgeryContent from '@components/input-data1/pageContents/neuteringSurgeryContent';

export default function Page() {
  const divRefs = useRef<HTMLDivElement[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const contentLists = [nameContent, ageContent, weightContent, activenessContent, neuteringSurgeryContent];

  const handleScroll = () => {
    if (currentIndex < divRefs.current.length - 1) {
      const nextIndex = currentIndex + 1;
      const nextDiv = divRefs.current[nextIndex];
      
      if (nextDiv) {
        nextDiv.scrollIntoView({ behavior: 'smooth' });
        setCurrentIndex(nextIndex);
      }
    }
  };

  return (
    <PageContainer>
      <ScrollableContainer>
        {contentLists.map((ContentComponent, index) => (
            <ScrollableDiv
              key={index}
              ref={(el) => {
                if (el && !divRefs.current.includes(el)) {
                  divRefs.current[index] = el;
                }
              }}
            >
              <ContentComponent />
            </ScrollableDiv>
          ))}
      </ScrollableContainer>

      <FixedButtonContainer>
        <NextButton onClick={handleScroll} />
      </FixedButtonContainer>
    </PageContainer>
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

const ScrollableContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: hidden; /* 휠 스크롤 비활성화 */
  overscroll-behavior-y: none; /* 터치 기반 스크롤 비활성화 */
`;

const ScrollableDiv = styled.div`
  width: 100%;
  height: 42rem;
`;

const FixedButtonContainer = styled.div`
  position: absolute;
  bottom: 2rem;
  width: 100%;
  display: flex;
  justify-content: center;
`;