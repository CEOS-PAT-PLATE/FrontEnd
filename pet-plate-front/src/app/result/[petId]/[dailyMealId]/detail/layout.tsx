'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Navbar from '@components/result/navbar';
import styled from 'styled-components';
import Wrapper from '@style/input-data2/Wrapper';
import { useRouter } from 'next/navigation';
import { dailyMealsAPI } from '@api/dailyMealsAPI';
import CancelButton from '@public/svg/cancel-button.svg?url';
import Image from 'next/image';

interface ResultProps {
  params: { petId: number; dailyMealId: number };
}

const getNutrientDataFromLocalStorage = (petId:number, dailyMealId:number) => {
    const key = `${petId}-${dailyMealId}`;
    const nutrientDataString = localStorage.getItem(key);
    if (nutrientDataString) {
      try {
        return JSON.parse(nutrientDataString);
      } catch (error) {
        console.error('Error parsing nutrient data from local storage', error);
      }
    }
    return null;
  };
  

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
  const [nutrientData, setNutrientData] = useState(null);
  const router = useRouter();

  const getPetIdFromLocalStorage = () => {
    if (typeof window === 'undefined') return null;
    const petInfoString = localStorage.getItem('petInfo');
    if (!petInfoString) {
      console.error('No petInfo found in localStorage');
      return null;
    }
    try {
      const petInfo = JSON.parse(petInfoString);
      return petInfo.petId;
    } catch (error) {
      console.error('', error);
      return null;
    }
  };

  const fetchData = async () => {
    try {
      const [excessNutrients, properNutrients, deficientNutrients] = await Promise.all([
        dailyMealsAPI.getExcessNutrients(petId, dailyMealId),
        dailyMealsAPI.getProperNutrients(petId, dailyMealId),
        dailyMealsAPI.getDeficientNutrients(petId, dailyMealId),
      ]);

      const deficientCount = deficientNutrients.data.data.length / 2;
      const excessCount = excessNutrients.data.data.length/2;

      setDeficientCount(deficientCount);
      setExcessCount(excessCount);

    } catch (error) {
      console.error('오류', error);
    }
  };

  useEffect(() => {
    const initialize = async () => {
      const nutrientData = getNutrientDataFromLocalStorage(petId, dailyMealId);
      if (!nutrientData) {
        await fetchData();
      } else {
        setNutrientData(nutrientData);
      }
    };

    initialize();
  }, [petId, dailyMealId, pathname]);

  const petIdFromStorage = getPetIdFromLocalStorage();

  return (
    <Wrapper>
      <Title>영양소 상세</Title>
      <InfoCardWrapper>
        <NaturalInfoCardImage>
          오늘 먹은 영양소는 총 {nutrientData?.todayKcal}kcal로, 섭취량이 조금 부족한 수준이에요.
        </NaturalInfoCardImage>
        <SupplementInfo>
          <Name>과잉 영양소 : <Color1>{nutrientData?.excessNutrients?.map(nutrient=> nutrient).join(', ')}</Color1></Name>
          <Name>부족 영양소 : <Color1> {nutrientData?.deficientNutrients?.map(nutrient=> nutrient).join(', ')}</Color1></Name>
          <Name>적정 영양소 : <Color2>{nutrientData?.properNutrients?.map(nutrient => nutrient).join(', ')}</Color2></Name>
          <Vendor>* 보다 자세한 설명은 ‘추천 영양성분’에서 확인해주세요.</Vendor>
        </SupplementInfo>
        <CancelButtonImage src={CancelButton} alt="닫기 버튼" onClick={() => router.push(`/result/${petId}/${dailyMealId}`)} />
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

const InfoCardWrapper = styled.div`
  display: flex;
  align-items: center;
  align-content: space-around;
  justify-content: center;
  gap: 8px;
  flex-wrap: wrap;
  border-radius: 8px;
  background: var(--white, #FFF);
  box-shadow: 2px 2px 15px 0px rgba(149, 156, 164, 0.20);
  position: relative;
  width: 312px;
  height: 217px;
  margin-top: 100px;
  z-index: 1;
  top: 30px;
  left: 23px;
`;

const NaturalInfoCardImage = styled.div`
  position: absolute;
  color: var(--grey11, #36393C);
  font-family: SUIT;
  font-size: 14px;
  font-weight: 400;
  line-height: 160%;
  top: 18px;
  display: flex;
  width: 278px;
  height: 154px;
  border-radius: 8px;
`;

const CancelButtonImage = styled(Image)`
  width: 24px;
  height: 24px;
  cursor: pointer;
  position: absolute;
  top: -82px;
  left: 90%;
`;

const SupplementInfo = styled.div`
  position: absolute;
  top: 90px;
  color: var(--grey11, #36393c);
  font-family: SUIT;
  font-size: 12px;
  font-weight: 400;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 16px;
  margin-right: 16px;
`;

const Vendor = styled.div`
  margin-top: 16px;
  text-align: left;
  color: var(--grey8, #7C8389);
  font-family: SUIT;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 160%;
`;

const Name = styled.div`
  color: var(--grey11, #36393C);
  font-family: SUIT;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 160%;
  font-weight: 700;
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
  line-height: 160%;
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
  font-family: SUIT;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: 160%;
`;


const Color1= styled.span`
   color: var(--symentic-red-500, #FF4D46);

/* body2_semibold_14pt */
font-family: SUIT middle;

    `;

    const Color2= styled.span`
color: var(--primary, #40C97F);

/* body2_semibold_14pt */
font-family: SUIT middle;

    `;