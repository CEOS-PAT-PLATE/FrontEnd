'use client';
import LoadingSVGImage from '@public/svg/analyze-loading-img.svg?url';
import Image from 'next/image';
import Wrapper from '@style/input-data2/Wrapper';
import styled from 'styled-components';

export default function Page() {
  return (
    <Wrapper>
      <TextWrapper>
        <DateTitle>
          <GreenText>식단 추가</GreenText>화면으로 이동중이에요.
        </DateTitle>
        <DateTitle>잠시만 기다려 주세요!</DateTitle>
      </TextWrapper>
      <ImageWrapper>
        <Image src={LoadingSVGImage} width={300} height={330} alt="loading" />
      </ImageWrapper>
      <DescriptionWrapper>
        <Description>펫플레이트는 질병 치료 목적의 서비스가 아닌,</Description>
        <Description>반려견 건강 관리를 위한 보조적인 수단입니다.</Description>
        <Description>질병이 있는 경우 반드시 수의사와 상담하시기 바랍니다.</Description>
      </DescriptionWrapper>
    </Wrapper>
  );
}

const DescriptionWrapper = styled.div`
  position: absolute;
  top: 649px;
  left: 50px;
`;

const ImageWrapper = styled.div`
  width: 300px;
  height: 330px;
  position: absolute;
  top: 247px;
  margin: auto 30px;
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
  left: 24px;
`;
