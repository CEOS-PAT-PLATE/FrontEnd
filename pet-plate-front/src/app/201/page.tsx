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
import LoadingSVGImage from '@public/svg/201_image.svg?url';

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
        <ProgressBarWrapper>
          <ProgressBar />
        </ProgressBarWrapper>
        <Text1>오늘 하루 먹은 식단을 입력해주세요!</Text1>
        <Text2>식단은 사료, 자연식, 포장간식으로 나뉘어져 있어요. 아래 설명을 참고하여 식단을 추가해보아요.</Text2>
        <AddButton />
        <div onClick={handleClick}>
          <StoreButton>
            <Image src={isValid ? StoreButtonActive : StoreButtonInactive} alt="store-button" />
          </StoreButton>
        </div>

        <NoticeContainer>
          <Notice />
        </NoticeContainer>
        <ContentContainer>
          {dailyMeals ? (
            <FoodCardsContainer dailyMeals={dailyMeals} />
          ) : (
            <EmptyMessage>        <Image src={LoadingSVGImage} width={280} height={260} alt="loading" />
</EmptyMessage>
          )}
        </ContentContainer>
      </Wrapper>
    </>
  );
}

const StoreButton = styled.div`
  width: 312px;
  position: absolute;
  bottom: 36px;
  left: 24px;
  cursor: pointer;
  z-index: 120;
`;

const NoticeContainer = styled.div``;

const ContentContainer = styled.div`
  margin-top: 20px;
  z-index: 10;
  position: absolute;
  top: 225px;
  left: 24px;
  height: 480px;
  max-height: 487px;
  width: 312px;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
`;

const EmptyMessage = styled.div`
  position: absolute;
  top: 32px;
  left: 15px;

  z-index: 10;

`;

const ProgressBarWrapper = styled.div`
  position: absolute;
  top: 99px;
  left: 0;
  width: 100%;
  z-index: 10;
  height: 8px;
`;

const Text1 = styled.div`
  color: var(--grey11, #36393c);
  position: absolute;
  width: 274px;
  height: 32px;
top:131px;
left:24px;

  /* header_bold_20pt */
  font-family: SUIT;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 160%; /* 32px */
  letter-spacing: -0.75px;
`;

const Text2 = styled.div`
  position: absolute;
  width: 274px;
  height: 32px;
  top:171px;
  left:24px;
  color: var(--grey8, #7c8389);

  /* body2_regular_14pt */
  font-family: SUIT;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 160%; /* 22.4px */
`;
