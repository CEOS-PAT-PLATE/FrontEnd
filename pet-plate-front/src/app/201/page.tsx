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
import { isCompleteValid, noticeState, isCompleteModalOpenState, dailyMealsState } from '@recoil/atoms';
import { useRecoilValue, useSetRecoilState, useRecoilState } from 'recoil';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import ProgressBar from '@components/input-data1/progressbar';

/*
const petData = {
  name: '이아지',
  age: 2,
  weight: 13,
  activity: 'ACTIVE',
  neutering: 'NEUTERED',
};*/

const getTodayDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1 필요
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

function CheckCompleteValid(dailyMealList: any) {
  return (
    dailyMealList.dailyRaws.length +
      dailyMealList.dailyFeeds.length +
      dailyMealList.dailyPackagedSnacks.length +
      dailyMealList.dailyBookMarkedRaws.length +
      dailyMealList.dailyBookMarkedFeeds.length +
      dailyMealList.dailyBookMarkedPackagedSnacks.length >
    0
  );
}

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
  const pathname = usePathname();
  const isValid = useRecoilValue(isCompleteValid);
  const setIsValid = useSetRecoilState(isCompleteValid);
  const setNotice = useSetRecoilState(noticeState);
  const [isCompleteModalOpen, setIsCompleteModalOpen] = useRecoilState(isCompleteModalOpenState);
  const [dailyMeals, setDailyMeals] = useRecoilState(dailyMealsState);

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

  useEffect(() => {
    const fetchDailyMeals = async () => {
      const petId = getPetIdFromLocalStorage();
      if (petId === null) return;
      const date = getTodayDate();
      try {
        const dailyMealResponse = await fetchdailyMealId(petId, date);
        if (dailyMealResponse && dailyMealResponse.data && dailyMealResponse.data.length > 0) {
          const dailyMealId = dailyMealResponse.data[0].dailyMealId;
          console.log('dailyMealId:', dailyMealId);
          localStorage.setItem('dailyMealId', JSON.stringify(dailyMealId));

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

          localStorage.setItem('dailyMealId', JSON.stringify(dailyMealId));

          const isCompleteValid = CheckCompleteValid(filteredData);
          console.log('isCompleteValid:', isCompleteValid);

          setIsValid(isCompleteValid);
          setDailyMeals(filteredData);
        } else {
          console.log('추가 식단x');
        }
      } catch (e) {
        console.error(e); // 에러
      }
    };

    fetchDailyMeals();
  }, [pathname]);

  const handleClick = () => {
    console.log('isValid:', isValid);
    if (!isValid) {
      setNotice({ isVisible: true, message: '추가된 식단이 없어요!' });
      return;
    } else {
      console.log('응:', isValid);
      setIsCompleteModalOpen(true);
    }
  };

  return (
    <>
      <Wrapper>
        <AddButton />
        <div onClick={handleClick}>
          <StoreButton>
            <Image src={isValid ? StoreButtonActive : StoreButtonInactive} alt="store-button" />
          </StoreButton>
        </div>
        <ProgressBar/>
        <NoticeContainer>
          <Notice />
        </NoticeContainer>
        <ContentContainer>
          {dailyMeals ? (
            <FoodCardsContainer dailyMeals={dailyMeals} />
          ) : (
            <EmptyMessage>아직 추가된 식단이 없어요!</EmptyMessage>
          )}
        </ContentContainer>
      </Wrapper>
    </>
  );
}

const StoreButton = styled.div`
  width: 312px;
  position: relative;
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

  font-family: SUIT;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 160%;
`;
