import Link from 'next/link'
import { Option } from '@lib/types'
import styled, { css } from 'styled-components'
import { searchQueryState, isValidState,isServing } from '@recoil/atoms';
import { useRecoilState, useResetRecoilState } from 'recoil';

interface NavElementsProps {
  option: Option
  isActive: boolean
}

export default function NavElements({ option, isActive }: NavElementsProps) {

  const resetSearchQuery = useResetRecoilState(searchQueryState);
  const resetIsValid = useResetRecoilState(isValidState);
  const resetIsServing= useResetRecoilState(isServing);

  function resetGlobalState() { // 전역 상태 초기화 함수
    resetSearchQuery();
    resetIsValid();
    resetIsServing();
  }

  return (
    <NavItem $isActive={isActive}>
      <StyledLink href={`/${option.link}`} $isActive={isActive} onClick={resetGlobalState}>
        {option.name}
      </StyledLink>
    </NavItem>
  )
}

const NavItem = styled.div<{ $isActive: boolean }>`
  a {
    text-decoration: none;
  }
 display: flex;
width: 61px;
height: 30px;
padding: 0px 16px;
flex-direction: column;
justify-content: center;
align-items: center;
flex-shrink: 0;
  ${({ $isActive }) =>
    $isActive &&
    css`
      border-radius: 100px;
      background: var(--white, #fff);
      box-shadow: 2px 2px 8px 0px rgba(124, 131, 137, 0.3);
    `}
`

const StyledLink = styled(Link)<{ $isActive: boolean }>`
  white-space: nowrap;

  ${({ $isActive }) =>
    !$isActive &&
    css`
      color: var(--grey7, #959ca4);
      text-align: center;
      /* body3_regular_12pt */
      font-family: SUIT;
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: 160%; /* 19.2px */
    `}

  ${({ $isActive }) =>
    $isActive &&
    css`
      color: var(--grey11, #36393c);
      text-align: center;
      font-family: SUIT;
      font-size: 12px;
      font-style: normal;
      font-weight: 600;
      line-height: 160%; /* 19.2px */
    `}
`
