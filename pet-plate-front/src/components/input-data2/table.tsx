'use client';

import { useRecoilValue } from 'recoil';
import { searchQueryState, rawFoodsState, consumedRawsState } from '@lib/atoms';
import styled from 'styled-components';

export default function Table() {
  const searchQuery = useRecoilValue(searchQueryState);
  const rawFoods = useRecoilValue(rawFoodsState);
  const consumedRaws = useRecoilValue(consumedRawsState);

  const filteredRawFoods = searchQuery ? rawFoods.filter((food) => food.name.includes(searchQuery)).slice(0, 5) : [];

  const recentConsumedRaws = !searchQuery ? consumedRaws.slice(0, 3) : [];

  return (
    <TableContainer>
      {searchQuery
        ? filteredRawFoods.map((food) => (
            <Card key={food.id}>
              <h3>{food.name}</h3>
              <p>{food.description}</p>
            </Card>
          ))
          : (
            <RecentContainer>
              {recentConsumedRaws.map((consumed) => (
                <RecentCard key={consumed.rawId}>
                  <p>{consumed.rawId}</p>
                  <p>{consumed.serving}g</p>
                </RecentCard>
              ))}
            </RecentContainer>
          )}
    </TableContainer>
  );
}

const TableContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
`;

const Card = styled.div`
  display: flex;
  width: 312px;
  padding: 10px 14px;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  border-radius: 8px;
  border: 1px solid var(--grey2, #eceef0);
  background: var(--white, #fff);
`;

const RecentContainer = styled.div`
  display: flex;
  overflow-x: auto;
  gap: 16px;
  padding: 10px 0;
  white-space: nowrap;
  &::-webkit-scrollbar {
    height: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: var(--grey2, #eceef0);
    border-radius: 4px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
`;

const RecentCard = styled.div`
  display: inline-block;
  width: 136px;
  padding: 10px 14px;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  border-radius: 8px;
  border: 1px solid var(--grey2, #eceef0);
  background: var(--white, #fff);
  color: var(--grey11, #36393c);
  /* title2_regular_16pt */
  font-family: SUIT;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 160%; /* 25.6px */
`;