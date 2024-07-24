'use client';
import LoadingSVGImage from '@public/svg/201_image.svg?url';
import Image from 'next/image';
import styled from 'styled-components';

export default function Page() {
  return (
    <Wrapper>
      <TextWrapper>
        <DateTitle>식단 추가 페이지를 로딩중이에요.</DateTitle>
        <DateTitle>잠시만 기다려 주세요!</DateTitle>
      </TextWrapper>
      <ImageWrapper>
        <Image src={LoadingSVGImage} width={280} height={260} alt="loading" />
      </ImageWrapper>
      <DescriptionWrapper>
        <Description>사료, 자연식, 포장간식으로 나눠 식단 기록을 시작해보아요.</Description>
      </DescriptionWrapper>
    </Wrapper>
  );
}

const DescriptionWrapper = styled.div`
  position: absolute;
  top: 549px;
  left: 25px;
`;

const ImageWrapper = styled.div`
  width: 300px;
  height: 230px;
  position: absolute;
  top: 247px;
  left: 15px;
`;

const GreenText = styled.span`
  color: var(--primary, #40c97f);
  font-weight: 700;
`;

const DateTitle = styled.div`

 


color: var(--grey11, #36393C);

/* header_bold_20pt */
font-family: SUIT;
font-size: 20px;
font-style: normal;
font-weight: 700;
line-height: 160%;
letter-spacing: -0.75px;
    `;

const Description = styled.div`
  color: var(--grey7, #959ca4);
  text-align: center;

  /* body3_regular_12pt */
  font-family: SUIT;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 160%; /* 19.2px */
`;

const TextWrapper = styled.div`
  position: absolute;
  top: 92px;
  left: 4px;
`;

const Wrapper = styled.div`
  width: 360px;
  height: 640px;
  position: absolute;

  top: -100px;
`;
