'use client'

import styled from "styled-components"
import {InputFieldProps} from "@lib/types"


export default function inputField({ width, placeholder, value, onChange } : InputFieldProps) {
  return (
    <InputFiledWrapper>
        <InputFileld type="number" step="0.01"
         placeholder={placeholder} 
         width={width}
         value={value}
         onChange={onChange}
        />
    </InputFiledWrapper>
  )
}

const InputFiledWrapper = styled.div`
    
`

const InputFileld = styled.input`
    -moz-appearance: textfield; /* Firefox */
    -webkit-appearance: none; /* Safari and Chrome */
    appearance: none; /* Standard syntax */

    /* Hide the number input arrows for Firefox specifically */
    &::-webkit-inner-spin-button,
    &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
    }


    height: 3rem;
    padding: 0 1rem;
    font-size: 1rem;
    font-weight: 400;
    width: ${(props) => props.width};
    border: solid 0.063rem ${(props) => props.theme.colors['grey5']};
    border-radius: 0.5rem;
    color:  ${(props) => props.theme.colors['grey11']};
    background-color: transparent;

    &::placeholder {
        color: ${(props) => props.theme.colors['grey6']};
    }

    &:focus{
        outline: none;
        border-color: ${(props) => props.theme.colors['green']};
    }

`