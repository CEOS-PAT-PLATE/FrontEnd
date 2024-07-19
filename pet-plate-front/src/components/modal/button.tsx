'use client';

import React from 'react';
import styled, { css } from 'styled-components';

interface ButtonProps {
  color: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

export default function Button({ color, onClick, children }: ButtonProps) {
  return (
    <StyledButton $color={color} onClick={onClick}>
      {children}
    </StyledButton>
  );
}

const StyledButton = styled.button<{ $color: boolean }>`
  cursor: pointer;

  display: flex;
  width: 113px;
  height: 48px;
  padding: 14px 24px;
  justify-content: center;
  align-items: center;
  gap: 10px;

  border-radius: 8px;
  background: ${(props) => (props.$color ? 'var(--grey2, #ECEEF0)' : 'var(--primary, #40C97F)')};
  border: none;
  outline: none;

  cursor: pointer;

  &:hover {
    background: ${(props) => (props.$color ? 'var(--grey3, #DDE0E4)' : 'var(--600, #33A165)')};
  }

  ${({ $color }) =>
    $color &&
    css`
      color: var(--grey11, #36393c);
      text-align: center;

      /* body2_semibold_14pt */
      font-family: SUIT;
      font-size: 14px;
      font-style: normal;
      font-weight: 600;
      line-height: 160%; /* 22.4px */
    `}

  ${({ $color }) =>
    !$color &&
    css`
      color: var(--white, #fff);
      text-align: center;

      /* body2_semibold_14pt */
      font-family: SUIT;
      font-size: 14px;
      font-style: normal;
      font-weight: 600;
      line-height: 160%; /* 22.4px */
    `}
`;
