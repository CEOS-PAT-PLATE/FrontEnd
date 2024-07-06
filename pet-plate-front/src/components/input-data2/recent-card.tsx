import styled, { css } from 'styled-components';
import { Description, Title } from '@style/input-data2/TextStyle';
import { CardProps } from '@lib/types'



export default function RecentCard({
  title,
  description,
  titleFontWeight,
  titleLineHeight,
  descriptionFontWeight,
  descriptionLineHeight,
  isClicked,
  someClicked,
  onClick
}: CardProps) {
  return (
    <RecentCardContainer onClick={onClick} $isClicked={isClicked} $someClicked={someClicked}>
      <Title $fontWeight={titleFontWeight} $lineHeight={titleLineHeight}>
        {title}
      </Title>
      <Description $fontWeight={descriptionFontWeight} $lineHeight={descriptionLineHeight}>
        {description}
      </Description>
    </RecentCardContainer>
  );
}

const RecentCardContainer = styled.div<{ $isClicked: boolean, $someClicked:boolean }>`
  display: inline-block;
  min-width: 136px; /* overflow scroll때문에 넓이 136px 보다 작아지는 문제 해결 */
  padding: 10px 14px;
  flex-direction: column;
  align-items: flex-start;

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
          border-radius: 8px;

    ${({ $someClicked, $isClicked }) =>
    $someClicked && !$isClicked &&
    css`
      display: none;
    `}

  ${({ $isClicked }) =>
    $isClicked &&
    css`
      border: 1px solid var(--primary, #40C97F);
      background: var(--50, #ECFAF2);





    `}


  ${({ $isClicked }) =>
    !$isClicked &&
    css`
      border: 1px solid var(--grey2, #eceef0);
      background: var(--white, #fff);
    `}

`;

interface TextProps {
  $lineHeight: string;
  $fontWeight: string;
}

