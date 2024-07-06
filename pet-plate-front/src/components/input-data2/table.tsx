'use client';

import { useRecoilValue } from 'recoil';
import { searchQueryState, rawFoodsState, consumedRawsState } from '@lib/atoms';
import styled, { css } from 'styled-components';

export default function Table() {
  const searchQuery = useRecoilValue(searchQueryState);
  const rawFoods = useRecoilValue(rawFoodsState);
  const consumedRaws = useRecoilValue(consumedRawsState);

  const filteredRawFoods = searchQuery ? rawFoods.filter((food) => food.name.includes(searchQuery)).slice(0, 5) : [];
  const recentConsumedRaws = !searchQuery ? consumedRaws.slice(0,5) : [];
  const fontWeight1 = '400';
  const fontWeight2 = '700';
  const lineHeight1 = '160%';
  const lineHeight2 = '130%';

  return (
    <TableContainer $searchQuery={searchQuery}>
      {searchQuery
        ? filteredRawFoods.map((food) => (
            <Card key={food.id}>
              <Title $fontWeight={fontWeight2} $lineHeight={lineHeight1}>{food.name}</Title>
              <Description $fontWeight={fontWeight1} $lineHeight={lineHeight2}>{food.description}</Description>
            </Card>
          ))
        : (
          <RecentContainer>
            {recentConsumedRaws.map((consumed) => (
              <RecentCard key={consumed.rawId}>
                <Title $fontWeight={fontWeight1} $lineHeight={lineHeight1}>{consumed.rawId}</Title>
                <Description $fontWeight={fontWeight1} $lineHeight={lineHeight1}>{consumed.serving}g</Description>
              </RecentCard>
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

interface TextProps {
  $lineHeight: string;
  $fontWeight: string;
}

const Title = styled.h3<TextProps>`
  color: var(--grey11, #36393c);
  font-family: SUIT;
  font-size: 16px;
  font-style: normal;
  ${(props) => css`
    font-weight: ${props.$fontWeight};
    line-height: ${props.$lineHeight};
  `}
  margin: 0;
`;

const Description = styled.p<TextProps>`
  color: var(--grey8, #7c8389);
  font-family: SUIT;
  font-size: 16px;
  font-style: normal;
  ${(props) => css`
    font-weight: ${props.$fontWeight};
    line-height: ${props.$lineHeight};
  `}
  margin: 0;
`;
