'use client'
import styled from 'styled-components';

interface InfoLayoutProps {
  title: string;
  description: string;
}

const NutrientInfoLayout = ({ title, description }: InfoLayoutProps) => {
  return (
    <Container>
      <Title>{title}</Title>
      <Description>{description}</Description>
    </Container>
  );
};

const Container = styled.div`
  position: abosulte;
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
gap: 8px;
width:227px;
margin-top:24px;
`;

const Title = styled.h1`
 color: var(--grey10, #4F5357);

/* title2_bold_16pt */
font-family: SUIT;
font-size: 16px;
font-style: normal;
font-weight: 700;
line-height: 160%; /* 25.6px */
`;

const Description = styled.p`
color: var(--grey8, #7C8389);

/* body3_regular_12pt */
font-family: SUIT;
font-size: 12px;
font-style: normal;
font-weight: 400;
line-height: 160%; /* 19.2px */
`;


export default NutrientInfoLayout;
