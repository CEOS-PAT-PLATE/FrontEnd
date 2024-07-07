'use client'
import React, { useRef, useState } from 'react';
import styled from "styled-components"
import NextButton from "@components/input-data1/nextButton"

export default function Page() {
  const divRefs = useRef<HTMLDivElement[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

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
        {[...Array(5)].map((_, index) => (
          <ScrollableDiv
            key={index}
            ref={(el) => {
              if (el && !divRefs.current.includes(el)) {
                divRefs.current[index] = el;
              }
            }}
          >
            This is div number {index + 1}
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
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const ScrollableDiv = styled.div`
  width: 100%;
  height: 42rem;
  background-color: lightblue;
`;

const FixedButtonContainer = styled.div`
  position: absolute;
  bottom: 2rem;
  width: 100%;
  display: flex;
  justify-content: center;
`;