'use client'
import styled from 'styled-components';
import FavoriteIcon from '@components/input-data2/favorite-icon';
import { usePathname } from 'next/navigation';


interface InfoLayoutProps {
  title: string;
  description: string;
}

const InfoLayout = ({ title, description }: InfoLayoutProps) => {

  const pathName = usePathname();

  return (
    <>
    <Container>
      <Title>{title}</Title>
      <Description>{description}</Description>
      {pathName !== '/input-data2/favorites' && (
        <FavoriteIconWrapper>
          <FavoriteIcon />
        </FavoriteIconWrapper>
      )}
    </Container>
 
    </>
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

const FavoriteIconWrapper = styled.div`
position:absolute;
left:275px;
top:8px;


`;



export default InfoLayout;
