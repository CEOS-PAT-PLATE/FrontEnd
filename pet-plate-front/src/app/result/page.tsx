'use client';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import Link from 'next/link';
import ExitButtonSVG from '@public/svg/exit-button.svg?url';
import Image from 'next/image';
import ResultBox from '@public/svg/result-info-box.svg?url';

import FoodCardsContainer from '@components/input-data2/common/foodcards-container';
import { useRecoilState } from 'recoil';
import { dailyMealsState } from '@recoil/atoms';
import { useEffect } from 'react';

import { dailyMealsAPI } from '@api/dailyMealsAPI';

import { saveDailyMealsNutrients, fetchPetNutrientData } from '@lib/apiService';

const getTodayDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1 필요
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

import Wrapper from '@style/input-data2/Wrapper';

const fetchdailyMealId = async (petId: number, date?: string) => {
  const response = await dailyMealsAPI.getPetDailyMeals(petId, date);
  console.log('fetchdailyMealId response:', response);
  return response.data;
};

const fetchdailyMealLists = async (petId: number, dailyMealId: number) => {
  const response = await dailyMealsAPI.getSpecificMeal(petId, dailyMealId);
  console.log('응답:', response);
  return response.data;
};

interface ResultProps {
  params: { petId: number; dailyMealId: number };
}

export default function Page({ params }: ResultProps) {
  const router = useRouter();
  //const { petId, dailyMealId } = params;
  const petId = 3;
  const dailyMealId = 4;
  // const dailyMeals = useRecoilValue(dailyMealsState);
  const [dailyMeals, setDailyMeals] = useRecoilState(dailyMealsState);

  const date = getTodayDate();

  // ** 1,2 별도로 비동기요청 보내기
  //1

  // 영양소 불러오는 함수
  const fetchNutrientData = async () => {
    try {
      const [excessNutrients, properNutrients, deficientNutrients] = await Promise.all([
        dailyMealsAPI.getExcessNutrients(petId, dailyMealId),
        dailyMealsAPI.getProperNutrients(petId, dailyMealId),
        dailyMealsAPI.getDeficientNutrients(petId, dailyMealId),
      ]);

      const { todayNutrients, todayKcal, todaykcalRatio, todayProperKcal } = await fetchPetNutrientData(petId, date);

      console.log('초과 영양소:', excessNutrients.data);
      console.log('적정 영양소:', properNutrients.data);
      console.log('부족 영양소:', deficientNutrients.data);

      console.log('오늘 섭취 영양소 정보', todayNutrients.data);
      console.log('오늘 섭취 총 칼로리 정보', todayKcal.data);
      console.log('오늘 섭취 칼로리/적정 섭취 칼로리 정보', todaykcalRatio.data);
      console.log('하루동안 섭취해야할 적정 칼로리', todayProperKcal.data);
    } catch (error) {
      console.error('오류', error);
    }
  };

  // 2

  const fetchDailyMeals = async () => {
    try {
      const dailyMealResponse = await fetchdailyMealId(petId, date);
      if (dailyMealResponse && dailyMealResponse.data && dailyMealResponse.data.length > 0) {
        const dailyMealId = dailyMealResponse.data[0].dailyMealId;
        console.log('dailyMealId:', dailyMealId);
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

  // 초기화 비동기 함수 use effect 내에서 실행
  useEffect(() => {
    const initialize = async () => {
      await saveDailyMealsNutrients(petId);
      await fetchDailyMeals();
      await fetchNutrientData();
    };

    initialize();
  }, []);

  return (
    <Wrapper>
      <Title>분석 결과</Title>
      <ExitButtonImage src={ExitButtonSVG} alt="exit-button" onClick={() => router.push('/main/analyze')} />
      <Container>
        <Content>
          <DateTitle>2024. 6. 21 분석 결과</DateTitle>
          <SVGContent>
            <SVGImage src={ResultBox} width={312} height={169} alt="loading" />
            <FirstLine>
              <RedText>지방, 비타민 A가</RedText> 부족해요!
            </FirstLine>
            <SecondLine>몸무게 1.6kg | 활동량 보통</SecondLine>
          </SVGContent>
          <StyledLink href={`result/${petId}/${dailyMealId}/recommend/deficientNutrients`}>
            <RecommendationButton>추천 영양성분 보기</RecommendationButton>
          </StyledLink>
          <GraphContainer>
            <GraphText1>
              <GreenText>20kcal</GreenText> 더 먹어도 좋아요!
            </GraphText1>
            <GraphText2>
              <GreenText>김백순</GreenText>의 하루 권장 섭취량은 260kcal에요
            </GraphText2>
            {/*그래프 */}
          </GraphContainer>
          <StyledLink href={`result/${petId}/${dailyMealId}/detail`}>
            <DetailButton>영양소 상세 보기</DetailButton>
          </StyledLink>
          <MealListTitle>
            <GreenText>김백순</GreenText>이 먹은 하루 식단
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

  /* header_bold_20pt */
  font-family: SUIT;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 160%;
  letter-spacing: -0.75px;
`;

const GraphText2 = styled.div`
  color: var(--grey11, #36393c);

  /* body2_regular_14pt */
  font-family: SUIT;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 160%;
`;

const RedText = styled.span`
  color: var(--symentic-red-400, #ff706b);

  /* title1_semibold_18pt */

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

  /* title2_bold_16pt */
  font-family: SUIT;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 160%; /* 25.6px */
  margin-bottom: 8px;
`;

const FirstLine = styled.p`
  font-family: SUIT;
  font-size: 18px;
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
  background: #e9e9e9;
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

  /* title2_bold_16pt */
  font-family: SUIT;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 160%; /* 25.6px */

  border-radius: 8px;
  border: 1px solid var(--600, #33a165);
`;

const MealListTitle = styled.h2`
  margin-top: 48px;

  height: 250px;

  color: var(--grey11, #36393c);

  /* title1_semibold_18pt */
  font-family: SUIT;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 160%;
  letter-spacing: -0.2px;
`;

const ExitButtonStyleWrapper = styled.div`
  position: absolute; /* 절대적인 위치를 고정 */
  z-index: 3000; /* 다른 요소보다 위에 배치 */
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
  font-style: normal;
  font-weight: 400;
  line-height: 160%;
`;

const EmptyBottom = styled.div`
  position: absolute;
  z-index: 1000;
  bottom: 0px;
  height: 500px;
  max-height: 13px;

  width: 360px;
  background-color: ${(props) => props.theme.colors['grey1']}; // body 배경색 설정
`;
