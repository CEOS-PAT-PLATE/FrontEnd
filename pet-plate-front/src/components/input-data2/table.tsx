'use client';

import { useRecoilValue } from 'recoil';
import { searchQueryState, rawFoodsState, consumedRawsState } from '@lib/atoms';
import styled from 'styled-components';

export default function Table() {
  const searchQuery = useRecoilValue(searchQueryState);
  const rawFoods = useRecoilValue(rawFoodsState);
  const consumedRaws = useRecoilValue(consumedRawsState);

  const filteredRawFoods = searchQuery ? rawFoods.filter((food) => food.name.includes(searchQuery)).slice(0, 5) : [];
  const recentConsumedRaws = !searchQuery ? consumedRaws.slice(0,5) : [];

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
  flex-direction: column;
  flex-wrap: nowrap;
  gap: 16px;
    overflow-y: scroll;
    height:320px;

`;

const Card = styled.div`
  display: flex;
  width: 312px;
  padding: 10px 14px;
  flex-direction: column; /*카드 내부 텍스트를 세로로 배치 */
  align-items: flex-start;
  gap: 8px;
  border-radius: 8px;
  border: 1px solid var(--grey2, #eceef0);
  background: var(--white, #fff);
`;

const RecentContainer = styled.div`
  display: flex;
  padding: 10px 14px;
  width: 335px;
  overflow-x: scroll;
    gap: 10px;



`;

const RecentCard = styled.div`
  display: inline-block;
    min-width: 136px;/* overflow scroll때문에 넓이 136px 보다 작아지는 문제 해결 */
  padding: 10px 14px;
  flex-direction: column;
  align-items: flex-start;
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
  gap: 8px;
  &:first-child {
    margin-left: -14px; /* 첫 번째 카드의 왼쪽 여백 제거 - 슬라이딩 했을때 
    안했을 때 위치 동일하도록*/
  }

  &:not(:first-child) {
    margin-left: 10px; /* 첫 번째 카드를 제외한 모든 카드의 왼쪽 여백 설정 */
  }
`;
