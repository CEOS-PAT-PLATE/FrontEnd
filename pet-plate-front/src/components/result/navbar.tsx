'use client';

import styled, { css } from 'styled-components';
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
            <Text1>부족</Text1>
            <Text3 $isExcessPath={isExcessPath}>{deficientCount}</Text3>
          </StyledLink1>
          <StyledLink2 href={`/result/${params.petId}/${params.dailyMealId}/recommend/excessNutrients`}>
            <Text1>과잉</Text1>
            <Text2 $isExcessPath={isExcessPath}>{excessCount}</Text2>
          </StyledLink2>
        </ImageWrapper>
      </NavItem>
    </NavWrapper>
  );
}

const Space = styled.div`
  display: inline-block;
  width: 18px;
  background-color: ${(props) => props.theme.colors['grey1']}; // body 배경색 설정
`;

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

const ImageWrapper = styled.div``;

const Text = styled.div`
  font-family: SUIT;
  font-size: 16px;
  font-weight: 600;
  margin-right: 10px;
  color: var(--grey11, #36393c);
  position: absolute;
  width: 40px;
`;

const StyledLink1 = styled(Link)`
  position: absolute;
  z-index: 100;
  top: 18px;
  left: 38px;
  width: 55px;
`;

const StyledLink2 = styled(Link)`
  text-decoration: none;
  position: absolute;
  z-index: 100;
  top: 18px;
  left: 110px;
  width: 55px;
`;

const Text1 = styled.div`
  font-family: SUIT;
  font-size: 16px;
  font-weight: 600;
  margin-right: 10px;
  color: var(--grey11, #36393c);
  position: absolute;
  width: 40px;
`;

const Text2 = styled.div<{ $isExcessPath: boolean }>`
  font-family: SUIT;
  font-size: 16px;
  font-weight: 600;
  margin-right: 10px;
  position: absolute;
  margin-left: 40px;

  width: 40px;

  ${({ $isExcessPath }) =>
    $isExcessPath &&
    css`
     color: #40c97f;
    `}

  ${({ $isExcessPath }) =>
    !$isExcessPath &&
    css`
    color:  ${(props) => props.theme.colors['grey3']}
    `}
`;


const Text3= styled.div<{ $isExcessPath: boolean }>`
  font-family: SUIT;
  font-size: 16px;
  font-weight: 600;
  margin-right: 10px;
  position: absolute;
  margin-left: 40px;

  width: 40px;

  ${({ $isExcessPath }) =>
    !$isExcessPath &&
    css`
     color: #40c97f;
    `}

  ${({ $isExcessPath }) =>
    $isExcessPath &&
    css`
    color:  ${(props) => props.theme.colors['grey3']}
    `}
`;

