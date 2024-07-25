'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import { dailyMealsAPI } from '@api/dailyMealsAPI';
import Image from 'next/image';
import BackButton from '@public/svg/back-button.svg?url';


import LineChart from '@components/result/line-charts';

interface ResultProps {
  params: { petId: number; dailyMealId: number };
}

interface Nutrient {
  name: string;
  unit: string;
  description: string;
  amount: number;
  properAmount: number;
  maximumAmount: number;
  maximumAmountRatioPerProperAmount: number;
  amountRatioPerProperAmount: number;
  amountRatioPerMaximumAmount: number;
}

interface NutrientData {
  todayKcal: number;
  excessNutrients: string[];
  deficientNutrients: string[];
  properNutrients: string[];
  todayNutrients: Nutrient[];
}

const getDetailNutrientDataFromLocalStorage = (petId: number, dailyMealId: number): Nutrient[] | null => {
  const key = `selected-nutrient-${petId}-${dailyMealId}`;
  const nutrientDataString = localStorage.getItem(key);
  if (nutrientDataString) {
    try {
      return JSON.parse(nutrientDataString);
    } catch (error) {
      console.error('디테일 오류', error);
    }
  }
  return null;
};

const getNutrientDataFromLocalStorage = (petId: number, dailyMealId: number): NutrientData | null => {
  const key = `${petId}-${dailyMealId}`;
  const nutrientDataString = localStorage.getItem(key);
  if (nutrientDataString) {
    try {
      return JSON.parse(nutrientDataString);
    } catch (error) {
      console.error('', error);
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
  const [nutrientData, setNutrientData] = useState<NutrientData | null>(null);
  const [nutrientDetailData, setNutrientDetailData] = useState<Nutrient[] | null>(null);

  const router = useRouter();

  const getPetIdFromLocalStorage = (): number | null => {
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
      const excessCount = excessNutrients.data.data.length / 2;

      setDeficientCount(deficientCount);
      setExcessCount(excessCount);
    } catch (error) {
      console.error('오류', error);
    }
  };

  useEffect(() => {
    const initialize = async () => {
      const nutrientData = getNutrientDataFromLocalStorage(petId, dailyMealId);
      const nutrientDetailData = getDetailNutrientDataFromLocalStorage(petId, dailyMealId);

      if (!nutrientData) {
        await fetchData();
      } else {
        setNutrientData(nutrientData);
        setNutrientDetailData(nutrientDetailData);
      }
    };

    initialize();
  }, [petId, dailyMealId, pathname]);

  const petIdFromStorage = getPetIdFromLocalStorage();

  const mainNutrients =
    nutrientDetailData?.filter((nutrient: any) => ['탄수화물', '단백질', '지방'].includes(nutrient.name)) || [];
  const mineralNutrients = nutrientDetailData?.filter((nutrient: any) => ['칼슘', '인'].includes(nutrient.name)) || [];
  const vitaminNutrients =
    nutrientDetailData?.filter((nutrient: any) => ['비타민 A', '비타민 D', '비타민 E'].includes(nutrient.name)) || [];

  return (
    <Wrapper>
      <Title>영양소 상세</Title>
      <InfoCardWrapper>
        <NaturalInfoCardImage>
          오늘 먹은 영양소는 총 {Math.round(nutrientData?.todayKcal || 0)}kcal로, 섭취량이 조금 부족한 수준이에요.
        </NaturalInfoCardImage>
        <SupplementInfo>
          <Name>
            과잉 영양소 : <Color1>{nutrientData?.excessNutrients?.map((nutrient) => nutrient).join(', ')}</Color1>
          </Name>
          <Name>
            부족 영양소 : <Color1> {nutrientData?.deficientNutrients?.map((nutrient) => nutrient).join(', ')}</Color1>
          </Name>
          <Name>
            적정 영양소 : <Color2>{nutrientData?.properNutrients?.map((nutrient) => nutrient).join(', ')}</Color2>
          </Name>
          <Vendor>* 보다 자세한 설명은 ‘추천 영양성분’에서 확인해주세요.</Vendor>
        </SupplementInfo>
        <CancelButtonImage
          src={BackButton}
          alt="닫기 버튼"
          onClick={() => router.push(`/result/${petId}/${dailyMealId}`)}
        />
      </InfoCardWrapper>
      <ChartWrapper>
        <SectionTitle>기본 영양소</SectionTitle>
        <LineChart nutrientData={mainNutrients} group={1} />
        <SectionBorder />
        <SectionTitle>미네랄</SectionTitle>
        <LineChart nutrientData={mineralNutrients} group={2} />
        <SectionBorder />
        <SectionTitle>비타민</SectionTitle>
        <LineChart nutrientData={vitaminNutrients} group={3} />
      </ChartWrapper>
      <Content>{children}</Content>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background-color: ${(props) => props.theme.colors['grey1']}; // body 배경색 설정
  width: 360px;
  height: 800px;
  position: absolute;
  overflow-y: scroll;
  overflow-x: hidden;
`;

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
  background: var(--white, #fff);
  box-shadow: 2px 2px 15px 0px rgba(149, 156, 164, 0.2);
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
  color: var(--grey11, #36393c);
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
  left: 0px;
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
  color: var(--grey8, #7c8389);
  font-family: SUIT;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 160%;
`;

const Name = styled.div`
  color: var(--grey11, #36393c);
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
  color: var(--grey8, #7c8389);
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
  background: var(--100, #d9f4e5);
  max-width: 96px;
  color: var(--600, #33a165);
  font-family: SUIT;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: 160%;
`;

const Color1 = styled.span`
  color: var(--symentic-red-500, #ff4d46);

  /* body2_semibold_14pt */
  font-family: SUIT middle;
`;

const Color2 = styled.span`
  color: var(--primary, #40c97f);

  /* body2_semibold_14pt */
  font-family: SUIT middle;
`;

const SectionTitle = styled.h2`
  color: var(--grey7, #959ca4);

  /* title1_semibold_18pt */
  font-family: SUIT;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 160%; /* 28.8px */
  letter-spacing: -0.2px;
  margin-bottom: 16px;
  margin-top: 24px;
`;

const ChartWrapper = styled.div`
  height: 700px;
  top: 350px;
  width: 302px;
  left: 24px;
  position: absolute;
`;
const SectionBorder = styled.div`
  width: 330px;
  background: #dde0e4;
  height: 1px;
  margin-top: 8px;
  margin-bottom: 8px;
  left: -10px;
  position: relative;
`;
