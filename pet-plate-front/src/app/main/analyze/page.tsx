'use client';

import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import MainHeader from '@components/main/mainHeader';
import LinkButton from '@components/main/linkBtn';
import ResultList from '@components/main/resultList';
import infoCard from '@public/svg/analyze-result-card.svg?url';
import nextIcon from '@public/svg/arrow-left-line.svg?url';
import { dailyMealsAPI } from "@api/dailyMealsAPI";

interface Pet {
  petId: number;
  name: string;
  age: number | undefined;
  weight: number | undefined;
  activity: string;
  neutering: string;
  profileImgPath: string | null;
}

interface Meal {
  petId: number;
  date: string;
  dailyMealId: number;
}

interface Nutrient {
  name: string;
  amount: number;
}

// resultData의 타입을 수정하여 petId를 추가합니다.
interface ResultData {
  petId: number;
  date: string;
  dailyMealId: number;
  nutrients: Nutrient[];
}

export default function Page() {
  const buttonContent = (
    <>
      <span style={{ color: '#fff' }}>새로 분석 하러가기</span>
      <Image style={{ marginLeft: '6.688rem' }} src={nextIcon} alt="next-icon" />
    </>
  );

  const [petInfo, setPetInfo] = useState<Pet | null>(null);
  const [resultData, setResultData] = useState<ResultData[]>([]);

  const fetchDailyMealId = async (petId: number, date?: string) => {
    const response = await dailyMealsAPI.getPetDailyMeals(petId, date);
    return response.data.data;
  };

  const fetchDeficientNutrients = async (petId: number, dailyMealId: number) => {
    try {
      const deficientNutrients = await dailyMealsAPI.getDeficientNutrients(petId, dailyMealId);
      return deficientNutrients.data.data;
    } catch (error) {
      console.error('오류', error);
      return [];
    }
  };

  useEffect(() => {
    const storedPetInfo = localStorage.getItem('petInfo');
    if (storedPetInfo) {
      const parsedPetInfo = JSON.parse(storedPetInfo);
      setPetInfo(parsedPetInfo);

      const loadMealsAndNutrients = async () => {
        const meals = await fetchDailyMealId(parsedPetInfo.petId);

        if (Array.isArray(meals)) {
          const results = await Promise.all(meals.map(async (meal: Meal) => {
            const nutrients = await fetchDeficientNutrients(parsedPetInfo.petId, meal.dailyMealId);
            return {
              petId: parsedPetInfo.petId,  // petId를 포함합니다.
              date: meal.date,
              dailyMealId: meal.dailyMealId,
              nutrients: nutrients || []
            };
          }));
          setResultData(results);
        } else {
          console.error('예상과 다른 데이터 형식:', meals);
        }
      };

      loadMealsAndNutrients();
    }
  }, []);

  return (
    <PageWrapper>
      <MainHeader />
      <InfoCardContainer>
        <InfoCard src={infoCard} alt="info" />
        <FixedBtnWrapper>
          <LinkButton
            href="/201"
            backgroundcolor={(props) => props.theme.colors.green}
            hoverbackgroundcolor={(props) => props.theme.colors.green}
            hoverbuttoncontentcolor="#fff"
            buttonContent={buttonContent}
          />
        </FixedBtnWrapper>
      </InfoCardContainer>

      <ResultListContainer>
        <Text>
          이전 분석결과 <span>{resultData.length}건</span>
        </Text>
        <ResultListWrapper>
          {petInfo ? (
            resultData.length > 0 ? (
              resultData.map(data => (
                <ResultList
                  key={data.dailyMealId}
                  petId={data.petId}  // petId를 사용합니다.
                  date={data.date}
                  nutrients={data.nutrients}
                  dailyMealId={data.dailyMealId}
                />
              ))
            ) : (
              "식단을 분석해 보세요"
            )
          ) : (
            "정보를 불러오는 중입니다..."
          )}
        </ResultListWrapper>
      </ResultListContainer>
    </PageWrapper>
  );
}

const PageWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InfoCardContainer = styled.div`
  width: 100%;
  height: min-content;
  background-color: ${(props) => props.theme.colors['green-200']};
  position: relative;
`;

const InfoCard = styled(Image)`
  position: absolute;
  top: 0;
`;

const FixedBtnWrapper = styled.div`
  position: absolute;
  top: 7.688rem;
  left: 1.5rem;
`;

const ResultListContainer = styled.div`
  width: 100%;
  height: 26.5rem;
  margin-top: 12.5rem;
  background-color: ${(props) => props.theme.colors['grey1']};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Text = styled.h1`
  width: 19.5rem;
  margin-top: 1.5rem;
  margin-bottom: 1rem;
  color: ${(props) => props.theme.colors['grey11']};

  span {
    color: ${(props) => props.theme.colors.green};
  }
`;

const ResultListWrapper = styled.div`
  width: 19.5rem;
  height: 22rem;
  overflow: scroll;
`;
