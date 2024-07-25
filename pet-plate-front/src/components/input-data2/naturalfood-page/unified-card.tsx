import styled, { css } from 'styled-components';
import { Description, Title } from '@style/input-data2/TextStyle';
import { CardProps } from '@lib/types';

export default function UnifiedCard({
  title,
  description,
  titleFontWeight,
  titleLineHeight,
  descriptionFontWeight,
  descriptionLineHeight,
  isClicked,
  someClicked,
  onClick,
  isRecent = false,
}: CardProps & { isRecent?: boolean }) {
  return (
    <CardContainer onClick={onClick} $isClicked={isClicked} $someClicked={someClicked} $isRecent={isRecent}>
      <Title $fontWeight={titleFontWeight} $lineHeight={titleLineHeight}>
        {title}
      </Title>
      {isRecent && (
        <Description $fontWeight={descriptionFontWeight} $lineHeight={descriptionLineHeight}>
          {description}
        </Description>
      )}
    </CardContainer>
  );
}

const CardContainer = styled.div<{ $isClicked: boolean, $someClicked: boolean, $isRecent: boolean }>`
  display: flex;
  flex-direction: column;
  min-width: ${({ $isRecent,$isClicked  }) => ($isRecent&&!$isClicked  ? '136px' : '312px')}; /* RecentCard와 일반 Card의 차이 */
  width: ${({ $isRecent }) => ($isRecent ? 'auto' : '312px')};
  padding: 10px 14px;
  align-items: flex-start;
  gap: 8px;
  border-radius: 8px;
  border: 1px solid var(--grey2, #eceef0);
  background: var(--white, #fff);
  color: var(--grey11, #36393c);
  font-family: SUIT;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 160%; /* 25.6px */
  cursor: pointer;

  ${({ $isRecent,$isClicked }) => 
    $isRecent &&!$isClicked &&
    css`
      &:first-child {
        margin-left: -14px;
      }
      &:not(:first-child) {
        margin-left: 10px;
      }
    `}

  ${({ $isRecent,$isClicked }) => 
    $isRecent &&$isClicked &&
    css`
      margin-left: -14px;
    `}

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

// 1. 자신 이외의 나머지 카드 중 하나가 클릭되어 있을 때, 카드의 스타일 (자신을 display none으로 처리)
// 2. 자신이 클릭된 카드일때의 스타일 
// 3. 아무 카드도 클릭되지 않았을 때의 스타일 