'use client'

import React, { useRef } from 'react';
import { useRouter } from 'next/navigation'
import { scrollIndexState, petInfoState } from '@lib/atoms';
import { useRecoilState } from 'recoil';
import styled from "styled-components"
import InputDataFirstHeader from "@components/input-data1/inputDataFirstHeader"
import Progressbar from "@components/input-data1/progressbar"
import NextButton from "@components/input-data1/nextButton"
import AgeContent from '@components/input-data1/pageContents/ageContent';
import NameContent from '@components/input-data1/pageContents/nameContent';
import WeightContent from '@components/input-data1/pageContents/weightContent';
import ActivenessContent from '@components/input-data1/pageContents/activenessContent';
import NeuteringSurgeryContent from '@components/input-data1/pageContents/neuteringSurgeryContent';

export default function Page() {
  const divRefs = useRef<HTMLDivElement[]>([]);
  const [currentIndex, setCurrentIndex] = useRecoilState(scrollIndexState);
  const [petInfo] = useRecoilState(petInfoState);
  const route = useRouter();

  const handleScrollUp = () => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      const prevDiv = divRefs.current[prevIndex];

      if (prevDiv) {
        prevDiv.scrollIntoView({ behavior: 'smooth' });
        setCurrentIndex(prevIndex);
      }
    }
  };

  const handleScrollDown = () => {
      if (currentIndex < divRefs.current.length - 1) {
        const nextIndex = currentIndex + 1;
        const nextDiv = divRefs.current[nextIndex];
             
        if (nextDiv) {
          nextDiv.scrollIntoView({ behavior: 'smooth' });
          setCurrentIndex(nextIndex);
        }
      } else if (currentIndex === divRefs.current.length - 1) {
        // 마지막 페이지에서 한 번 더 버튼을 클릭할 경우
        if (
          petInfo.name.trim() !== '' &&
          petInfo.age !== undefined && !isNaN(Number(petInfo.age)) &&
          petInfo.weight !== undefined && !isNaN(Number(petInfo.weight))
        ) {
          // 유효성 검사 통과 시 
          route.push('/input-data1/alert');
        } else {
          // 유효성 검사 실패 시
          alert("모든 답변을 완료하세요!")
        }
      }
    };
  

  const contentComponents = [
    <NameContent />,
    <AgeContent />,
    <WeightContent />,
    <ActivenessContent />,
    <NeuteringSurgeryContent />
  ];

  return (
    <>
      <InputDataFirstHeader onClickBackButton={handleScrollUp} />
      <Progressbar />
      <PageContainer>
        <ScrollableContainer>
          {contentComponents.map((ContentComponent, index) => (
            <ScrollableDiv
              key={index}
              ref={(el) => {
                if (el && !divRefs.current.includes(el)) {
                  divRefs.current[index] = el;
                }
              }}
            >
              {ContentComponent}
            </ScrollableDiv>
          ))}
        </ScrollableContainer>

        <FixedButtonContainer>
          <NextButton onClick={handleScrollDown} />
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
