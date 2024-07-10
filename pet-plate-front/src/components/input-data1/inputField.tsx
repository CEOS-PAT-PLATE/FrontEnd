'use client'

import styled from "styled-components"

interface InputFieldProps {
    width: string;
    placeholder: string;
}

export default function inputField({ width, placeholder } : InputFieldProps) {
  return (
    <InputFiledWrapper>
        <InputFileld type="text"
         placeholder={placeholder} 
         width={width}
        />
    </InputFiledWrapper>
  )
}

const InputFiledWrapper = styled.div`
    
`

const InputFileld = styled.input`
    height: 3rem;
    padding: 0 1rem;
    font-size: 1rem;
    font-weight: 400;
    width: ${(props) => props.width};
    border: solid 0.063rem #BDC5CC; // grey5
    border-radius: 0.5rem;
    color: #36393C; //grey11

    &::placeholder {
        color: #AFB8C1; //grey6
    }

    &:focus{
        outline: none;
        border-color: #40C97F; //green500
    }

`