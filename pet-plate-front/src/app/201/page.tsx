'use client';

import { dailyMealsAPI } from '@api/dailyMealsAPI';
import FoodCardsContainer from '@components/input-data2/common/foodcards-container';
import AddButton from '@components/input-data2/common/addplate-button';
import id_200 from '@public/svg/id_200.svg?url';
import Image from 'next/image';
import StoreButtonInactive from '@public/svg/btn_cta_inactive.svg?url';
import StoreButtonActive from '@public/svg/btn_cta_active.svg?url';
import styled from 'styled-components';
import Wrapper from '@style/input-data2/Wrapper';
import Notice from '@components/input-data2/common/notice';
import { isValidState } from '@recoil/atoms';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

const getTodayDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1 필요
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

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

export default function Page() {
  const petId = 3;
  const date = getTodayDate();
  const [dailyMeals, setDailyMeals] = useState<any>(null);
  const pathname = usePathname();
  const isValid = useRecoilValue(isValidState);
  const setIsValid = useSetRecoilState(isValidState);

  const fetchDailyMeals = async () => {
    try {
      const dailyMealResponse = await fetchdailyMealId(petId, '2024-07-16');
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
        //   setDailyMeals(dailyMealListsResponse.data);
      } else {
        console.log('추가 식단x');
      }
    } catch (e) {
      console.error(e); // 에러
    }
  };

  useEffect(() => {
    fetchDailyMeals();
  }, [pathname]);

  const handleClick = () => {
    if (!isValid) {
      // alert('식단을 추가해주세요.');
      // setNotice({ isVisible: true, message: '식단을 선택해주세요!' });
      return;
    }
  };

  return (
    <>
      <Wrapper>
        <Image src={id_200} alt="id-200" priority />
        <AddButton />
        <StoreButtonImage
          src={isValid ? StoreButtonActive : StoreButtonInactive}
          alt="store-button"
          onClick={handleClick}
          priority // 이미지 로드 우선순위 지정
        />
        <NoticeContainer>
          <Notice />
        </NoticeContainer>
        <ContentContainer>
          {dailyMeals ? (
            <FoodCardsContainer dailyMeals={dailyMeals} />
          ) : (
            <EmptyMessage>식단을 불러오는 중이에요!</EmptyMessage>
          )}
        </ContentContainer>
      </Wrapper>
    </>
  );
}

const StoreButtonImage = styled(Image)`
  width: 312px;
  position: relative; /* 절대적인 위치를 고정 */
  bottom: 200px;
  left: 24px;
  cursor: pointer;
`;

const NoticeContainer = styled.div``;

const ContentContainer = styled.div`
  margin-top: 20px;
  z-index: 10;
  position: absolute;
  top: 205px;
  left: 24px;
  height: 380px;
  max-height: 380px;
  width: 312px;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
`;

const EmptyMessage = styled.div`
  position: absolute;

  left: 28%;
  top: 160px;

  z-index: 10;

  color: var(--grey8, #7c8389);
  text-align: center;

  /* body2_regular_14pt */
  font-family: SUIT;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 160%; /* 22.4px */
`;
