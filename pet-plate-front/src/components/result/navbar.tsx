'use client';

import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import NavBarDeficient from '@public/svg/navbar_deficient.svg?url';
import NavBarExcess from '@public/svg/navbar_excess.svg?url';

interface NavbarProps {
  deficientCount: number;
  excessCount: number;
  params: { petId: number; dailyMealId: number };
}

export default function Navbar({ deficientCount, excessCount, params }: NavbarProps) {
  const pathname = usePathname();
  const isDeficientPath = pathname.includes('deficientNutrients');
  const isExcessPath = pathname.includes('excessNutrients');
  console.log(params);

  return (
    <NavWrapper>
      
        <NavItem>
          <ImageWrapper>
            <Image src={isExcessPath ? NavBarExcess : NavBarDeficient} alt="Nutrients" />
            <StyledLink1 href={`/result/${params.petId}/${params.dailyMealId}/recommend/deficientNutrients`}>
            <Text>{'부족  '+deficientCount}</Text>
            </StyledLink1>
            <StyledLink2 href={`/result/${params.petId}/${params.dailyMealId}/recommend/excessNutrients`}>
            <Text>{'과잉  '+excessCount}</Text>
            </StyledLink2>
          </ImageWrapper>
        
        </NavItem>
    
    </NavWrapper>
  );
}

const NavWrapper = styled.div`
  position: absolute;
  top: 96px;
  height: 45px;
  width: 360px;
  display: flex;
  z-index: 100;
`;

const NavItem = styled.div`
  display: flex;
  flex: 1;
`;

const ImageWrapper = styled.div`
  
`;

const Text = styled.span`
  font-family: SUIT;
  font-size: 16px;
  font-weight: 600;
  margin-left: 8px;
  color: var(--grey11, #36393c);
  position: absolute;

 
`;

const StyledLink1 = styled(Link)`
  position: absolute;
  z-index: 100;
    top: 18px;
    left:70px;
    width:55px;

`;


const StyledLink2 = styled(Link)`
  text-decoration: none;
    position: absolute;
  z-index: 100;
    top: 18px;
    left:150px;
        width:55px;

`;

