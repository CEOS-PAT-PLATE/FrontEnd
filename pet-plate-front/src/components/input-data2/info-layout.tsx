'use client'
import styled from 'styled-components';

interface InfoLayoutProps {
  title: string;
  description: string;
}

const InfoLayout = ({ title, description }: InfoLayoutProps) => {
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
  gap: 2px;
  line-height: 160%; /* 32px */
  letter-spacing: -0.75px;
  width: 250px;
`;

const Title = styled.h1<{ color?: string }>`
  color: ${(props) => props.color || 'var(--grey11, #36393C)'};
  font-family: SUIT;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
`;

const Description = styled.p`
  color: var(--grey8, #7c8389);
  font-family: SUIT;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 160%; /* 22.4px */
`;

export default InfoLayout;
