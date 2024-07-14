'use client';

import { useRecoilValue, useSetRecoilState, useRecoilState } from 'recoil';
import { searchQueryState, consumedRawsState, isValidState, isServing } from '@recoil/atoms';
import styled from 'styled-components';
import UnifiedCard from '@components/input-data2/naturalfood-page/unified-card';
import { useState, useEffect } from 'react';
import { RawFood, RecentRawFood } from '@lib/types';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { RawFoodFormState } from '@recoil/nutrientAtoms';

export default function Table({
  keyword,
  rawFoods,
  recentRawFoods,
}: {
  keyword: string;
  rawFoods: any;
  recentRawFoods: any;
}) {
  const [searchQueryrecoil, setSearchQuery] = useRecoilState(searchQueryState);
  const [rawFoodForm, setRawFoodForm] = useRecoilState(RawFoodFormState);

  //const searchQuery = useRecoilValue(searchQueryState);
  const searchQuery = keyword;
  console.log(searchQuery);
  // const rawFoods = useRecoilValue(rawFoodsState);
  const setIsValid = useSetRecoilState(isValidState);
  // const consumedRaws = useRecoilValue(consumedRawsState);

  // 불러온 데이터로 변경
  const consumedRaws = recentRawFoods;

  const [clickedId, setClickedId] = useState<string | null>(null);
  const [someClicked, setSomeClicked] = useState(false);
  const [serving, setServing] = useState('');
  const setIsServing = useSetRecoilState(isServing);
  const [isServingValid, setIsServingValid] = useState(false);

  // 리펙토링을 위한 hooks
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const filteredRawFoods = searchQuery
    ? rawFoods.filter((food: RawFood) => food.name.includes(searchQuery)).slice(0, 5)
    : [];
  const recentConsumedRaws = !searchQuery ? consumedRaws?.slice(0, 5) : [];
  const fontWeight1 = '400';
  const fontWeight2 = '700';
  const lineHeight1 = '160%';
  const lineHeight2 = '130%';
  const isRecent = recentConsumedRaws?.some((consumed: RecentRawFood) => consumed.name === clickedId);
  const selectedFood = filteredRawFoods.find((food: RawFood) => food.name === clickedId);
  const selectedRecentFood = recentConsumedRaws?.find((food: RecentRawFood) => food.name === clickedId);

  useEffect(() => {
    setIsValid(isStoreValid());
  }, [clickedId, serving, isRecent, setIsValid]);

  useEffect(() => {
    setIsServingValid(false);
    setSomeClicked(false);
    setClickedId(null);
    setIsServing(false);
  }, [searchQuery]);

  useEffect(() => {
    if (isRecent) {
      setRawFoodForm({
        rawId: selectedRecentFood?.dailyRawId,
        serving: selectedRecentFood?.serving,
      });
      // console.log(selectedRecentFood);
    } else {
      const selectedFood = filteredRawFoods.find((food: RawFood) => food.name === clickedId);

      setRawFoodForm({
        rawId: selectedFood?.rawId,
        serving: parseInt(serving),
      });
      // console.log(selectedFood,serving);
    }
  }, [selectedFood, selectedRecentFood, serving, isServing]);

  // console.log(rawFoodForm)

  // console.log(selectedFood);
  // console.log(selectedRecentFood);
  //  console.log(serving)

  function handleClick(id: string) {
    setIsServingValid(true);

    if (clickedId === id) {
      // 재클릭시 초기화
      setClickedId(null);
      setSomeClicked(false);
      setServing('');
      setIsServing(false);
      const params = new URLSearchParams(searchParams);
      params.delete('keyword');
      replace(`${pathname}?${params.toString()}`);
      setSearchQuery('');
    } else {
      setClickedId(id);
      setSomeClicked(true);
      setIsServing(true);
    }
  }

  function isStoreValid(): boolean {
    if (!clickedId) return false;
    if (isRecent) return true;
    if (selectedFood && serving !== '') return true;
    return false;
  }

  return (
    <div>
      <TableContainer $searchQuery={keyword}>
        {searchQuery ? (
          filteredRawFoods.map((food: RawFood) => (
            <UnifiedCard
              key={food.name}
              title={food.name}
              description={food.description}
              titleFontWeight={fontWeight2}
              titleLineHeight={lineHeight1}
              descriptionFontWeight={fontWeight1}
              descriptionLineHeight={lineHeight2}
              isClicked={clickedId === food.name}
              onClick={() => handleClick(food.name)}
              someClicked={someClicked}
            />
          ))
        ) : (
          <RecentContainer>
            {recentConsumedRaws?.map((consumed: RecentRawFood) => (
              <UnifiedCard
                key={consumed.dailyRawId}
                title={consumed.name}
                description={`${consumed.serving}g`}
                titleFontWeight={fontWeight1}
                titleLineHeight={lineHeight1}
                descriptionFontWeight={fontWeight1}
                descriptionLineHeight={lineHeight1}
                isClicked={clickedId === consumed.name}
                onClick={() => handleClick(consumed.name)}
                someClicked={someClicked}
                isRecent={true}
              />
            ))}
          </RecentContainer>
        )}
        {!isRecent && someClicked && (
          <ServingWrapper>
            <ServingText>섭취량</ServingText>
            <ServingInput type="text" value={serving} onChange={(e) => setServing(e.target.value)} placeholder=" " />
          </ServingWrapper>
        )}
      </TableContainer>
    </div>
  );
}

const TableContainer = styled.div<{ $searchQuery: string }>`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  gap: 16px;
  overflow-y: scroll;
  height: 320px;
  margin-top: ${(props) => (props.$searchQuery ? '45px' : '20px')}; /* 검색어가 있을 때만 margin-top 추가 */
`;

const RecentContainer = styled.div`
  display: flex;
  padding: 10px 14px;
  width: 335px;
  overflow-x: scroll;
  gap: 10px;
`;

const StoreButton = styled.button`
  margin-top: -10px;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  background-color: var(--primary, #40c97f);
  color: white;
  font-size: 16px;
  cursor: pointer;

  &:disabled {
    background-color: var(--grey2, #eceef0);
    cursor: not-allowed;
  }
`;

const ServingInput = styled.input`
  display: flex;
  width: 152px;
  height: 40px;
  padding: 8px 12px;
  flex-direction: column;
  align-items: flex-start;
  flex-shrink: 0;
  border-radius: 8px;
  border: 1px solid var(--grey2, #eceef0);
  background: var(--white, #fff);
  margin-left: 118px;

  &:focus {
    border: 1px solid var(--primary, #40c97f); /* 포커스 시 초록색 테두리 */
    outline: none; /* 기본 포커스 스타일 제거 */
  }
`;

const ServingText = styled.div`
  color: var(--grey11, #36393c);
  /* title2_bold_16pt */
  font-family: SUIT;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 160%; /* 25.6px */
  margin-top: 4px;
`;

const ServingWrapper = styled.div`
  display: flex;
`;
