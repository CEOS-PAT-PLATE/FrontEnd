'use client'

import styled from "styled-components"
import { ReactNode } from "react"

interface CenterButtonProps {
    onClick: () => void;
    buttonContent: ReactNode;
    backgroundColor: string | ((props: any) => string);
    hoverBackgroundColor: string | ((props: any) => string);
    hoverButtonContentColor: string | ((props: any) => string);
}

export default function gapbtn({onClick, buttonContent, backgroundColor, hoverBackgroundColor, hoverButtonContentColor} : CenterButtonProps) {
  return (
    <ButtonContainer 
      onClick={onClick} 
      $backgroundColor={backgroundColor} 
      $hoverBackgroundColor={hoverBackgroundColor}
      $hoverButtonContentColor={hoverButtonContentColor}
    >
        <ButtonContent>{buttonContent}</ButtonContent>
    </ButtonContainer>
  )
}

const ButtonContainer = styled.div<{ $backgroundColor:  string | ((props: any) => string), $hoverBackgroundColor: string | ((props: any) => string), $hoverButtonContentColor: string | ((props: any) => string) }>`
    width: 19.5rem;
    height: 3.563rem;
    border: none;
    border-radius: 0.5rem;
    background-color: ${({ $backgroundColor }) => $backgroundColor};
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    &:hover{
        background-color: ${({ $hoverBackgroundColor }) => $hoverBackgroundColor};

    }
`

const ButtonContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 1.125rem;
  font-weight: 600;
`
