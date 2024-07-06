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
    <TableContainer searchQuery={searchQuery}>
      {searchQuery
        ? filteredRawFoods.map((food) => (
            <Card key={food.id}>
              <Title fontweight='700' lineHeight="160%">{food.name}</Title>
              <Description fontweight='400' lineHeight="130%">{food.description}</Description>
            </Card>
          ))
        : (
          <RecentContainer>
            {recentConsumedRaws.map((consumed) => (
              <RecentCard key={consumed.rawId}>
                <Title fontweight='400'  lineHeight="160%">{consumed.rawId}</Title>
                <Description  fontweight='400'  lineHeight="160%">{consumed.serving}g</Description>
              </RecentCard>
            ))}
          </RecentContainer>
        )}
    </TableContainer>
  );
}

const TableContainer = styled.div<{ searchQuery: string }>`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  gap: 16px;
  overflow-y: scroll;
  height: 320px;
  margin-top: ${(props) => (props.searchQuery ? '45px' : '0px')}; /* 검색어가 있을 때만 margin-top 추가 */
`;

const Card = styled.div`
  display: flex;
  width: 312px;
  padding: 10px 14px;
  flex-direction: column; /* 카드 내부 텍스트를 세로로 배치 */
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
  min-width: 136px; /* overflow scroll때문에 넓이 136px 보다 작아지는 문제 해결 */
  padding: 10px 14px;
  flex-direction: column;
  align-items: flex-start;
  border-radius: 8px;
  border: 1px solid var(--grey2, #eceef0);
  background: var(--white, #fff);
  color: var(--grey11, #36393c);
  font-family: SUIT;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 160%; /* 25.6px */
  gap: 8px;
  &:first-child {
    margin-left: -14px; /* 첫 번째 카드의 왼쪽 여백 제거 - 슬라이딩 했을때 안했을 때 위치 동일하도록 */
  }
  &:not(:first-child) {
    margin-left: 10px; /* 첫 번째 카드를 제외한 모든 카드의 왼쪽 여백 설정 */
  }
`;

const Title = styled.h3<{ lineHeight: string,fontweight:string }>`
  color: var(--grey11, #36393c);
  font-family: SUIT;
  font-size: 16px;
  font-style: normal;
  font-weight:  ${(props) => props.fontweight};
  line-height: ${(props) => props.lineHeight}; /* props로 전달받은 line-height 사용 */
  margin: 0;
`;

const Description = styled.p<{ lineHeight: string,fontweight:string }>`
  color: var(--grey8, #7c8389);
  font-family: SUIT;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: ${(props) => props.lineHeight}; /* props로 전달받은 line-height 사용 */
  margin: 0;
`;
