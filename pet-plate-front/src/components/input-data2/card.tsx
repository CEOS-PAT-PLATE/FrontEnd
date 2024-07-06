import styled, { css } from 'styled-components';
import { Description, Title } from '@style/input-data2/TextStyle';
import { CardProps } from '@lib/types'



export default function Card({
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
    <CardContainer  onClick={onClick} $isClicked={isClicked} $someClicked={someClicked}>
      <Title $fontWeight={titleFontWeight} $lineHeight={titleLineHeight}>
        {title}
      </Title>
      <Description $fontWeight={descriptionFontWeight} $lineHeight={descriptionLineHeight}>
        {description}
      </Description>
    </CardContainer>
  );
}

const CardContainer = styled.div<{ $isClicked: boolean, $someClicked:boolean }>`
  display: flex;
  width: 312px;
  padding: 10px 14px;
  flex-direction: column; /* 카드 내부 텍스트를 세로로 배치 */
  align-items: flex-start;
  gap: 8px;
  border-radius: 8px;
  border: 1px solid var(--grey2, #eceef0);
  background: var(--white, #fff);

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
