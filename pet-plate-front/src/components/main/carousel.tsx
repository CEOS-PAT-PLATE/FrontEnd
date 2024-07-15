'use client'

import React, { useState, useEffect } from "react"
import styled from "styled-components"
import Image from "next/image"
import analyze1 from "@public/svg/analyze-graphic1.svg?url"
import analyze2 from "@public/svg/analyze-graphic2.svg?url"
import analyze3 from "@public/svg/analyze-graphic3.svg?url"

interface CarouselItem {
  title1: string,
  title2: string,
  graphicUrl: string
}

const carouselItems: CarouselItem[] = [
  {
    title1: "우리 아이를 위한 10분",
    title2: "영양분석하기!",
    graphicUrl: analyze1
  },
  {
    title1: "영양 분석을 통해 영양 부족",
    title2: "과잉을 확인해요.",
    graphicUrl: analyze2
  },
  {
    title1: "우리 아이의 영양 분석 결과를 바탕으로",
    title2: "영양제를 추천받을 수 있어요!",
    graphicUrl: analyze3
  }
]

export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselItems.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <CarouselContainer>
      <CarouselTrack currentIndex={currentIndex}>
        {carouselItems.map((item, index) => (
          <CarouselItemWrapper key={index}>
            <Title>{item.title1}<br/>{item.title2}</Title>
            <GraphicWrapper>
              <Graphic src={item.graphicUrl} alt={`graphic-${index}`} />
            </GraphicWrapper>
          </CarouselItemWrapper>
        ))}
      </CarouselTrack>
      <Indicators>
        {carouselItems.map((_, index) => (
          <Indicator key={index} isActive={index === currentIndex} />
        ))}
      </Indicators>
    </CarouselContainer>
  )
}

const CarouselContainer = styled.div`
  width: 22.5rem;
  overflow: hidden;
  position: relative;
`

const CarouselTrack = styled.div<{ currentIndex: number }>`
  display: flex;
  transition: transform 0.5s ease-in-out;
  transform: ${({ currentIndex }) => `translateX(-${currentIndex * 100}%)`};
`

const CarouselItemWrapper = styled.div`
  width: 22.5rem;
  flex: 0 0 auto;
  padding: 0 1.75rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const GraphicWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 2.269rem;
`

const Graphic = styled(Image)``

const Title = styled.h1`
  width: 100%;
  color: ${(props) => props.theme.colors.grey11};
`

const Indicators = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 2.599rem;
`

const Indicator = styled.div<{ isActive: boolean }>`
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background-color: ${({ isActive, theme }) => isActive ? theme.colors.green : theme.colors.grey3};
`
