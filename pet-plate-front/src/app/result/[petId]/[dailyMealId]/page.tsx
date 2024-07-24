
'use client';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import Link from 'next/link';
import ExitButtonSVG from '@public/svg/exit-button.svg?url';
import Image from 'next/image';
import ResultBox from '@public/svg/result-info-box.svg?url';
import FoodCardsContainer from '@components/input-data2/common/foodcards-container';
import { useRecoilState } from 'recoil';
import { dailyMealsState, nutrientDataState } from '@recoil/nutrientAtoms';
import { dailyMealsAPI } from '@api/dailyMealsAPI';
import { saveDailyMealsNutrients, fetchPetNutrientData } from '@lib/apiService';
import DoughnutChart from '@components/result/doughnut-chart';
import LineChart from '@components/result/line-chart';
import Wrapper from '@style/input-data2/Wrapper';
import { useEffect, useState } from 'react';

interface PetInfo {
  petId: number;
  name: string;
  age: number;
  weight: number;
  activity: string;
  neutering: string;
  profileImgPath: string | null;
}

const storeNutrientDataInLocalStorage = (petId: number, dailyMealId: number, nutrientData: any) => {
  const key = `${petId}-${dailyMealId}`;
  localStorage.setItem(key, JSON.stringify(nutrientData));
};

const storeAllNutrientDataInLocalStorage = (petId: number, dailyMealId: number, allNutrientData: any) => {
  const key = `selected-nutrient-${petId}-${dailyMealId}`;
  localStorage.setItem(key, JSON.stringify(allNutrientData));
};

const getPetInfoFromLocalStorage = () => {
  if (typeof window === 'undefined') return null;
  const petInfoString = localStorage.getItem('petInfo');
  if (!petInfoString) {
    console.error('No petInfo');
    return null;
  }
  try {
    const petInfo = JSON.parse(petInfoString);
    return petInfo;
  } catch (error) {
    console.error('', error);
    return null;
  }
};

const getSelectedDate = () => {
  if (typeof window === 'undefined') return null;
  const selectedDate = localStorage.getItem('selectedDate');
  if (!selectedDate) {
    console.error('');
    return getTodayDate();
  }
  return selectedDate;
};

const getTodayDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const fetchdailyMealId = async (petId: number, date?: string) => {
  const response = await dailyMealsAPI.getPetDailyMeals(petId, date);
  return response.data;
};

const fetchdailyMealLists = async (petId: number, dailyMealId: number) => {
  const response = await dailyMealsAPI.getSpecificMeal(petId, dailyMealId);
  return response.data;
};

const getTodayDateDisplay = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return { year, month, day };
};

interface ResultProps {
  params: { petId: number; dailyMealId: number };
}

export default function Page({ params }: ResultProps) {
  const router = useRouter();
  const { petId, dailyMealId } = params;
  const [petInfo, setPetInfo] = useState<PetInfo | null>(null);
  const [deficientNutrients, setDeficientNutrients] = useState<string[]>([]);
  const [nutrientsData, setNutrientsData] = useRecoilState(nutrientDataState);
  const [dailyMeals, setDailyMeals] = useRecoilState(dailyMealsState);
  const [mainNutrients, setMainNutrients] = useState<string[]>([]);

  const date = getSelectedDate() || '0';
  console.log(date);
  const [year, month, day] = date.split('-');

  const fetchNutrientData = async (date: string) => {
    try {
      const [excessNutrients, properNutrients, deficientNutrients] = await Promise.all([
        dailyMealsAPI.getExcessNutrients(petId, dailyMealId),
        dailyMealsAPI.getProperNutrients(petId, dailyMealId),
        dailyMealsAPI.getDeficientNutrients(petId, dailyMealId),
      ]);

      const { todayNutrients, todayKcal, todaykcalRatio, todayProperKcal } = await fetchPetNutrientData(petId, date);

      const deficientNutrientsData = deficientNutrients.data.data;

      setDeficientNutrients(
        deficientNutrientsData.filter((_: any, index: number) => index % 2 === 0).map((nutrient: any) => nutrient.name),
      );

      const nutrientData = {
        excessNutrients: excessNutrients.data.data
          .filter((_: any, index: number) => index % 2 === 0)
          .map((nutrient: any) => nutrient.name),
        properNutrients: properNutrients.data.data
          .filter((_: any, index: number) => index % 2 === 0)
          .map((nutrient: any) => nutrient.name),
        deficientNutrients: deficientNutrientsData
          .filter((_: any, index: number) => index % 2 === 0)
          .map((nutrient: any) => nutrient.name),
        todayNutrients: todayNutrients.data.data,
        todayKcal: todayKcal?.data.kcal,
        todaykcalRatio: todaykcalRatio.data.kcalRatio,
        todayProperKcal: todayProperKcal?.data.kcal,
      };

      setNutrientsData(nutrientData);
      storeNutrientDataInLocalStorage(petId, dailyMealId, nutrientData);

      const todayNutrientsData = todayNutrients.data;
      console.log('오늘', todayNutrients.data);
      storeAllNutrientDataInLocalStorage(petId, dailyMealId, todayNutrientsData);
      setMainNutrients(todayNutrients.data);
      setMainNutrients([todayNutrients.data[0], todayNutrients.data[1], , todayNutrients.data[2]]);
    } catch (error) {
      console.error('오류', error);
    }
  };

  const fetchDailyMeals = async () => {
    try {
      if (dailyMealId) {
        const dailyMealListsResponse = await fetchdailyMealLists(petId, dailyMealId);

        const filteredData = {
          ...dailyMealListsResponse.data,
          dailyRaws: dailyMealListsResponse.data.dailyRaws.filter(
            (item: any) => item.name !== '존재하지 않는 음식입니다',
          ),
          dailyFeeds: dailyMealListsResponse.data.dailyFeeds.filter(
            (item: any) => item.name !== '존재하지 않는 음식입니다',
          ),
          dailyPackagedSnacks: dailyMealListsResponse.data.dailyPackagedSnacks.filter(
            (item: any) => item.name !== '존재하지 않는 음식입니다',
          ),
          dailyBookMarkedRaws: dailyMealListsResponse.data.dailyBookMarkedRaws.filter(
            (item: any) => item.name !== '존재하지 않는 음식입니다',
          ),
          dailyBookMarkedFeeds: dailyMealListsResponse.data.dailyBookMarkedFeeds.filter(
            (item: any) => item.name !== '존재하지 않는 음식입니다',
          ),
          dailyBookMarkedPackagedSnacks: dailyMealListsResponse.data.dailyBookMarkedPackagedSnacks.filter(
            (item: any) => item.name !== '존재하지 않는 음식입니다',
          ),
        };

        setDailyMeals(filteredData);
      } else {
        console.log('추가 식단x');
      }
    } catch (e) {
      console.error(e); // 에러
    }
  };

  useEffect(() => {
    const initialize = async () => {
      await saveDailyMealsNutrients(petId);
      await fetchDailyMeals();
      await fetchNutrientData(date);
    };

    initialize();
  }, []);

  useEffect(() => {
    const petInfo = getPetInfoFromLocalStorage();
    setPetInfo(petInfo);
  }, []);

  console.log(nutrientsData);

  return (
    <Wrapper>
      <Title>분석 결과</Title>
      <ExitButtonImage src={ExitButtonSVG} alt="exit-button" onClick={() => router.push('/main/analyze')} />
      <Container>
        <Content>
          <DateTitle>
            {' '}
            {year}. {month}. {day} 분석 결과
          </DateTitle>
          <SVGContent>
            <SVGImage src={ResultBox} width={312} height={169} alt="loading" />
            {deficientNutrients.length > 0 ? (
              <FirstLine>
                부족 영양소<RedText> {deficientNutrients.join(', ')}</RedText>
              </FirstLine>
            ) : (
              <FirstLine>오늘은 부족한 영양소가 없어요!</FirstLine>
            )}
            <SecondLine>
              몸무게 {petInfo?.weight}kg | 활동량 {petInfo?.activity}
            </SecondLine>
          </SVGContent>
          <StyledLink href={`/result/${petId}/${dailyMealId}/recommend/deficientNutrients`}>
            <RecommendationButton>추천 영양성분 보기</RecommendationButton>
          </StyledLink>
          <GraphContainer>
            <GraphText1>
              {nutrientsData.todayProperKcal - nutrientsData.todayKcal > 0 ? (
                <>
                  <GreenText>{Math.round(nutrientsData.todayProperKcal - nutrientsData.todayKcal)}kcal</GreenText> 더
                  먹어도 좋아요!
                </>
              ) : (
                <GreenText>칼로리가 적정 칼로리를 초과해요</GreenText>
              )}
            </GraphText1>
            <GraphText2>
              <GreenText>{petInfo?.name}</GreenText>의 하루 권장 섭취량은 {Math.round(nutrientsData.todayProperKcal)}
              kcal예요
            </GraphText2>
            <DoughnutChart todayKcal={nutrientsData.todayKcal} todayProperKcal={nutrientsData.todayProperKcal} />
            <Text1>
              {Math.round(nutrientsData.todayKcal)}/{Math.round(nutrientsData.todayProperKcal)}
            </Text1>
            <LineChart nutrientData={mainNutrients} />
          </GraphContainer>
          <StyledLink href={`/result/${petId}/${dailyMealId}/detail`}>
            <DetailButton>영양소 상세 보기</DetailButton>
          </StyledLink>
          <MealListTitle>
            <GreenText>{petInfo?.name}</GreenText>의 하루 식단
          </MealListTitle>
          <ContentContainer>
            {dailyMeals ? (
              <FoodCardsContainer dailyMeals={dailyMeals} />
            ) : (
              <EmptyMessage>식단을 불러오는 중이에요!</EmptyMessage>
            )}
          </ContentContainer>
        </Content>
      </Container>

      <EmptyBottom></EmptyBottom>
    </Wrapper>
  );
}

const GraphText1 = styled.div`
  color: var(--grey11, #36393c);
  font-family: SUIT;
  font-size: 20px;
  font-weight: 700;
  line-height: 160%;
  letter-spacing: -0.75px;
`;

const GraphText2 = styled.div`
  color: var(--grey11, #36393c);
  font-family: SUIT;
  font-size: 14px;
  font-weight: 400;
  line-height: 160%;
`;

const RedText = styled.span`
  color: var(--symentic-red-400, #ff706b);
  font-weight: 600;
`;

const GreenText = styled.span`
  color: var(--primary, #40c97f);
  font-weight: 700;
`;

const WrapperStyleWrapper = styled.div`
  width: 360px;
  height: 800px;
  position: relative;
`;

const Container = styled.div`
  height: 704px;
  width: 360px;
  overflow-y: auto;
  position: absolute;
  max-height: 704px;
  max-width: 360px;
  top: 96px;
  display: flex;
  flex-direction: column;
  align-items: center;
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

const Content = styled.div`
  padding: 16px;
`;

const DateTitle = styled.div`
  color: var(--grey11, #36393c);
  font-family: SUIT;
  font-size: 16px;
  font-weight: 700;
  line-height: 160%;
  margin-bottom: 8px;
`;

const FirstLine = styled.p`
  font-family: SUIT;
  font-size: 16px;
  font-weight: 400;
  line-height: 180%;
  letter-spacing: -0.75px;
  color: var(--grey11, #36393c);
  position: absolute;
  top: 16px;
  left: 18px;
`;

const SecondLine = styled.p`
  font-family: SUIT;
  font-size: 12px;
  font-weight: 400;
  line-height: 160%;
  color: var(--grey10, #4f5357);
  position: absolute;
  top: 48px;
  left: 18px;
`;

const RecommendationButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 224px;
  height: 48px;
  padding: 14px;
  margin-bottom: 26px;
  margin-top: 18px;
  margin: 16px auto;
  border-radius: 8px;
  border: none;
  background: var(--primary, #40c97f);
  color: white;
  cursor: pointer;
  font-family: SUIT;
  font-size: 14px;
  font-weight: 600;
  line-height: 160%;
  outline: none;
`;

const GraphContainer = styled.div`
  width: 100%;
  height: 270px;
  min-height: 290px;
  margin: 16px 0;
  background: var(--grey1, #fafafc);
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const DetailButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 224px;
  height: 48px;
  padding: 14px;
  margin: 16px auto;
  border-radius: 8px;
  background: var(--grey1, #fafafc);
  color: white;
  cursor: pointer;
  font-family: SUIT;
  font-size: 14px;
  font-weight: 600;
  line-height: 160%;
  outline: none;
  border: none;
  color: var(--600, #33a165);
  text-align: center;
  font-size: 16px;
  font-weight: 700;
  line-height: 160%;
  border-radius: 8px;
  border: 1px solid var(--600, #33a165);
`;

const MealListTitle = styled.h2`
  margin-top: 48px;
  height: 250px;
  color: var(--grey11, #36393c);
  font-family: SUIT;
  font-size: 18px;
  font-weight: 600;
  line-height: 160%;
  letter-spacing: -0.2px;
`;

const ExitButtonStyleWrapper = styled.div`
  position: absolute;
  z-index: 3000;
  right: 20px;
  cursor: pointer;
  top: 44px;
`;

function ExitButtonImage({ src, alt, onClick }: { src: string; alt: string; onClick: () => void }) {
  return (
    <ExitButtonStyleWrapper onClick={onClick}>
      <Image src={src} alt={alt} />
    </ExitButtonStyleWrapper>
  );
}

const SVGContent = styled.div`
  width: 312px;
  height: 169px;
  border-radius: 8px;
  position: relative;
`;

const SVGImage = styled(Image)`
  position: absolute;
  width: 312px;
  height: 169px;
  top: 0;
  left: 0;
  border-radius: 8px;
`;

const ContentContainer = styled.div`
  margin-top: 20px;
  z-index: 10;
  top: 721px;
  left: 24px;
  height: 250px;
  max-height: 250px;
  width: 312px;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  position: absolute;
  margin-bottom: 10px;
`;

const EmptyMessage = styled.div`
  position: absolute;
  left: 28%;
  top: 160px;
  z-index: 10;
  color: var(--grey8, #7c8389);
  text-align: center;
  font-family: SUIT;
  font-size: 14px;
  font-weight: 400;
  line-height: 160%;
`;

const EmptyBottom = styled.div`
  position: absolute;
  z-index: 2000;
  bottom: 0px;
  height: 500px;
  max-height: 13px;
  width: 360px;
  background-color: ${(props) => props.theme.colors['grey1']};
`;

const Text1 = styled.div`
  color: var(--grey11, #36393c);
  text-align: center;
  position: absolute;
  top: 200px;
  font-family: SUIT Middle;
  font-size: 25px;
  font-weight: 700;
  line-height: 14.083px;
  letter-spacing: -1px;
  z-index: 100;
  width: 300px;
  margin-top: 240px;
  left: -35px;
`;
