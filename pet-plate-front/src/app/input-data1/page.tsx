'use client'

import React, { useRef } from 'react';
import { useRouter } from 'next/navigation';
import { scrollIndexState, petInfoState } from '@lib/atoms';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import InputDataFirstHeader from '@components/input-data1/inputDataFirstHeader';
import ProgressBar from '@components/input-data1/progressbar';
import NextButton from '@components/input-data1/nextButton';
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


  //nextbutton 활성화 여부
  const isStepValid = () => {
    if (currentIndex === 0) {
      return petInfo.name.trim() !== '';
    } else if (currentIndex === 1) {
      return petInfo.age !== undefined && !isNaN(Number(petInfo.age));
    } else if (currentIndex === 2) {
      return petInfo.weight !== undefined && !isNaN(Number(petInfo.weight));
    } else if (currentIndex === 3) {
      return petInfo.activity !== undefined && petInfo.activity.trim() !== '';
    } else if (currentIndex === 4) {
      return petInfo.neutering !== undefined && petInfo.neutering.trim() !== '';
    }
    return true;
  };

  //헤더의 뒤로가기 누를 경우 스크롤 올라감
  //마지막 인덱스에서는 analyze-info로 다시 라우팅
  const handleScrollUp = () => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      const prevDiv = divRefs.current[prevIndex];

      if (prevDiv) {
        prevDiv.scrollIntoView({ behavior: 'smooth' });
        setCurrentIndex(prevIndex);
      }
    } else if (currentIndex === 0) {
      route.push('/main/analyze-info');
    }
  };


  //nextbutton 클릭시 스크롤 내려감
  //마지막 인덱스에서는 input-data2 이동전 알람 띄우기
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
        route.push('/input-data1/result');
      } else {
        // 유효성 검사 실패 시(사실상 쓰일 일 없음)
        alert("모든 답변을 완료하세요!");
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
      <ProgressBar />
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
          <NextButton onClick={handleScrollDown} disabled={!isStepValid()} />
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
