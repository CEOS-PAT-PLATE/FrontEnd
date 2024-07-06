import styled, { css } from 'styled-components';
import { Description, Title } from '@style/input-data2/TextStyle';

interface CardProps {
  title: string;
  description: string;
  titleFontWeight: string;
  titleLineHeight: string;
  descriptionFontWeight: string;
  descriptionLineHeight: string;
  onClick?: () => void;

}

export default function Card({
  title,
  description,
  titleFontWeight,
  titleLineHeight,
  descriptionFontWeight,
  descriptionLineHeight,
  onClick

}: CardProps) {
  return (
    <CardContainer  onClick={onClick}>
      <Title $fontWeight={titleFontWeight} $lineHeight={titleLineHeight}>
        {title}
      </Title>
      <Description $fontWeight={descriptionFontWeight} $lineHeight={descriptionLineHeight}>
        {description}
      </Description>
    </CardContainer>
  );
}

const CardContainer = styled.div`
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
