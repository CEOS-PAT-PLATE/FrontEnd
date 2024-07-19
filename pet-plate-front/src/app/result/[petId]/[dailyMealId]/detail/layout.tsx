'use client';
import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Navbar from '@components/result/navbar';
import styled from 'styled-components';
import Wrapper from '@style/input-data2/Wrapper';
import { useRouter } from 'next/navigation';

import { dailyMealsAPI } from '@api/dailyMealsAPI';
import { useRecoilState } from 'recoil';
import CancelButton from '@public/svg/cancel-button.svg?url';
import Image from 'next/image';

import { isModalVisibleState, selectedSupplementState } from '@recoil/nutrientAtoms';
import { Router } from 'next/router';



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
  const [deficientCount, setDeficientCount] = useState(0);
  const [excessCount, setExcessCount] = useState(0);
  const pathname = usePathname();
  const [selectedSupplement] = useRecoilState(selectedSupplementState);
  const router = useRouter();



  const getPetIdFromLocalStorage = () => {
    if (typeof window === 'undefined') return null;
    const petInfoString = localStorage.getItem('petInfo');
    console.log('petInfoString:', petInfoString);
    if (!petInfoString) {
      console.error('No petInfo found in localStorage');
      return null;
    }
    try {
      const petInfo = JSON.parse(petInfoString);
      return petInfo.petId;
    } catch (error) {
      console.error('Error parsing petInfo from localStorage', error);
      return null;
    }
  };

  console.log(petId, dailyMealId);

  const fetchData = async () => {
    try {
      const [excessNutrients, properNutrients, deficientNutrients] = await Promise.all([
        dailyMealsAPI.getExcessNutrients(petId, dailyMealId),
        dailyMealsAPI.getProperNutrients(petId, dailyMealId),
        dailyMealsAPI.getDeficientNutrients(petId, dailyMealId),
      ]);

      const deficientCount = deficientNutrients.data.data.length / 2; // 배열 길이를 2로 나눔
      const excessCount = excessNutrients.data.data.length;

      setDeficientCount(deficientCount);
      setExcessCount(excessCount);

      console.log('부족', deficientCount);
    } catch (error) {}
  };

  useEffect(() => {
    const petId = getPetIdFromLocalStorage();
    fetchData();
  }, [petId, dailyMealId, pathname]);

  console.log('답변', petId, dailyMealId);

  return (
    <Wrapper>
      <Title>영양소 상세</Title>
      <InfoCardWrapper>
      <NaturalInfoCardImage>
      오늘 {petId}이 먹은 영양소는 총 240kcal로,
섭취량이 조금 부족한 수준이에요.
        </NaturalInfoCardImage>
        <SupplementInfo>
          <Name>과잉 영양소 :</Name>
          <Name>부족 영양소 :</Name>
          <Name>적정 영양소 :</Name>
          <Vendor>* 보다 자세한 설명은 ‘추천 영양성분’에서 확인해주세요.</Vendor>
          <AlignCenter>
          <EnglishName>{selectedSupplement.supplement?.englishName}</EnglishName>
          </AlignCenter>
        </SupplementInfo>
        <CancelButtonImage src={CancelButton} alt="닫기 버튼" onClick={()=>{ router.push(`/result/${petId}/${dailyMealId}`);
}}  />
      </InfoCardWrapper>
      <Content>{children}</Content>
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

const AlignCenter = styled.div`
    display: flex;
   flex-direction:row;
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

  color: var(--grey11, #36393C);

/* body2_regular_14pt */
font-family: SUIT;
font-size: 14px;
font-style: normal;
font-weight: 400;
line-height: 160%; /* 22.4px */
top:18px;
display: flex;
width: 278px;
height: 154px;
border-radius: 8px;


;
`;

const CancelButtonImage = styled(Image)`
  width: 24px;
  height: 24px;
  cursor: pointer;
 position: absolute;
    top:-82px;
    left: 90%;



`;

const InfoCardWrapper = styled.div`
display: flex;

align-items: center;
align-content: space-around;
justify-content:center;
gap: 8px;
flex-wrap: wrap;
border-radius: 8px;
background: var(--white, #FFF);

/* shadow_popup,carousel */
box-shadow: 2px 2px 15px 0px rgba(149, 156, 164, 0.20);;
position: relative;
  width: 312px;
  height: 217px;
 
  margin-top: 100px;
  z-index: 1;
  top: 30px;
  left:23px;
`;

const SupplementInfo = styled.div`
  position: absolute;
    top: 96px;
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
margin-top:16px;
text-align: left;
/* body2_regular_14pt */
color: var(--grey8, #7C8389);
text-align: center;

/* body3_regular_12pt */
font-family: SUIT;
font-size: 12px;
font-style: normal;
font-weight: 400;
line-height: 160%; /* 19.2px */


`;

const Name = styled.div`
color: var(--grey11, #36393C);

/* body2_regular_14pt */
font-family: SUIT;
font-size: 14px;
font-style: normal;
font-weight: 400;
line-height: 160%; /* 22.4px */
font-weight: 700;
line-height: 160%; /* 25.6px */

`;

const EnglishName = styled.div`
  font-size: 14px;
  text-align: left;
  max-width: 200px;


`;

const EnglishNameTag = styled.div`
  color: var(--grey8, #7C8389);
font-family: SUIT;
font-size: 12.036px;
font-style: normal;
font-weight: 400;
line-height: 160%; /* 19.258px */
margin-top: 20px;
margin-bottom: 20px;
margin-right: 13.24px;

`;

const NutrientTag = styled.div`
display: flex;
padding: 4px 8px;
justify-content: center;
align-items: center;
gap: 10px;
  border-radius: 100px;
background: var(--100, #D9F4E5);
max-width: 96px;
color: var(--600, #33A165);

/* body3_semibold_12pt */
font-family: SUIT;
font-size: 12px;
font-style: normal;
font-weight: 600;
line-height: 160%; /* 19.2px */
    `;
