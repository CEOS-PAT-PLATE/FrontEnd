import styled, { css } from 'styled-components';
import { Description, Title } from '@style/input-data2/TextStyle';

interface RecentCardProps {
  title: string;
  description: string;
  titleFontWeight: string;
  titleLineHeight: string;
  descriptionFontWeight: string;
  descriptionLineHeight: string;
  onClick?: () => void;
}

export default function RecentCard({
  title,
  description,
  titleFontWeight,
  titleLineHeight,
  descriptionFontWeight,
  descriptionLineHeight,
  onClick
}: RecentCardProps) {
  return (
    <RecentCardContainer onClick={onClick}>
      <Title $fontWeight={titleFontWeight} $lineHeight={titleLineHeight}>
        {title}
      </Title>
      <Description $fontWeight={descriptionFontWeight} $lineHeight={descriptionLineHeight}>
        {description}
      </Description>
    </RecentCardContainer>
  );
}

const RecentCardContainer = styled.div`
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

