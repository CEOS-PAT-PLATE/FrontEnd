'use client'

import styled from "styled-components"
import { ReactNode } from "react"
import Link from "next/link"

interface CenterButtonProps {
    href : string
    buttonContent: ReactNode;
    backgroundColor: string | ((props: any) => string);
    hoverBackgroundColor: string | ((props: any) => string);
    hoverButtonContentColor: string | ((props: any) => string);
}

export default function LinkBtn({ href, buttonContent, backgroundColor, hoverBackgroundColor, hoverButtonContentColor} : CenterButtonProps) {
  return (
    <ButtonContainer href={href}
      backgroundColor={backgroundColor} 
      hoverBackgroundColor={hoverBackgroundColor}
      hoverButtonContentColor={hoverButtonContentColor}
    >
        <ButtonContent>{buttonContent}</ButtonContent>
    </ButtonContainer>
  )
}

const ButtonContainer = styled(Link)<{ backgroundColor:  string | ((props: any) => string), hoverBackgroundColor: string | ((props: any) => string), hoverButtonContentColor: string | ((props: any) => string) }>`
    width: 19.5rem;
    height: 3.563rem;
    text-decoration: none;
    border: none;
    border-radius: 0.5rem;
    background-color: ${({ backgroundColor }) => backgroundColor};
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    &:hover{
        background-color: ${({ hoverBackgroundColor }) => hoverBackgroundColor};

    }
`

const ButtonContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 1.125rem;
  font-weight: 600;
`
