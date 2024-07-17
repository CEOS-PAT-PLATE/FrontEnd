'use client';

import styled from 'styled-components';
import { ReactNode } from 'react';
import Link from 'next/link';

interface CenterButtonProps {
  href: string;
  buttonContent: ReactNode;
  backgroundcolor: string | ((props: any) => string);
  hoverbackgroundcolor: string | ((props: any) => string);
 hoverbuttoncontentcolor: string | ((props: any) => string);
}

export default function LinkBtn({
  href,
  buttonContent,
  backgroundcolor,
  hoverbackgroundcolor,
 hoverbuttoncontentcolor,
}: CenterButtonProps) {
  return (
    <ButtonContainer
      href={href}
      $backgroundcolor={backgroundcolor}
      $hoverbackgroundcolor={hoverbackgroundcolor}
      $hoverbuttoncontentcolor={hoverbuttoncontentcolor}>
      <ButtonContent>{buttonContent}</ButtonContent>
    </ButtonContainer>
  );
}

const ButtonContainer = styled(Link)<{
  $backgroundcolor: string | ((props: any) => string);
  $hoverbackgroundcolor: string | ((props: any) => string);
  $hoverbuttoncontentcolor: string | ((props: any) => string);
}>`
  width: 19.5rem;
  height: 3.563rem;
  text-decoration: none;
  border: none;
  border-radius: 0.5rem;
  background-color: ${({ $backgroundcolor }) => $backgroundcolor};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    background-color: ${({ $hoverbackgroundcolor }) => $hoverbackgroundcolor};
  }
`;

const ButtonContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 1.125rem;
  font-weight: 600;
`;
