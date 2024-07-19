'use client'

import styled from "styled-components"
import Image from "next/image"
import progressbarSrc from '@public/svg/progress_bar.svg?url'

export default function ProgressBarComponent() {
  return (
    <Container>
      <Progressbar src={progressbarSrc} alt="Progress Bar" /> 
    </Container>
  )
}

const Container = styled.div`
    width: 100%;
    height: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Progressbar = styled(Image)`
   
`;
