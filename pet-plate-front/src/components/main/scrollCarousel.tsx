'use client'
import styled from "styled-components"
import Image from "next/image"

import step1 from "@public/svg/step1.svg?url"
import step2 from "@public/svg/step2.svg?url"
import step3 from "@public/svg/step3.svg?url"
import step4 from "@public/svg/step4.svg?url"



export default function scrollCarousel() {
  return (
    <CarouselContainer>
        <Step src ={step1} alt="step1"/>
        <Step src ={step2} alt="step2"/>
        <Step src ={step3} alt="step3"/>
        <Step src ={step4} alt="step4"/>
    </CarouselContainer>
  )
}

const CarouselContainer = styled.div`
    scroll-snap-type: x mandatory;
    display: flex;
    flex-direction: row;
    width: 21rem;
    overflow: scroll;
    scroll-behavior: smooth;
    background-color: transparent;
`

const Step = styled(Image)`
    scroll-snap-align: start;
`