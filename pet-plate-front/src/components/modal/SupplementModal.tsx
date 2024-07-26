'use client';

import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { isModalVisibleState, selectedSupplementState, supplementModalClickedState } from '@recoil/nutrientAtoms';
import CancelButton from '@public/svg/cancel-button.svg?url';
import Image from 'next/image';
import { use } from 'react';
import { useEffect, useState } from 'react';
import { nutrientAPI } from '@api/nutrientAPI';

interface Product {
  id: number;
  name: string;
  englishName: string;
  vendor: string;
  drugImgPath: string;
  url: string;
  nutrientsName: string[];
  drugUsefulPartsName: string[];
}

export default function SupplementModal() {
  const [isVisible, setIsVisible] = useRecoilState(isModalVisibleState);
  const [selectedSupplement] = useRecoilState(selectedSupplementState);

  const [isModalClicked, setIsModalClicked] = useRecoilState(supplementModalClickedState);

  const [supplementData, setSupplementData] = useState<Product>();
  const handleCancelClick = () => {
    setIsVisible(false);
    setIsModalClicked(false);
  };

  const fetchSupplement = async () => {
    const response = await nutrientAPI.getRecommendedSupplement(selectedSupplement);
    setSupplementData(response.data.data);
  };

  useEffect(() => {
    if (selectedSupplement) {
      fetchSupplement();
    }
  }, [isVisible]);

  if (!isVisible || !selectedSupplement) return null;

  return (
    <FullNoticeContainer>
      <InfoCardWrapper>
        <NaturalInfoCardImage>
          <img src={supplementData?.drugImgPath} width={120} height={120} alt="영양제 정보" />
        </NaturalInfoCardImage>
        <SupplementInfo>
          <Vendor>{supplementData?.vendor}</Vendor>
          <Name>{supplementData?.name}</Name>
          <TagWrapper>
            {supplementData?.nutrientsName.map((nutrient) => <NutrientTag>{nutrient}</NutrientTag>)}
          </TagWrapper>
          <TagWrapper>
            {supplementData?.drugUsefulPartsName.map((symptom) => <SymptomTag>{symptom}</SymptomTag>)}
          </TagWrapper>
          <AlignCenter>
          <EnglishNameWrapper>
            <EnglishNameTag>영문명</EnglishNameTag>
            <EnglishName>{supplementData?.englishName}</EnglishName>
            </EnglishNameWrapper>
          </AlignCenter>
          <AlignCenter>
            <EnglishNameWrapper>
            <EnglishNameTag>구매처</EnglishNameTag>
            <EnglishNameLink href={supplementData?.url} target="_blank" rel="noopener noreferrer">
              {supplementData?.url}</EnglishNameLink>
            </EnglishNameWrapper>
          </AlignCenter>
        </SupplementInfo>
        <CancelButtonImage src={CancelButton} alt="닫기 버튼" onClick={handleCancelClick} />
      </InfoCardWrapper>
    </FullNoticeContainer>
  );
}

const AlignCenter = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const FullNoticeContainer = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;

  width: 100%;
  height: 800px;
  backdrop-filter: blur(4px); /* 배경 블러 처리 */
  background: rgba(75, 147, 125, 0.3); /* 투명도 80% 적용 */
  color: var(--white, #fff);
  font-size: 14px;
  font-weight: 600;
  text-align: center;
  z-index: 1000;
  
`;

const NaturalInfoCardImage = styled.div`
  position: absolute;

  display: flex;
  width: 272px;
  height: 156px;
  padding: 0px 80px;
  align-items: center;
  border-radius: 8px;
  top: 16px;
  background: var(--white, #fff);

  /* shadow_popup,carousel */
  box-shadow: 2px 2px 15px 0px rgba(149, 156, 164, 0.2);
`;

const CancelButtonImage = styled(Image)`
  width: 24px;
  height: 24px;
  cursor: pointer;
  position: absolute;
  top: -144px;
  left: 90%;
`;

const InfoCardWrapper = styled.div`
  min-height: 431px; 
  max-height: 490px;

  position: relative;
  display: flex;
  width: 312px;
  align-items: center;
  justify-content: center;
  gap: 8px;
  flex-wrap: wrap;
  border-radius: 16px;
  background: var(--grey1, #fafafc);
  box-shadow: 2px 2px 15px 0px rgba(153, 159, 165, 0.2);
  margin-top: 100px;
  z-index: 1;
  top: 90px;
  box-sizing: border-box; /* padding 을 길이 계산에 포함 */
`;


const SupplementInfo = styled.div`
  position: absolute;
  top: 188px;

  color: var(--grey11, #36393c);
  font-family: SUIT;
  font-size: 14px;
  font-weight: 400;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 16px;
  margin-right: 16px;
`;

const Vendor = styled.div`
  color: var(--grey7, #959ca4);
  text-align: left;
  /* body2_regular_14pt */
  font-family: SUIT;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 160%; /* 22.4px */
`;

const Name = styled.div`
  color: var(--grey11, #36393c);
  text-align: left;
  /* title2_bold_16pt */
  font-family: SUIT variable;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 160%; /* 25.6px */
  margin-bottom: 16px;
`;

const EnglishNameWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
`;

const EnglishName = styled.div`
  font-size: 14px;
  text-align: left;
  max-width: 200px;
  margin-bottom: 8px;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* 보여줄 줄 수 */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-top: 0px;
  padding-right: 10px;
  word-wrap: break-word; /* 단어를 자르지말고, wrap함 width 넘으면 */
  color: var(--grey11, #36393C);
font-family: SUIT;
font-size: 14.444px;
font-style: normal;
font-weight: 400;
line-height: 140%; /* 20.221px */
`;

const EnglishNameLink = styled.a`
  font-size: 14px;
  text-align: left;
  max-width: 200px;
  margin-bottom: 8px;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* 보여줄 줄 수 */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-top: 0px;
  padding-right: 10px;
  word-wrap: break-word; /* 단어를 자르지말고, wrap함 width 넘으면 */
  color: var(--grey11, #36393C);
font-family: SUIT;
font-size: 14.444px;
font-style: normal;
font-weight: 400;
line-height: 140%; /* 20.221px */

text-decoration: none; 
  cursor: pointer;

  &:hover {
    text-decoration: underline; 
  }
`;

const EnglishNameTag = styled.div`
  color: var(--grey8, #7c8389);
  font-family: SUIT;
  font-size: 12.036px;
  font-style: normal;
  font-weight: 400;
  line-height: 160%; /* 19.258px */
  margin-right: 13.24px;
`;

const TagWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 7px;
  max-width: 272px;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin-bottom: 20px;

`;

const NutrientTag = styled.div`
  display: flex;
  padding: 4px 8px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 100px;
  background: var(--100, #d9f4e5);
  max-width: 96px;
  color: var(--600, #33a165);

  /* body3_semibold_12pt */
  font-family: SUIT;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: 160%; /* 19.2px */
`;

const SymptomTag = styled.div`
  display: flex;
  padding: 4px 8px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 100px;
  border: 1px solid var(--primary, #40c97f);
  height: 27px;
  max-height: 27px;
  color: var(--primary, #40c97f);

  /* body3_semibold_12pt */
  font-family: SUIT;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: 160%; /* 19.2px */
`;
