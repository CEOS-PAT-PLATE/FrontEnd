'use client';

import { useRecoilValue, useSetRecoilState } from 'recoil';
import { searchQueryState, rawFoodsState, consumedRawsState, isValidState, isServing } from '@lib/atoms';
import styled from 'styled-components';
import UnifiedCard from '@components/input-data2/unified-card';
import { useState, useEffect } from 'react';

export default function Table() {
  const searchQuery = useRecoilValue(searchQueryState);
  const rawFoods = useRecoilValue(rawFoodsState);
  const setIsValid = useSetRecoilState(isValidState);
  const consumedRaws = useRecoilValue(consumedRawsState);
  const [clickedId, setClickedId] = useState<string | null>(null);
  const [someClicked, setSomeClicked] = useState(false);
  const [serving, setServing] = useState('');
  const setIsServing = useSetRecoilState(isServing);

  const filteredRawFoods = searchQuery ? rawFoods.filter((food) => food.name.includes(searchQuery)).slice(0, 5) : [];
  const recentConsumedRaws = !searchQuery ? consumedRaws.slice(0, 5) : [];
  const fontWeight1 = '400';
  const fontWeight2 = '700';
  const lineHeight1 = '160%';
  const lineHeight2 = '130%';
  const isRecent = recentConsumedRaws.some(consumed => consumed.rawId === clickedId);
  const selectedFood = filteredRawFoods.find(food => food.name === clickedId);

  useEffect(() => {
    setIsValid(isStoreValid());
  }, [clickedId, serving, isRecent, setIsValid]);

  function handleClick(id: string) {
    if (clickedId === id) {
      setClickedId(null);
      setSomeClicked(false);
      setServing('');
      setIsServing(false);
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
      <TableContainer $searchQuery={searchQuery}>
        {searchQuery ? (
          filteredRawFoods.map((food) => (
            <UnifiedCard
              key={food.id}
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
            {recentConsumedRaws.map((consumed) => (
              <UnifiedCard
                key={consumed.rawId}
                title={consumed.rawId}
                description={`${consumed.serving}g`}
                titleFontWeight={fontWeight1}
                titleLineHeight={lineHeight1}
                descriptionFontWeight={fontWeight1}
                descriptionLineHeight={lineHeight1}
                isClicked={clickedId === consumed.rawId}
                onClick={() => handleClick(consumed.rawId)}
                someClicked={someClicked}
                isRecent={true}
              />
            ))}
          </RecentContainer>
        )}
        {!isRecent && someClicked && (
          <ServingWrapper>
            <ServingText>섭취량</ServingText>
            <ServingInput
              type="text"
              value={serving}
              onChange={(e) => setServing(e.target.value)}
              placeholder=" "
            />
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
  background-color: var(--primary, #40C97F);
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
  border: 1px solid var(--grey2, #ECEEF0);
  background: var(--white, #FFF);
  margin-left: 118px;

  &:focus {
    border: 1px solid var(--primary, #40C97F); /* 포커스 시 초록색 테두리 */
    outline: none; /* 기본 포커스 스타일 제거 */
  }
`;

const ServingText = styled.div`
  color: var(--grey11, #36393C);
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
