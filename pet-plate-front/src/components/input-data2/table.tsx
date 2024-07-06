'use client';

import { useRecoilValue } from 'recoil';
import { searchQueryState, rawFoodsState, consumedRawsState } from '@lib/atoms';
import styled from 'styled-components';
import Card from '@components/input-data2/card';
import RecentCard from '@components/input-data2/recent-card';
import { useState } from 'react';

export default function Table() {
  const searchQuery = useRecoilValue(searchQueryState);
  const rawFoods = useRecoilValue(rawFoodsState);
  const consumedRaws = useRecoilValue(consumedRawsState);
  const [clickedId, setClickedId] = useState<string | null>(null);
  const [someClicked, setSomeClicked] = useState(false);

  const filteredRawFoods = searchQuery ? rawFoods.filter((food) => food.name.includes(searchQuery)).slice(0, 5) : [];
  const recentConsumedRaws = !searchQuery ? consumedRaws.slice(0, 5) : [];
  const fontWeight1 = '400';
  const fontWeight2 = '700';
  const lineHeight1 = '160%';
  const lineHeight2 = '130%';

  function handleClick(id: string) {
    setClickedId(id);
    setSomeClicked(true);
  }

  return (
    <TableContainer $searchQuery={searchQuery}>
      {searchQuery ? (
        filteredRawFoods.map((food) => (
          <Card
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
            <RecentCard
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
            />
          ))}
        </RecentContainer>
      )}
    </TableContainer>
  );
}

const TableContainer = styled.div<{ $searchQuery: string }>`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  gap: 16px;
  overflow-y: scroll;
  height: 320px;
  margin-top: ${(props) => (props.$searchQuery ? '45px' : '0px')}; /* 검색어가 있을 때만 margin-top 추가 */
`;

const RecentContainer = styled.div`
  display: flex;
  padding: 10px 14px;
  width: 335px;
  overflow-x: scroll;
  gap: 10px;
`;
